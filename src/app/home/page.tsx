import { StoryblokComponent, getStoryblokApi } from '@storyblok/react';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get('cdn/stories/home', {
      version: 'published',
      resolve_relations: ['featured_projects', 'featured_posts'],
    });

    if (!data.story) {
      notFound();
    }

    return (
      <div className="min-h-screen">
        <StoryblokComponent blok={data.story.content} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching home story:', error);
    notFound();
  }
}
