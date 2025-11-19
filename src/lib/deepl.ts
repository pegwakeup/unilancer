import * as deepl from 'deepl-node';
import { supabase } from './supabase';

const apiKey = import.meta.env.VITE_DEEPL_API_KEY;

if (!apiKey) {
  console.warn('DeepL API key not found. Translation features will be disabled.');
}

let translator: deepl.Translator | null = null;

if (apiKey) {
  translator = new deepl.Translator(apiKey);
}

export type Language = 'tr' | 'en';

export interface TranslationResult {
  translatedText: string;
  detectedSourceLang?: string;
  error?: string;
}

export interface TranslationMetadata {
  totalCharacters: number;
  apiCalls: number;
  lastTranslationDate: string;
}

function generateHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function translateText(
  text: string,
  sourceLang: Language = 'tr',
  targetLang: Language = 'en'
): Promise<TranslationResult> {
  if (!translator) {
    return {
      translatedText: text,
      error: 'DeepL API not configured'
    };
  }

  if (!text || text.trim().length === 0) {
    return { translatedText: '' };
  }

  try {
    const result = await translator.translateText(
      text,
      sourceLang,
      targetLang === 'en' ? 'en-US' : targetLang
    );

    const translatedText = Array.isArray(result) ? result[0].text : result.text;
    const detectedSourceLang = Array.isArray(result) ? result[0].detectedSourceLang : result.detectedSourceLang;

    await updateTranslationMetadata(text.length);

    return {
      translatedText,
      detectedSourceLang
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      translatedText: text,
      error: error instanceof Error ? error.message : 'Translation failed'
    };
  }
}

export async function translateTextBatch(
  texts: string[],
  sourceLang: Language = 'tr',
  targetLang: Language = 'en'
): Promise<TranslationResult[]> {
  if (!translator) {
    return texts.map(text => ({
      translatedText: text,
      error: 'DeepL API not configured'
    }));
  }

  const validTexts = texts.filter(t => t && t.trim().length > 0);

  if (validTexts.length === 0) {
    return texts.map(() => ({ translatedText: '' }));
  }

  try {
    const results = await translator.translateText(
      validTexts,
      sourceLang,
      targetLang === 'en' ? 'en-US' : targetLang
    );

    const totalChars = validTexts.reduce((sum, text) => sum + text.length, 0);
    await updateTranslationMetadata(totalChars);

    return Array.isArray(results)
      ? results.map(r => ({
          translatedText: r.text,
          detectedSourceLang: r.detectedSourceLang
        }))
      : [{
          translatedText: results.text,
          detectedSourceLang: results.detectedSourceLang
        }];
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts.map(text => ({
      translatedText: text,
      error: error instanceof Error ? error.message : 'Translation failed'
    }));
  }
}

export async function getOrCreateTranslation(
  contentKey: string,
  originalText: string,
  language: Language = 'en'
): Promise<string> {
  if (language === 'tr') {
    return originalText;
  }

  const contentHash = generateHash(originalText);

  try {
    const { data: existingTranslation } = await supabase
      .from('translations')
      .select('translated_text, content_hash')
      .eq('content_key', contentKey)
      .eq('language', language)
      .maybeSingle();

    if (existingTranslation) {
      if (existingTranslation.content_hash === contentHash) {
        return existingTranslation.translated_text;
      }
    }

    const { translatedText, error } = await translateText(originalText, 'tr', language);

    if (error) {
      console.error(`Translation error for ${contentKey}:`, error);
      return originalText;
    }

    const { error: upsertError } = await supabase
      .from('translations')
      .upsert({
        content_key: contentKey,
        language,
        translated_text: translatedText,
        content_hash: contentHash,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'content_key,language'
      });

    if (upsertError) {
      console.error('Error saving translation:', upsertError);
    }

    return translatedText;
  } catch (error) {
    console.error('Error in getOrCreateTranslation:', error);
    return originalText;
  }
}

export async function translateBlogPost(
  postId: string,
  title: string,
  excerpt: string,
  content: string,
  slug: string
): Promise<{
  title_en: string;
  excerpt_en: string;
  content_en: string;
  slug_en: string;
}> {
  const contentHash = generateHash(title + excerpt + content);

  try {
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('title_en, excerpt_en, content_en, slug_en, content_hash')
      .eq('id', postId)
      .maybeSingle();

    if (existingPost?.content_hash === contentHash && existingPost.title_en) {
      return {
        title_en: existingPost.title_en,
        excerpt_en: existingPost.excerpt_en,
        content_en: existingPost.content_en,
        slug_en: existingPost.slug_en
      };
    }

    const [titleResult, excerptResult, contentResult] = await translateTextBatch(
      [title, excerpt, content],
      'tr',
      'en'
    );

    const slugEn = slug
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'i')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const translations = {
      title_en: titleResult.translatedText,
      excerpt_en: excerptResult.translatedText,
      content_en: contentResult.translatedText,
      slug_en: slugEn,
      content_hash: contentHash
    };

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update(translations)
      .eq('id', postId);

    if (updateError) {
      console.error('Error updating blog post translations:', updateError);
    }

    return translations;
  } catch (error) {
    console.error('Error translating blog post:', error);
    return {
      title_en: title,
      excerpt_en: excerpt,
      content_en: content,
      slug_en: slug
    };
  }
}

async function updateTranslationMetadata(charactersTranslated: number): Promise<void> {
  try {
    const { data: metadata } = await supabase
      .from('translation_metadata')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (metadata) {
      await supabase
        .from('translation_metadata')
        .update({
          total_characters_translated: metadata.total_characters_translated + charactersTranslated,
          api_calls_count: metadata.api_calls_count + 1,
          last_translation_date: new Date().toISOString()
        })
        .eq('id', metadata.id);
    }
  } catch (error) {
    console.error('Error updating translation metadata:', error);
  }
}

export async function getTranslationMetadata(): Promise<TranslationMetadata | null> {
  try {
    const { data } = await supabase
      .from('translation_metadata')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!data) return null;

    return {
      totalCharacters: data.total_characters_translated,
      apiCalls: data.api_calls_count,
      lastTranslationDate: data.last_translation_date
    };
  } catch (error) {
    console.error('Error fetching translation metadata:', error);
    return null;
  }
}

export async function checkDeepLUsage(): Promise<deepl.Usage | null> {
  if (!translator) {
    return null;
  }

  try {
    const usage = await translator.getUsage();
    return usage;
  } catch (error) {
    console.error('Error checking DeepL usage:', error);
    return null;
  }
}
