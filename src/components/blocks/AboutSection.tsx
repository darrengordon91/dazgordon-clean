interface AboutSectionProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    content?: {
      type: string;
      content: Array<{
        type: string;
        content: Array<{
          text: string;
          type: string;
        }>;
      }>;
    };
  };
}

export default function AboutSection({ blok }: AboutSectionProps) {
  // Extract text content from rich text
  const getTextContent = (content: any): string => {
    if (typeof content === 'string') return content;
    if (content?.content) {
      return content.content
        .map((item: any) => {
          if (item.content) {
            return item.content.map((text: any) => text.text).join('');
          }
          return item.text || '';
        })
        .join(' ');
    }
    return '';
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          {blok.title || 'About Daz'}
        </h2>
        <div className="text-lg text-gray-600 max-w-3xl mx-auto">
          {blok.content ? getTextContent(blok.content) : 'I\'m a product designer and developer with over 10 years of experience.'}
        </div>
      </div>
    </section>
  );
}