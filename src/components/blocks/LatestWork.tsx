interface LatestWorkProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    posts?: Array<{
      title: string;
      excerpt: string;
      link: string;
      date?: string;
    }>;
  };
}

export default function LatestWork({ blok }: LatestWorkProps) {
  const defaultPosts = [
    {
      title: 'Building Better User Experiences',
      excerpt: 'How to create products that users actually love and want to use.',
      link: '/blog/building-better-ux',
      date: '2024-01-15'
    },
    {
      title: 'The Future of Product Design',
      excerpt: 'Exploring emerging trends and technologies in product design.',
      link: '/blog/future-of-design',
      date: '2024-01-10'
    },
    {
      title: 'Lessons from 10 Years in Tech',
      excerpt: 'Key insights and learnings from a decade in the industry.',
      link: '/blog/lessons-10-years',
      date: '2024-01-05'
    }
  ];

  const posts = blok.posts && blok.posts.length > 0 ? blok.posts : defaultPosts;

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          {blok.title || 'Latest from the Blog'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              {post.date && (
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              )}
              <a 
                href={post.link} 
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}