interface HeroProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    subtitle?: string;
    cta_text?: string;
    cta_link?: string;
    background_image?: string;
  };
}

export default function Hero({ blok }: HeroProps) {
  return (
    <section 
      data-blok-c={JSON.stringify(blok)} 
      data-blok-uid={blok._uid}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
    >
      {blok.background_image && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${blok.background_image})` }}
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {blok.title || 'Daz Gordon'}
        </h1>
        {blok.subtitle && (
          <p className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {blok.subtitle}
          </p>
        )}
        {blok.cta_text && blok.cta_link && (
          <div className="mt-10 flex justify-center space-x-4">
            <a 
              href={blok.cta_link}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              {blok.cta_text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
