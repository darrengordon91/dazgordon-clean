interface SocialLinkProps {
  blok: {
    _uid: string;
    component: string;
    platform?: string;
    icon?: string;
    url?: string;
  };
}

function SocialLink({ blok }: SocialLinkProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'twitter':
        return '🐦';
      case 'linkedin':
        return '💼';
      case 'github':
        return '🐙';
      default:
        return '🔗';
    }
  };

  return (
    <a
      href={blok.url || '#'}
      className="text-gray-600 hover:text-blue-600 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="text-2xl mr-2">{getIcon(blok.icon || '')}</span>
      {blok.platform || 'Social'}
    </a>
  );
}

interface ContactProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    content?: string;
    email?: string;
    social_links?: Array<SocialLinkProps['blok']>;
  };
}

export default function Contact({ blok }: ContactProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          {blok.title || 'Let\'s Work Together'}
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {blok.content || 'Ready to build something amazing? Get in touch and let\'s discuss your project.'}
        </p>
        
        {blok.email && (
          <div className="mb-8">
            <a 
              href={`mailto:${blok.email}`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              {blok.email}
            </a>
          </div>
        )}
        
        {blok.social_links && blok.social_links.length > 0 && (
          <div className="flex justify-center space-x-8">
            {blok.social_links.map((link) => (
              <SocialLink key={link._uid} blok={link} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}