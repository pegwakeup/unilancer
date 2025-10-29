import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { PrivacyTermsProvider } from './components/ui/privacy-terms-provider';
import { ThemeProvider } from './contexts/ThemeContext';

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
const AR3DIntegration = lazy(() => import('./pages/AR3DIntegration'));

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
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:bg-dark flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Layout wrapper component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/login';
  const isFormRoute = location.pathname === '/join' || location.pathname === '/project-request';

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
      <ThemeProvider>
        <PrivacyTermsProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:bg-dark text-slate-900 dark:text-white font-sans transition-colors duration-300">
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/ar-3d" element={<AR3DIntegration />} />
                  <Route path="/join" element={<JoinUs />} />
                  <Route path="/project-request" element={<ProjectRequest />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Admin routes */}
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/admin/*"
                    element={
                      <PrivateRoute>
                        <AdminRoutes />
                      </PrivateRoute>
                    }
                  />

                    {/* Catch all route - redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Layout>
            </div>
          </Router>
        </PrivacyTermsProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;