import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBlogPosts, type BlogPost } from '../lib/supabase';

const categories = [
  "Tümü",
  "Teknoloji",
  "Tasarım",
  "Yapay Zeka",
  "Web Geliştirme",
  "Mobil"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Tümü");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const fetchedPosts = await getBlogPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:bg-dark">
      <Helmet><title>Blog | Unilancer</title></Helmet>
      <section className="relative h-[30vh] md:h-[35vh]">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000" alt="Blog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Blog</h1>
            <p className="text-base md:text-lg text-gray-300">Teknoloji, tasarım ve dijital dönüşüm hakkında güncel içerikler</p>
          </motion.div>
        </div>
      </section>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8 md:mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mb-6 md:mb-8 max-w-xl mx-auto">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              <input type="text" placeholder="Blog yazılarında ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white dark:bg-dark-light/80 backdrop-blur-sm border border-white/10 rounded-xl pl-10 md:pl-12 pr-4 py-2.5 md:py-3 focus:outline-none focus:border-primary transition-colors text-sm md:text-base" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-sm transition-all ${selectedCategory === category ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-dark-light/80 text-gray-600 dark:text-gray-300 hover:bg-primary/10'}`}>
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="animate-pulse">
                  <div className="aspect-video bg-white dark:bg-dark-light/50 rounded-xl mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-white dark:bg-dark-light/50 rounded w-1/4" />
                    <div className="h-6 bg-white dark:bg-dark-light/50 rounded w-3/4" />
                  </div>
                </motion.div>
              ))
            ) : (
              posts.filter(post => {
                const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
                const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
              }).map((post) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group">
                  <Link to={`/blog/${post.slug}`} className="block bg-white dark:bg-dark-light/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/20 transition-all overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                        <span className="inline-block px-2.5 py-1 md:px-3 md:py-1 bg-primary/90 text-white text-xs md:text-sm rounded-lg">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h2 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 text-sm">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
