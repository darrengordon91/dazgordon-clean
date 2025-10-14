import { StoryblokComponent, getStoryblokApi } from '@storyblok/react';
import { notFound } from 'next/navigation';

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  // Check if we're in preview mode
  const isPreview = searchParams._storyblok !== undefined;

  try {
    console.log('🔍 Fetching StoryBlok content for home page...', isPreview ? 'draft' : 'published');
    
    const storyblokApi = getStoryblokApi();
    
    // Use hardcoded token as fallback
    const token = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || 'eHn8yhaa2KyhmUlzKb9PHgtt';
    
    const { data } = await storyblokApi.get('cdn/stories/home', {
      version: isPreview ? 'draft' : 'published',
      token: token,
      resolve_relations: ['featured_projects', 'featured_posts', 'featured_tools'],
    });

    if (!data.story) {
      console.log('❌ No StoryBlok story found for home');
      notFound();
    }

    console.log('✅ StoryBlok story found:', data.story.name);
    console.log('Story content components:', data.story.content?.body?.map((comp: any) => comp.component));

    return (
      <div className="min-h-screen">
        <StoryblokComponent blok={data.story.content} />
      </div>
    );
  } catch (error) {
    console.error('❌ Error fetching home story:', error);
    
    // Return a fallback page instead of notFound
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Daz Gordon</h1>
          <p className="text-lg text-gray-600 mb-8">
            Product Designer & Developer building digital products that matter.
          </p>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p className="font-semibold">StoryBlok Integration Error</p>
            <p>Unable to fetch content from StoryBlok. Please check your configuration.</p>
            <p className="text-sm mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
            <p className="text-sm mt-1">Token: {process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ? 'Set' : 'Not Set'}</p>
            <p className="text-sm mt-1">Preview Mode: {isPreview ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    );
  }
}

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const isPreview = searchParams._storyblok !== undefined;

  try {
    const storyblokApi = getStoryblokApi();
    const token = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || 'eHn8yhaa2KyhmUlzKb9PHgtt';
    
    const { data } = await storyblokApi.get('cdn/stories/home', {
      version: isPreview ? 'draft' : 'published',
      token: token,
    });

    if (data.story) {
      return {
        title: data.story.content?.title || 'Daz Gordon - Product Designer & Builder',
        description: data.story.content?.description || 'Product designer, builder, and entrepreneur sharing insights on design, AI, and product development.',
      };
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  return {
    title: 'Daz Gordon - Product Designer & Builder',
    description: 'Product designer, builder, and entrepreneur sharing insights on design, AI, and product development.',
  };
}

export const dynamic = 'force-dynamic';
