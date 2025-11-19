import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { PrivacyTermsProvider } from './components/ui/privacy-terms-provider';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Login = lazy(() => import('./pages/Login'));
const JoinUs = lazy(() => import('./pages/JoinUs'));
const ProjectRequest = lazy(() => import('./pages/ProjectRequest'));
const Contact = lazy(() => import('./pages/Contact'));
const ThreeDARVirtualTour = lazy(() => import('./pages/ThreeDARVirtualTour'));

// Admin routes
const AdminRoutes = lazy(() => import('./features/admin/routes'));

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Layout wrapper component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname.includes('/login');
  const isFormRoute = location.pathname.includes('/join') ||
                       location.pathname.includes('/project-request') ||
                       location.pathname.includes('/basvuru') ||
                       location.pathname.includes('/proje-talebi');

  if (isAdminRoute || isLoginRoute || isFormRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <LanguageProvider>
            <PrivacyTermsProvider>
              <ScrollToTop />
              <div className="min-h-screen bg-white dark:bg-dark text-slate-900 dark:text-white font-sans transition-colors duration-300">
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Turkish routes */}
                      <Route path="/tr" element={<Home />} />
                      <Route path="/tr/portfolyo" element={<Portfolio />} />
                      <Route path="/tr/hizmetler" element={<Services />} />
                      <Route path="/tr/digitall/3d-ar-sanal-tur" element={<ThreeDARVirtualTour />} />
                      <Route path="/tr/hakkimizda" element={<About />} />
                      <Route path="/tr/blog" element={<Blog />} />
                      <Route path="/tr/blog/:slug" element={<BlogDetail />} />
                      <Route path="/tr/basvuru" element={<JoinUs />} />
                      <Route path="/tr/proje-talebi" element={<ProjectRequest />} />
                      <Route path="/tr/iletisim" element={<Contact />} />

                      {/* English routes */}
                      <Route path="/en" element={<Home />} />
                      <Route path="/en/portfolio" element={<Portfolio />} />
                      <Route path="/en/services" element={<Services />} />
                      <Route path="/en/digitall/3d-ar-virtual-tour" element={<ThreeDARVirtualTour />} />
                      <Route path="/en/about" element={<About />} />
                      <Route path="/en/blog" element={<Blog />} />
                      <Route path="/en/blog/:slug" element={<BlogDetail />} />
                      <Route path="/en/join" element={<JoinUs />} />
                      <Route path="/en/project-request" element={<ProjectRequest />} />
                      <Route path="/en/contact" element={<Contact />} />

                      {/* Legacy routes - redirect to Turkish */}
                      <Route path="/portfolio" element={<Navigate to="/tr/portfolyo" replace />} />
                      <Route path="/services" element={<Navigate to="/tr/hizmetler" replace />} />
                      <Route path="/digitall/3d-ar-sanal-tur" element={<Navigate to="/tr/digitall/3d-ar-sanal-tur" replace />} />
                      <Route path="/about" element={<Navigate to="/tr/hakkimizda" replace />} />
                      <Route path="/blog" element={<Navigate to="/tr/blog" replace />} />
                      <Route path="/blog/:slug" element={<Navigate to="/tr/blog/:slug" replace />} />
                      <Route path="/join" element={<Navigate to="/tr/basvuru" replace />} />
                      <Route path="/project-request" element={<Navigate to="/tr/proje-talebi" replace />} />
                      <Route path="/contact" element={<Navigate to="/tr/iletisim" replace />} />

                      {/* Admin routes - language independent */}
                      <Route path="/login" element={<Login />} />
                      <Route
                        path="/admin/*"
                        element={
                          <PrivateRoute>
                            <AdminRoutes />
                          </PrivateRoute>
                        }
                      />

                      {/* Root redirect to Turkish */}
                      <Route path="/" element={<Navigate to="/tr" replace />} />

                      {/* Catch all route - redirect to Turkish home */}
                      <Route path="*" element={<Navigate to="/tr" replace />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </div>
            </PrivacyTermsProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;