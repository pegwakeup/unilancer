import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TranslateRequest {
  text: string;
  targetLang: string;
  sourceLang?: string;
  contentKey?: string;
}

interface TranslateBatchRequest {
  texts: Array<{
    text: string;
    contentKey: string;
  }>;
  targetLang: string;
  sourceLang?: string;
}

async function generateHash(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function getSupabaseClient(req: Request) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    global: {
      headers: {
        Authorization: req.headers.get("Authorization") || "",
      },
    },
  });
}

async function requireAdmin(req: Request) {
  const supabase = await getSupabaseClient(req);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const role = user.app_metadata?.role;
  if (role !== "admin") {
    throw new Response(JSON.stringify({ error: "Admin role required" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return supabase;
}

async function callDeepL(
  deeplApiKey: string,
  text: string,
  targetLang: string,
  sourceLang: string
) {
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Authorization": `DeepL-Auth-Key ${deeplApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [text],
      target_lang: targetLang.toUpperCase(),
      source_lang: sourceLang.toUpperCase(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepL API error: ${errorText}`);
  }

  const data = await response.json();
  const translatedText = data.translations[0]?.text || text;
  const detectedSourceLang = data.translations[0]?.detected_source_language;

  return { translatedText, detectedSourceLang };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = await requireAdmin(req);
    const deeplApiKey = Deno.env.get("DEEPL_API_KEY");

    if (!deeplApiKey) {
      throw new Error("DEEPL_API_KEY environment variable is not set");
    }

    const url = new URL(req.url);
    const isBatch = url.pathname.endsWith("/batch");

    if (isBatch) {
      const { texts, targetLang, sourceLang = "TR" }: TranslateBatchRequest = await req.json();

      if (!texts || !Array.isArray(texts) || texts.length === 0) {
        return new Response(
          JSON.stringify({ error: "texts array is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const translationResults = await Promise.all(
        texts.map(async ({ text, contentKey }) => {
          if (!contentKey) {
            return {
              contentKey,
              originalText: text,
              translatedText: text,
              success: false,
              error: "contentKey is required",
            };
          }

          try {
            const { translatedText, detectedSourceLang } = await callDeepL(
              deeplApiKey,
              text,
              targetLang,
              sourceLang
            );
            const contentHash = await generateHash(text);

            const { error } = await supabase.from("translations").upsert(
              {
                content_key: contentKey,
                language: targetLang.toLowerCase(),
                source_lang: sourceLang.toLowerCase(),
                translated_text: translatedText,
                content_hash: contentHash,
              },
              { onConflict: "content_key,language" }
            );

            if (error) {
              throw error;
            }

            return {
              contentKey,
              originalText: text,
              translatedText,
              contentHash,
              targetLang,
              sourceLang: detectedSourceLang || sourceLang,
              success: true,
            };
          } catch (error) {
            return {
              contentKey,
              originalText: text,
              translatedText: text,
              success: false,
              error: error.message,
            };
          }
        })
      );

      return new Response(
        JSON.stringify({
          translations: translationResults,
          totalCount: translationResults.length,
          successCount: translationResults.filter((t) => t.success).length,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      const { text, targetLang, sourceLang = "TR", contentKey }: TranslateRequest = await req.json();

      if (!text || !targetLang || !contentKey) {
        return new Response(
          JSON.stringify({ error: "text, targetLang and contentKey are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { translatedText, detectedSourceLang } = await callDeepL(
        deeplApiKey,
        text,
        targetLang,
        sourceLang
      );
      const contentHash = await generateHash(text);

      const { error } = await supabase.from("translations").upsert(
        {
          content_key: contentKey,
          language: targetLang.toLowerCase(),
          source_lang: sourceLang.toLowerCase(),
          translated_text: translatedText,
          content_hash: contentHash,
        },
        { onConflict: "content_key,language" }
      );

      if (error) {
        throw error;
      }

      return new Response(
        JSON.stringify({
          originalText: text,
          translatedText,
          detectedSourceLang: detectedSourceLang || sourceLang,
          contentKey,
          contentHash,
          targetLang,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    console.error("Translation error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred during translation",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});