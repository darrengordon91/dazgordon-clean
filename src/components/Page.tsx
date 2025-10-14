import { StoryblokComponent } from '@storyblok/react';

interface PageProps {
  blok: {
    _uid: string;
    component: string;
    body?: any[];
    title?: string;
    description?: string;
  };
}

export default function Page({ blok }: PageProps) {
  return (
    <div className="min-h-screen">
      {blok.title && (
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {blok.title}
          </h1>
          {blok.description && (
            <p className="mt-4 text-lg text-gray-600">
              {blok.description}
            </p>
          )}
        </div>
      )}
      
      {blok.body && blok.body.map((block: any) => (
        <StoryblokComponent key={block._uid} blok={block} />
      ))}
    </div>
  );
}
