/**
 * UI Components Index
 * Central export point for all reusable UI components
 */

// Form & Interactive Components
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
export { Badge, badgeVariants } from './badge';
export { Button, buttonVariants } from './button';

// Layout & Structure Components
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './carousel';
export { CTASection } from './cta-with-glow';

// Content Components
export { FaqSectionDemo } from './faq-demo';
export { FAQ } from './faq';
export { Feature } from './feature';
export { FeatureSteps } from './feature-steps';
export { FeatureSectionTop } from './feature-section-top';
export { FeatureSectionBottom } from './feature-section-bottom';

// Animation & Effects
export { Glow } from './glow';
export { TextRotate } from './text-rotate';
export { default as Floating, FloatingElement } from './parallax-floating';

// Specialized Sections
export { LogosCarousel } from './logos-carousel';
export { PortfolioPreview } from './portfolio-preview';
export { ServicesSection } from './services-section';

// Modal & Overlays
export { PrivacyPolicyModal } from './privacy-policy-modal';
export { TermsModal } from './terms-modal';
export { PrivacyTermsProvider, usePrivacyTerms } from './privacy-terms-provider';
