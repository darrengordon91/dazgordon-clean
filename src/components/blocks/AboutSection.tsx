interface AboutSectionProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    content?: string;
  };
}

export default function AboutSection({ blok }: AboutSectionProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          {blok.title || 'About Me'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {blok.content || 'I\'m a product designer and developer with over 10 years of experience.'}
        </p>
      </div>
    </section>
  );
}
