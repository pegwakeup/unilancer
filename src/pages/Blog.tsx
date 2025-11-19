import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBlogPosts, type BlogPost } from '../lib/supabase';
import { useTranslation } from '../hooks/useTranslation';

const getCategoryKeys = () => [
  'blog.category.all',
  'blog.category.technology',
  'blog.category.design',
  'blog.category.ai',
  'blog.category.webDevelopment',
  'blog.category.mobile'
];

const BlogCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-video bg-white dark:bg-dark-light/50 rounded-xl mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-white dark:bg-dark-light/50 rounded w-1/4" />
      <div className="h-6 bg-white dark:bg-dark-light/50 rounded w-3/4" />
      <div className="h-4 bg-white dark:bg-dark-light/50 rounded w-2/3" />
    </div>
  </div>
);

const Blog = () => {
  const { t } = useTranslation();
  const categoryKeys = getCategoryKeys();
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 6;
  const [showBackToTop, setShowBackToTop] = useState(false);

  // İlk blog postlarını yükle
  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Arama sorgusu debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // yeni aramada sıfırla
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filtreleme ve sayfalama
  useEffect(() => {
    const filtered = posts.filter(post => {
      const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setVisiblePosts(filtered.slice(0, page * postsPerPage));
  }, [selectedCategory, debouncedQuery, posts, page]);

  // Back to top butonu kontrolü
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getBlogPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Blog yazıları yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => setPage(prev => prev + 1);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-dark">
      <Helmet>
        <title>Blog | Unilancer</title>
        <meta name="description" content="Teknoloji, tasarım ve dijital dönüşüm hakkında güncel içerikler ve uzman görüşleri." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[30vh] md:h-[35vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000"
            alt="Blog"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary mb-4 text-sm md:text-base"
            >
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              <span>Güncel İçerikler</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{t('blog.title')}</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Search and Filters */}
          <div className="mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mb-6 md:mb-8 max-w-xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder={t('blog.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-dark-light/80 backdrop-blur-sm border border-white/10 rounded-xl pl-10 md:pl-12 pr-4 py-2.5 md:py-3 focus:outline-none focus:border-primary transition-colors text-sm md:text-base placeholder-gray-400 text-gray-100"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 md:gap-3"
            >
              {categoryKeys.map((categoryKey) => (
                <button
                  key={categoryKey}
                  onClick={() => { setSelectedCategory(categoryKey); setPage(1); }}
                  className={`
                    px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-sm transition-all
                    ${selectedCategory === categoryKey
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white dark:bg-dark-light/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-primary/10 border border-white/10'}
                  `}
                >
                  {t(categoryKey)}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCardSkeleton />
                </motion.div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={loadBlogPosts}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {t('blog.loading')}
                </button>
              </div>
            ) : (
              posts
                .filter(post => {
                  const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
                  const matchesSearch =
                    post.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase());
                  return matchesCategory && matchesSearch;
                })
                .slice(0, page * postsPerPage)
                .map((post) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="block bg-white dark:bg-dark-light/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/20 transition-all overflow-hidden transform group-hover:scale-105"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 z-10">
                          <span className="inline-block px-2.5 py-1 md:px-3 md:py-1 bg-primary/90 backdrop-blur-sm text-white text-xs md:text-sm rounded-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <h2 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 text-sm">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <img
                              src={post.author.avatar_url}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full"
                              loading="lazy"
                            />
                            <div>
                              <h3 className="text-sm font-medium">{post.author.name}</h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{post.author.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))
            )}
          </div>

          {/* Load More Button */}
          {!loading && !error && posts.filter(post => {
            const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
            const matchesSearch =
              post.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase());
            return matchesCategory && matchesSearch;
          }).length > visiblePosts.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors"
              >
                Daha Fazla Göster
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary rounded-full shadow-lg hover:bg-primary-dark transition-colors"
          aria-label="Back to top"
        >
          <ArrowUpRight className="w-5 h-5 transform rotate-45" />
        </button>
      )}
    </div>
  );
};

export default Blog;
