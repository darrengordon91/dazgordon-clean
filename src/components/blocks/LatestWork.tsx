interface LatestWorkProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    description?: string;
    posts?: Array<{
      _uid: string;
      title: string;
      excerpt: string;
      image?: string;
      link?: string;
      date?: string;
    }>;
  };
}

export default function LatestWork({ blok }: LatestWorkProps) {
  return (
    <section 
      data-blok-c={JSON.stringify(blok)} 
      data-blok-uid={blok._uid}
      className="py-20 px-6 bg-slate-50 dark:bg-slate-800"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {blok.title || 'Latest from the Blog'}
          </h2>
          {blok.description && (
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {blok.description}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blok.posts?.map((post) => (
            <div key={post._uid} className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              {post.image && (
                <div className="mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {post.title}
              </h3>
              {post.date && (
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              )}
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {post.excerpt}
              </p>
              {post.link && (
                <a 
                  href={post.link} 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More →
                </a>
              )}
            </div>
          )) || (
            <div className="text-center text-gray-500 col-span-full">
              No blog posts available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
