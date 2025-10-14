interface PageProps {
  blok: {
    _uid: string;
    component: string;
    body?: Array<{
      _uid: string;
      component: string;
      [key: string]: unknown;
    }>;
    title?: string;
    description?: string;
  };
}

// Simple component renderer for any StoryBlok component
function renderComponent(block: {
  _uid: string;
  component: string;
  [key: string]: unknown;
}) {
  switch (block.component) {
    case 'hero':
      return (
        <section key={block._uid} className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {(block as any).title || 'Hey, I\'m Daz'}
            </h1>
            {(block as any).subtitle && (
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {(block as any).subtitle}
              </p>
            )}
            {(block as any).cta_text && (block as any).cta_link && (
              <a
                href={(block as any).cta_link}
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {(block as any).cta_text}
              </a>
            )}
          </div>
        </section>
      );
    
    case 'marquee':
      return (
        <section key={block._uid} className="py-4 bg-gray-900 text-white overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-lg font-medium">{(block as any).text}</span>
          </div>
        </section>
      );
    
    case 'about_section':
      return (
        <section key={block._uid} className="py-20 px-6 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {(block as any).title || 'About Me'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {(block as any).content || 'I\'m a product designer and developer with over 10 years of experience.'}
            </p>
          </div>
        </section>
      );
    
    case 'companies':
      return (
        <section key={block._uid} className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              {(block as any).title || 'Companies I\'ve Worked With'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {((block as any).companies || []).map((company: any, index: number) => (
                <div key={index} className="text-gray-600 font-medium">
                  {company.name || `Company ${index + 1}`}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    
    case 'projects_section':
      return (
        <section key={block._uid} className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              {(block as any).title || 'Featured Projects'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {((block as any).projects || []).map((project: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.name || `Project ${index + 1}`}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.description || 'A brief description of the project.'}
                    </p>
                    <a href={project.link || '#'} className="text-blue-600 font-semibold hover:underline">
                      View Project →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    
    case 'latest_work':
      return (
        <section key={block._uid} className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              {(block as any).title || 'Latest from the Blog'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {((block as any).posts || []).map((post: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title || `Blog Post ${index + 1}`}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt || 'A brief excerpt from the blog post.'}
                  </p>
                  <a href={post.link || '#'} className="text-blue-600 font-semibold hover:underline">
                    Read More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    
    case 'contact':
      return (
        <section key={block._uid} className="py-20 px-6 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {(block as any).title || 'Let\'s Work Together'}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {(block as any).content || 'Ready to build something amazing? Get in touch and let\'s discuss your project.'}
            </p>
            <div className="flex justify-center space-x-6">
              {((block as any).social_links || []).map((link: any) => (
                <a
                  key={link._uid}
                  href={link.url}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform || link.icon}
                </a>
              ))}
            </div>
          </div>
        </section>
      );
    
    default:
      return (
        <div key={block._uid} className="py-8">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {block.component}
            </h2>
            <p className="text-gray-600">
              Component: {block.component} - Content will be rendered here
            </p>
          </div>
        </div>
      );
  }
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
      
      {blok.body && blok.body.map(renderComponent)}
    </div>
  );
}
