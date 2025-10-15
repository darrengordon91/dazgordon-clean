import { storyblokInit, apiPlugin } from '@storyblok/react';

// Storyblok components mapping - Working components that match CMS structure
export const components = {
  // Page-level components
  page: () => import('../components/Page'),
  
  // Core content blocks (working components)
  hero: () => import('../components/blocks/Hero'),
  marquee: () => import('../components/blocks/Marquee'),
  about_section: () => import('../components/blocks/AboutSection'),
  companies: () => import('../components/blocks/Companies'),
  projects_section: () => import('../components/blocks/ProjectsSection'),
  latest_work: () => import('../components/blocks/LatestWork'),
  contact: () => import('../components/blocks/Contact'),
  
  // Placeholder components for future expansion
  company_item: () => import('../components/blocks/Companies'),
  project_item: () => import('../components/blocks/ProjectsSection'),
  blog_post_item: () => import('../components/blocks/LatestWork'),
  beliefs: () => import('../components/blocks/AboutSection'),
  belief_item: () => import('../components/blocks/AboutSection'),
  journey: () => import('../components/blocks/AboutSection'),
  timeline_item: () => import('../components/blocks/AboutSection'),
  what_i_do: () => import('../components/blocks/AboutSection'),
  tool_item: () => import('../components/blocks/AboutSection'),
  newsletter_tease: () => import('../components/blocks/Contact'),
  project: () => import('../components/blocks/ProjectsSection'),
  blog_post: () => import('../components/blocks/LatestWork'),
  tool: () => import('../components/blocks/AboutSection'),
  idea: () => import('../components/blocks/AboutSection'),
  book_note: () => import('../components/blocks/LatestWork'),
  hundred_ways: () => import('../components/blocks/AboutSection'),
  stuff_i_own: () => import('../components/blocks/AboutSection'),
  strong_opinion: () => import('../components/blocks/AboutSection'),
  services: () => import('../components/blocks/Contact'),
  service_item: () => import('../components/blocks/Contact'),
  social_link: () => import('../components/blocks/Contact'),
  wavy_divider: () => import('../components/blocks/Marquee'),
};

// Initialize Storyblok with proper error handling
try {
  console.log('🔧 Initializing StoryBlok with components:', Object.keys(components));
  storyblokInit({
    accessToken: 'eHn8yhaa2KyhmUlzKb9PHgtt', // Use the exact token you provided
    use: [apiPlugin],
    apiOptions: {
      region: 'eu-central-1',
    },
    // Enable preview mode for draft content
    enablePreviewMode: true,
    // Add components mapping
    components,
  });
  console.log('✅ StoryBlok initialized successfully with components');
} catch (error) {
  console.error('❌ Error initializing StoryBlok:', error);
}

// Storyblok configuration
export const storyblokConfig = {
  spaceId: '287766077619539',
  region: 'eu-central-1',
  previewToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || 'eHn8yhaa2KyhmUlzKb9PHgtt',
  publicToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || '75Os0ynnS4rM27uvkM8EoQtt',
};