import { storyblokInit, apiPlugin } from '@storyblok/react';

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu-central-1',
  },
  components: {
    // Page-level components
    page: () => import('../components/Page'),
    
    // Home page sections
    hero: () => import('../components/blocks/Hero'),
    marquee: () => import('../components/blocks/Marquee'),
    about_section: () => import('../components/blocks/AboutSection'),
    companies: () => import('../components/blocks/Companies'),
    projects_section: () => import('../components/blocks/ProjectsSection'),
    latest_work: () => import('../components/blocks/LatestWork'),
  },
});

// Storyblok configuration
export const storyblokConfig = {
  spaceId: '287766077619539',
  region: 'eu-central-1',
  previewToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  publicToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
};
