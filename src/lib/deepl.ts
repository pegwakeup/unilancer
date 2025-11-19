import { supabase } from './supabase';

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
  return {
    translatedText: text,
    error: 'DeepL translation should be done server-side via Edge Functions'
  };
}

export async function translateTextBatch(
  texts: string[],
  sourceLang: Language = 'tr',
  targetLang: Language = 'en'
): Promise<TranslationResult[]> {
  return texts.map(text => ({
    translatedText: text,
    error: 'DeepL translation should be done server-side via Edge Functions'
  }));
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
      return existingTranslation.translated_text;
    }

    return originalText;
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
  try {
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('title_en, excerpt_en, content_en, slug_en')
      .eq('id', postId)
      .maybeSingle();

    if (existingPost?.title_en) {
      return {
        title_en: existingPost.title_en,
        excerpt_en: existingPost.excerpt_en,
        content_en: existingPost.content_en,
        slug_en: existingPost.slug_en
      };
    }

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

    return {
      title_en: title,
      excerpt_en: excerpt,
      content_en: content,
      slug_en: slugEn
    };
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

export async function checkDeepLUsage(): Promise<null> {
  console.warn('DeepL usage check should be done server-side');
  return null;
}
