'use client';

import { storyblokInit, apiPlugin } from '@storyblok/react';
import { components } from '@/lib/storyblok';

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || 'eHn8yhaa2KyhmUlzKb9PHgtt',
  use: [apiPlugin],
  apiOptions: {
    region: 'eu-central-1',
  },
  enablePreviewMode: true,
  components,
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
