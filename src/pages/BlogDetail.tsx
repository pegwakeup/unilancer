import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Tag, ChevronUp, ArrowLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlogPost, type BlogPost } from '../lib/supabase';

type Heading = {
  id: string;
  text: string | null;
  level: number;
};

const extractHeadings = (content: string): Heading[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h2, h3'));
  return headings.map(heading => ({
    id: heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
    text: heading.textContent,
    level: parseInt(heading.tagName.charAt(1))
  }));
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!slug) {
          navigate('/blog');
          return;
        }

        setLoading(true);
        const fetchedPost = await getBlogPost(slug);
        
        if (!fetchedPost) {
          throw new Error('Blog yazısı bulunamadı.');
        }

        setPost(fetchedPost);

        // Initialize headings after content is loaded
        setTimeout(() => {
          if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll('h2, h3');
            headings.forEach(heading => {
              const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-');
              if (id) heading.id = id;
            });
          }
        }, 0);
      } catch (err) {
        console.error('Blog post loading error:', err);
        setError('Blog yazısı yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      if (contentRef.current) {
        const headings = Array.from(contentRef.current.querySelectorAll('h2, h3'));
        const scrollPosition = window.scrollY + 100; // Offset for header

        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i];
          if (heading.offsetTop <= scrollPosition) {
            const id = heading.id;
            if (id !== activeHeading) {
              setActiveHeading(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeHeading]);

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const offset = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile ToC after clicking
      setShowToc(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Blog yazısı bulunamadı.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Blog'a Dön
          </Link>
        </div>
      </div>
    );
  }

  const headings = extractHeadings(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark">
      <Helmet>
        <title>{post.title} | Unilancer Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image_url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image_url} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-end h-full pb-12 md:pb-16 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm">
                  <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary rounded-full text-xs md:text-sm">
                    {post.category}
                  </span>
                  <span className="flex items-center text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" />
                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                  </span>
                  <span className="flex items-center text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" />
                    {post.read_time}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  {post.title}
                </h1>

                <div className="flex items-center space-x-3 md:space-x-4 pt-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-lg opacity-50" />
                    <img
                      src={post.author.avatar_url}
                      alt={post.author.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full relative"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm md:text-base">{post.author.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              {/* Mobile ToC Toggle */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8">
                  <button
                    onClick={() => setShowToc(!showToc)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-dark-light/80 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <span className="font-medium">İçindekiler</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${showToc ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showToc && (
                    <div className="mt-2 p-4 bg-white dark:bg-dark-light/80 backdrop-blur-sm rounded-xl border border-white/10">
                      <div className="space-y-1">
                        {headings.map((heading, index) => (
                          <button
                            key={index}
                            onClick={() => scrollToHeading(heading.id)}
                            className={`
                              w-full text-left py-2 px-3 transition-all duration-200 rounded-lg
                              ${heading.level === 2 ? '' : 'pl-6'}
                              ${activeHeading === heading.id
                                ? 'text-primary bg-primary/10 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-white hover:bg-white/5'
                              }
                              ${heading.level === 2 ? 'text-[0.95rem]' : 'text-[0.9rem]'}
                            `}
                          >
                            {heading.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div 
                ref={contentRef}
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex items-center space-x-2 mt-8 pt-8 border-t border-white/10">
                <Tag className="w-4 h-4 text-primary" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-white dark:bg-dark-light/80 backdrop-blur-sm rounded-full text-xs md:text-sm text-gray-600 dark:text-gray-300 hover:bg-white/10 transition-colors cursor-pointer hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Table of Contents Sidebar */}
            {headings.length > 0 && (
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="sticky top-24">
                  <nav
                    className="p-6 bg-white dark:bg-dark-light/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg"
                    aria-label="İçindekiler"
                  >
                    <h2 className="text-lg font-semibold mb-4">İçindekiler</h2>
                    <div className="space-y-1">
                      {headings.map((heading, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToHeading(heading.id)}
                          className={`
                            w-full text-left py-2 px-3 transition-all duration-200 rounded-lg
                            ${heading.level === 2 ? '' : 'pl-6'}
                            ${activeHeading === heading.id
                              ? 'text-primary bg-primary/10 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:text-white hover:bg-white/5'
                            }
                            ${heading.level === 2 ? 'text-[0.95rem]' : 'text-[0.9rem]'}
                            group
                          `}
                        >
                          <span className="flex items-center">
                            {heading.text}
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`
          fixed bottom-6 md:bottom-8 right-6 md:right-8 p-2.5 md:p-3 bg-primary text-white rounded-full shadow-lg
          hover:bg-primary-dark transition-colors transform hover:scale-110
          ${showScrollTop ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>
    </div>
  );
};

export default BlogDetail;