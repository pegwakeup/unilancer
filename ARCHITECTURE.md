# Project Architecture

## Overview
This is a modern React-based web application for Unilancer Labs, featuring a public-facing website and an admin panel.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # UI component library
│   ├── hooks/           # Custom React hooks
│   ├── Navbar.tsx       # Main navigation
│   ├── Footer.tsx       # Site footer
│   └── PrivateRoute.tsx # Auth guard
├── pages/               # Page components (routes)
│   ├── Home.tsx         # Landing page
│   ├── About.tsx        # About us page
│   ├── Services.tsx     # Services showcase
│   ├── Portfolio.tsx    # Projects portfolio
│   ├── Blog.tsx         # Blog listing
│   ├── BlogDetail.tsx   # Individual blog post
│   ├── Contact.tsx      # Contact page
│   ├── JoinUs.tsx       # Freelancer application
│   ├── ProjectRequest.tsx # Project request form
│   └── Login.tsx        # Admin login
├── features/            # Feature modules
│   └── admin/           # Admin panel feature
│       ├── blog/        # Blog management
│       ├── portfolio/   # Portfolio management
│       ├── freelancers/ # Freelancer management
│       ├── project-requests/ # Project requests
│       └── components/  # Admin-specific components
├── lib/                 # Utilities & API
│   ├── auth.ts          # Authentication
│   ├── supabase.ts      # Supabase client & blog API
│   ├── portfolio.ts     # Portfolio API
│   ├── freelancers.ts   # Freelancers API
│   ├── projectRequests.ts # Project requests API
│   └── utils.ts         # General utilities
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Dark/Light theme
├── data/                # Static data
│   ├── cities.ts        # Turkish cities
│   ├── countries.ts     # Countries list
│   └── blogPosts.ts     # Blog posts (legacy)
├── types/               # TypeScript type definitions
│   └── freelancer.ts    # Freelancer types
└── App.tsx              # Root component

```

## Key Patterns

### 1. Feature-Based Organization
Admin features are organized in `features/admin/` with their own:
- Pages
- Components
- Hooks
- Types

### 2. Barrel Exports
Components use index files for cleaner imports:
```typescript
// components/ui/index.ts exports all UI components
import { Button, Badge } from '@/components/ui';
```

### 3. Type Safety
- All components use TypeScript
- Shared types in `/types` directory
- Feature-specific types in feature folders

### 4. API Layer
All API calls are abstracted in `/lib`:
- Consistent error handling
- Type-safe responses
- Centralized Supabase client

### 5. Protected Routes
Admin routes use `PrivateRoute` component:
```typescript
<Route path="/admin/*" element={
  <PrivateRoute>
    <AdminRoutes />
  </PrivateRoute>
} />
```

## Data Flow

1. **Public Pages**: Direct Supabase queries via lib functions
2. **Admin Panel**: Custom hooks + lib functions
3. **Authentication**: Context-free, function-based
4. **Theme**: React Context (ThemeContext)

## Routing Structure

```
/ - Home page
/about - About us
/services - Services listing
/portfolio - Projects portfolio
/blog - Blog posts
/blog/:slug - Individual blog post
/contact - Contact page
/join - Freelancer application
/project-request - Project request form
/login - Admin login
/admin/* - Admin panel routes
  /admin/blog - Blog management
  /admin/portfolio - Portfolio management
  /admin/freelancers - Freelancer applications
  /admin/project-requests - Project requests
```

## Database Schema (Supabase)

### Tables
- `blog_posts` - Blog content
- `portfolio_items` - Portfolio projects
- `freelancer_applications` - Freelancer forms
- `project_requests` - Project request forms

### Storage Buckets
- `blog-images` - Blog post images
- `portfolio-images` - Portfolio images

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Development Guidelines

1. **Component Creation**
   - Use functional components with hooks
   - Add JSDoc documentation
   - Export types if needed

2. **Styling**
   - Use Tailwind utility classes
   - Follow dark mode pattern: `class="bg-white dark:bg-dark"`
   - Responsive: mobile-first approach

3. **State Management**
   - Local state with `useState` for component-specific
   - Custom hooks for shared logic
   - Context for global state (theme)

4. **Performance**
   - Lazy load pages with React.lazy()
   - Image optimization with loading="lazy"
   - Debounce search inputs

5. **Accessibility**
   - Semantic HTML
   - ARIA labels on interactive elements
   - Keyboard navigation support

## Build & Deployment

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The build output goes to `/dist` directory.
