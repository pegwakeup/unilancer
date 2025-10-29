# Library Files

Core utility functions and API integrations.

## Files Overview

### Authentication & Security
- **auth.ts** - User authentication functions (login, logout, session management)
- **supabase.ts** - Supabase client configuration and blog post management

### Data Management
- **portfolio.ts** - Portfolio items CRUD operations
- **freelancers.ts** - Freelancer applications management
- **projectRequests.ts** - Project request submissions and management

### Utilities
- **utils.ts** - General utility functions (classNames merging, etc.)

## Usage Examples

### Authentication
```typescript
import { signIn, signOut, getCurrentUser } from './lib/auth';

// Sign in
await signIn(email, password);

// Get current user
const user = await getCurrentUser();

// Sign out
await signOut();
```

### Blog Posts
```typescript
import { getBlogPosts, createBlogPost } from './lib/supabase';

// Get all posts
const posts = await getBlogPosts();

// Create new post
await createBlogPost(postData);
```

### Portfolio
```typescript
import { getPortfolioItems, createPortfolioItem } from './lib/portfolio';

// Get portfolio items
const items = await getPortfolioItems();
```
