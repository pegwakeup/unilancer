import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, RefreshCw, Search, Filter, CheckCircle, XCircle,
  AlertCircle, Download, Upload, Loader2
} from 'lucide-react';
import { supabase } from '../../../../lib/supabase';

interface Translation {
  id: string;
  content_key: string;
  language: string;
  translated_text: string;
  content_hash: string;
  created_at: string;
  updated_at: string;
}

const TranslationManager = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [retranslating, setRetranslating] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    tr: 0,
    en: 0,
  });

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('content_key', { ascending: true });

      if (error) throw error;

      setTranslations(data || []);

      const trCount = data?.filter(t => t.language === 'tr').length || 0;
      const enCount = data?.filter(t => t.language === 'en').length || 0;

      setStats({
        total: data?.length || 0,
        tr: trCount,
        en: enCount,
      });
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const retranslateContent = async (contentKey: string, originalText: string) => {
    try {
      setRetranslating(true);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-content`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: originalText,
          targetLang: 'EN',
          sourceLang: 'TR',
          contentKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const result = await response.json();

      const { error } = await supabase
        .from('translations')
        .upsert({
          content_key: contentKey,
          language: 'en',
          translated_text: result.translatedText,
          content_hash: generateHash(originalText),
        });

      if (error) throw error;

      await loadTranslations();

      return { success: true };
    } catch (error) {
      console.error('Error retranslating:', error);
      return { success: false, error };
    } finally {
      setRetranslating(false);
    }
  };

  const retranslateAll = async () => {
    try {
      setRetranslating(true);

      const trTranslations = translations.filter(t => t.language === 'tr');
      const textsToTranslate = trTranslations.map(t => ({
        text: t.translated_text,
        contentKey: t.content_key,
      }));

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-content/batch`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts: textsToTranslate,
          targetLang: 'EN',
          sourceLang: 'TR',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Translation API Error:', errorText);
        throw new Error(`Batch translation failed: ${errorText}`);
      }

      const result = await response.json();

      for (const translation of result.translations) {
        if (translation.success) {
          await supabase
            .from('translations')
            .upsert({
              content_key: translation.contentKey,
              language: 'en',
              translated_text: translation.translatedText,
              content_hash: generateHash(translation.originalText),
            });
        }
      }

      await loadTranslations();

      alert(`Successfully retranslated ${result.successCount} out of ${result.totalCount} items`);
    } catch (error) {
      console.error('Error retranslating all:', error);
      alert('Error retranslating content');
    } finally {
      setRetranslating(false);
    }
  };

  const generateHash = (text: string): string => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  };

  const filteredTranslations = translations.filter(t => {
    const matchesSearch = t.content_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.translated_text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || t.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary" />
            Translation Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and update translations across the website
          </p>
        </div>

        <motion.button
          onClick={retranslateAll}
          disabled={retranslating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {retranslating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          <span>Retranslate All</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-light rounded-lg p-6 border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Translations</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-light rounded-lg p-6 border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-blue-500">TR</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Turkish</p>
              <p className="text-2xl font-bold">{stats.tr}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-light rounded-lg p-6 border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-green-500">EN</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">English</p>
              <p className="text-2xl font-bold">{stats.en}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-light rounded-lg border border-slate-200 dark:border-white/10 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search translations..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Languages</option>
            <option value="tr">Turkish</option>
            <option value="en">English</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTranslations.map((translation) => (
              <div
                key={translation.id}
                className="p-4 border border-slate-200 dark:border-white/10 rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {translation.content_key}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        translation.language === 'tr'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}>
                        {translation.language.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-gray-100">
                      {translation.translated_text}
                    </p>
                  </div>

                  {translation.language === 'tr' && (
                    <button
                      onClick={() => retranslateContent(translation.content_key, translation.translated_text)}
                      disabled={retranslating}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark rounded-lg transition-colors disabled:opacity-50"
                      title="Retranslate to English"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationManager;
