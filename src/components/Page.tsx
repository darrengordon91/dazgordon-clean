import { StoryblokComponent } from '@storyblok/react';

interface StoryBlokBlock {
  _uid: string;
  component: string;
  [key: string]: unknown;
}

interface PageProps {
  blok: {
    _uid: string;
    component: string;
    body?: StoryBlokBlock[];
    title?: string;
    description?: string;
  };
}

export default function Page({ blok }: PageProps) {
  console.log('🎨 Page component rendering with blok:', blok);
  console.log('🎨 Page component type:', typeof blok);
  console.log('🎨 Page component keys:', Object.keys(blok));
  console.log('🎨 Page component body:', blok.body);
  
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
      
      {blok.body && blok.body.length > 0 ? (
        <div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded m-4">
            <p className="font-semibold">✅ Page component working!</p>
            <p>Found {blok.body.length} body components to render.</p>
          </div>
          {blok.body.map((block: StoryBlokBlock, index: number) => {
            console.log(`🎨 Rendering block ${index}:`, block.component, block);
            return <StoryblokComponent key={block._uid || index} blok={block} />;
          })}
        </div>
      ) : (
        <div className="container mx-auto px-6 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p className="font-semibold">No Body Content</p>
            <p>No body components found in the StoryBlok content.</p>
            <p className="text-sm mt-2">Available properties: {Object.keys(blok).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
