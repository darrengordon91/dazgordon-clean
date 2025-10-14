interface AboutSectionProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    content?: string;
    image?: string;
  };
}

export default function AboutSection({ blok }: AboutSectionProps) {
  return (
    <section 
      data-blok-c={JSON.stringify(blok)} 
      data-blok-uid={blok._uid}
      className="py-20 px-6 bg-white dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          {blok.title || 'About Me'}
        </h2>
        {blok.image && (
          <div className="mb-8">
            <img 
              src={blok.image} 
              alt={blok.title || 'About section image'}
              className="mx-auto rounded-lg shadow-lg max-w-md"
            />
          </div>
        )}
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {blok.content || 'I\'m a product designer and developer with over 10 years of experience.'}
        </p>
      </div>
    </section>
  );
}
