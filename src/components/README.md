# Components Directory

Reusable React components for the application.

## Structure

```
components/
├── ui/                    # UI components library
│   ├── accordion.tsx      # Collapsible content
│   ├── badge.tsx          # Badge/pill components
│   ├── button.tsx         # Button variants
│   ├── carousel.tsx       # Image/content carousel
│   ├── cta-with-glow.tsx  # Call-to-action with glow effect
│   ├── faq.tsx            # FAQ accordion
│   ├── feature*.tsx       # Feature section components
│   ├── glow.tsx           # Glow effect wrapper
│   ├── logos-carousel.tsx # Partner logos carousel
│   ├── parallax-floating.tsx # Parallax floating elements
│   ├── portfolio-preview.tsx # Portfolio section preview
│   ├── privacy-*.tsx      # Privacy & terms modals
│   ├── services-section.tsx # Services showcase
│   ├── terms-modal.tsx    # Terms & conditions modal
│   └── text-rotate.tsx    # Rotating text animation
├── hooks/                 # Custom React hooks
│   ├── use-screen-size.ts
│   └── use-debounced-dimensions.ts
├── Footer.tsx             # Site footer
├── Navbar.tsx             # Main navigation
└── PrivateRoute.tsx       # Protected route wrapper
```

## Import Usage

Import from barrel exports for cleaner code:

```typescript
// ✓ Recommended
import { Button, Badge, Accordion } from '@/components/ui';
import { Navbar, Footer } from '@/components';

// ✗ Avoid
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
```

## Component Guidelines

1. **All components should be documented** with JSDoc comments
2. **Use TypeScript** for all new components
3. **Export types** alongside components
4. **Follow naming conventions**: PascalCase for components
5. **Keep components focused**: One responsibility per component
