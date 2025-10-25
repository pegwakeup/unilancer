import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load admin pages
const BlogAdminPage = lazy(() => import('./blog/pages/BlogAdminPage'));
const BlogEditor = lazy(() => import('./blog/pages/BlogEditor'));
const PortfolioAdminPage = lazy(() => import('./portfolio/pages/PortfolioAdminPage'));
const PortfolioEditor = lazy(() => import('./portfolio/pages/PortfolioEditor'));
const FreelancerList = lazy(() => import('./freelancers/pages/FreelancerList'));
const ProjectRequestsPage = lazy(() => import('./project-requests/pages/ProjectRequestsPage'));

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/admin/blog" replace />} />
      
      {/* Blog routes */}
      <Route path="/blog" element={<BlogAdminPage />} />
      <Route path="/blog/new" element={<BlogEditor />} />
      <Route path="/blog/edit/:id" element={<BlogEditor />} />
      
      {/* Portfolio routes */}
      <Route path="/portfolio" element={<PortfolioAdminPage />} />
      <Route path="/portfolio/new" element={<PortfolioEditor />} />
      <Route path="/portfolio/edit/:id" element={<PortfolioEditor />} />
      
      {/* Freelancer routes */}
      <Route path="/freelancers" element={<FreelancerList />} />

      {/* Project Requests routes */}
      <Route path="/project-requests" element={<ProjectRequestsPage />} />
      
      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/admin/blog" replace />} />
    </Routes>
  );
};

export default AdminRoutes;