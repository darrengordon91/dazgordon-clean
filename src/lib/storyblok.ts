import { storyblokInit, apiPlugin } from '@storyblok/react';

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu-central-1',
  },
  // Enable preview mode for draft content
  enablePreviewMode: true,
});

// Storyblok components mapping
export const components = {
  // Page-level components
  page: () => import('../components/Page'),
  
  // Home page sections
  hero: () => import('../components/blocks/Hero'),
  marquee: () => import('../components/blocks/Marquee'),
  about_section: () => import('../components/blocks/AboutSection'),
  companies: () => import('../components/blocks/Companies'),
  company_item: () => import('../components/blocks/CompanyItem'),
  projects_section: () => import('../components/blocks/ProjectsSection'),
  project_item: () => import('../components/blocks/ProjectItem'),
  latest_work: () => import('../components/blocks/LatestWork'),
  blog_post_item: () => import('../components/blocks/BlogPostItem'),
  
  // About page sections
  beliefs: () => import('../components/blocks/Beliefs'),
  belief_item: () => import('../components/blocks/BeliefItem'),
  journey: () => import('../components/blocks/Journey'),
  timeline_item: () => import('../components/blocks/TimelineItem'),
  what_i_do: () => import('../components/blocks/WhatIDo'),
  tool_item: () => import('../components/blocks/ToolItem'),
  newsletter_tease: () => import('../components/blocks/NewsletterTease'),
  
  // Content types
  project: () => import('../components/blocks/Project'),
  blog_post: () => import('../components/blocks/BlogPost'),
  tool: () => import('../components/blocks/Tool'),
  idea: () => import('../components/blocks/Idea'),
  book_note: () => import('../components/blocks/BookNote'),
  
  // Special content types
  hundred_ways: () => import('../components/blocks/HundredWays'),
  stuff_i_own: () => import('../components/blocks/StuffIOwn'),
  strong_opinion: () => import('../components/blocks/StrongOpinion'),
  
  // Contact and services
  contact: () => import('../components/blocks/Contact'),
  services: () => import('../components/blocks/Services'),
  service_item: () => import('../components/blocks/ServiceItem'),
  
  // Utility components
  social_link: () => import('../components/blocks/SocialLink'),
  wavy_divider: () => import('../components/blocks/WavyDivider'),
};

// Storyblok configuration
export const storyblokConfig = {
  spaceId: '287766077619539',
  region: 'eu-central-1',
  previewToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  publicToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
};
