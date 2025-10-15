'use client';

import { useEffect, useState } from 'react';
import { StoryblokComponent, getStoryblokApi, storyblokInit, apiPlugin } from '@storyblok/react';

export default function DynamicPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string[] }>,
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [slug, setSlug] = useState('');

  // Check if we're in preview mode
  const isPreview = searchParams._storyblok !== undefined;

  useEffect(() => {
    setMounted(true);
    
    // Initialize StoryBlok
    try {
      storyblokInit({
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || 'eHn8yhaa2KyhmUlzKb9PHgtt',
        use: [apiPlugin],
        apiOptions: {
          region: 'eu-central-1',
        },
        enablePreviewMode: true,
      });
    } catch (err) {
      console.error('Error initializing StoryBlok:', err);
    }
  }, []);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const slugArray = resolvedParams.slug || [];
      const pageSlug = slugArray.length > 0 ? slugArray.join('/') : 'home';
      setSlug(pageSlug);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!mounted || !slug) return;

    const fetchStory = async () => {
      try {
        console.log('🔍 Fetching StoryBlok content for page:', slug, isPreview ? 'draft' : 'published');
        
        const storyblokApi = getStoryblokApi();
        
        if (!storyblokApi) {
          throw new Error('StoryBlok API not initialized');
        }
        
        const token = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || 'eHn8yhaa2KyhmUlzKb9PHgtt';
        
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
          version: isPreview ? 'draft' : 'published',
          token: token,
          resolve_relations: ['featured_projects', 'featured_posts', 'featured_tools'],
        });

        if (!data.story) {
          throw new Error(`No StoryBlok story found for ${slug}`);
        }

        console.log('✅ StoryBlok story found:', data.story.name);
        setStory(data.story);
      } catch (err) {
        console.error('❌ Error fetching story:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [mounted, slug, isPreview]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading content from StoryBlok...</p>
          <p className="text-sm text-slate-500 mt-2">Page: /{slug}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The page "/{slug}" could not be found in StoryBlok.
          </p>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p className="font-semibold">StoryBlok Error</p>
            <p>Unable to fetch content for this page.</p>
            <p className="text-sm mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
            <p className="text-sm mt-1">Page: /{slug}</p>
            <p className="text-sm mt-1">Preview Mode: {isPreview ? 'Yes' : 'No'}</p>
          </div>
          <div className="mt-6">
            <a href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  if (!story || !story.content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            No content found for "/{slug}" in StoryBlok.
          </p>
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            <p className="font-semibold">StoryBlok Content Issue</p>
            <p>Content is being fetched from StoryBlok, but no content found for this page.</p>
            <p className="text-sm mt-2">Page: /{slug}</p>
          </div>
          <div className="mt-6">
            <a href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <StoryblokComponent blok={story.content} />
    </div>
  );
}
