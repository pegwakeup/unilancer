import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
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

      const translatedTexts = await Promise.all(
        texts.map(async ({ text, contentKey }) => {
          try {
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

            return {
              contentKey,
              originalText: text,
              translatedText,
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
          translations: translatedTexts,
          totalCount: translatedTexts.length,
          successCount: translatedTexts.filter((t) => t.success).length,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      const { text, targetLang, sourceLang = "TR", contentKey }: TranslateRequest = await req.json();

      if (!text || !targetLang) {
        return new Response(
          JSON.stringify({ error: "text and targetLang are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

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

      return new Response(
        JSON.stringify({
          originalText: text,
          translatedText,
          detectedSourceLang: data.translations[0]?.detected_source_language,
          contentKey,
          targetLang,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
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