import { StoryblokComponent, getStoryblokApi } from '@storyblok/react';
import { notFound } from 'next/navigation';

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const storyblokApi = getStoryblokApi();
  
  // Check if we're in preview mode
  const isPreview = searchParams._storyblok !== undefined;

  try {
    console.log('🔍 Fetching StoryBlok content for home page...', isPreview ? 'draft' : 'published');
    
    const { data } = await storyblokApi.get('cdn/stories/home', {
      version: isPreview ? 'draft' : 'published',
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
    notFound();
  }
}

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const storyblokApi = getStoryblokApi();
  const isPreview = searchParams._storyblok !== undefined;

  try {
    const { data } = await storyblokApi.get('cdn/stories/home', {
      version: isPreview ? 'draft' : 'published',
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
