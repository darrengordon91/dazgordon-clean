interface HeroProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    subtitle?: string;
    cta_text?: string;
    cta_link?: string;
  };
}

export default function Hero({ blok }: HeroProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          {blok.title || 'Hey, I\'m Daz Gordon'}
        </h1>
        {blok.subtitle && (
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {blok.subtitle}
          </p>
        )}
        {blok.cta_text && blok.cta_link && (
          <a
            href={blok.cta_link}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {blok.cta_text}
          </a>
        )}
      </div>
    </section>
  );
}