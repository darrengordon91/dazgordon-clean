import { storyblokInit, apiPlugin } from '@storyblok/react';
import Page from '../components/Page';
import Hero from '../components/blocks/Hero';
import Marquee from '../components/blocks/Marquee';
import AboutSection from '../components/blocks/AboutSection';
import Companies from '../components/blocks/Companies';
import ProjectsSection from '../components/blocks/ProjectsSection';
import LatestWork from '../components/blocks/LatestWork';
import Contact from '../components/blocks/Contact';

// Storyblok components mapping - Direct imports for better reliability
export const components = {
  // Page-level components
  page: Page,
  
  // Core content blocks (working components)
  hero: Hero,
  marquee: Marquee,
  about_section: AboutSection,
  companies: Companies,
  projects_section: ProjectsSection,
  latest_work: LatestWork,
  contact: Contact,
  
  // Placeholder components for future expansion
  company_item: Companies,
  project_item: ProjectsSection,
  blog_post_item: LatestWork,
  beliefs: AboutSection,
  belief_item: AboutSection,
  journey: AboutSection,
  timeline_item: AboutSection,
  what_i_do: AboutSection,
  tool_item: AboutSection,
  newsletter_tease: Contact,
  project: ProjectsSection,
  blog_post: LatestWork,
  tool: AboutSection,
  idea: AboutSection,
  book_note: LatestWork,
  hundred_ways: AboutSection,
  stuff_i_own: AboutSection,
  strong_opinion: AboutSection,
  services: Contact,
  service_item: Contact,
  social_link: Contact,
  wavy_divider: Marquee,
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