'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchStoryblokContent = async (forceRefresh = false) => {
    try {
      console.log('🔍 Fetching StoryBlok content for home page...', forceRefresh ? '(forced refresh)' : '');
      
      // Use the preview token and add cache busting
      const token = 'eHn8yhaa2KyhmUlzKb9PHgtt';
      const cacheBuster = forceRefresh ? `&_t=${Date.now()}` : '';
      const apiUrl = `https://api.storyblok.com/v2/cdn/stories/home?token=${token}&version=published&resolve_relations=featured_projects,featured_posts,featured_tools${cacheBuster}`;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`StoryBlok API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ StoryBlok content fetched successfully:', data.story?.name);
      console.log('Story content components:', data.story?.content?.body?.map((comp: any) => comp.component));
      console.log('Last updated:', data.story?.updated_at);
      setStory(data.story);
      setLastFetch(new Date().toISOString());
    } catch (error) {
      console.error('❌ Error fetching StoryBlok content:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mounted) return;
    fetchStoryblokContent();
  }, [mounted]);

  // Auto-refresh every 30 seconds to catch CMS changes
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing StoryBlok content...');
      fetchStoryblokContent(true);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Initializing...</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading content from StoryBlok...</p>
          <button 
            onClick={() => fetchStoryblokContent(true)}
            className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Force Refresh
          </button>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    console.log('📝 Using fallback static content due to error');
  }

  // If we have StoryBlok content, render it manually
  if (story && story.content && story.content.body) {
    console.log('🎨 Rendering StoryBlok content:', story.content);
    return (
      <div className="min-h-screen">
        {/* Debug info - remove in production */}
        <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white text-xs p-2 rounded z-50">
          <div>Last fetch: {lastFetch ? new Date(lastFetch).toLocaleTimeString() : 'Never'}</div>
          <div>Story updated: {story.updated_at ? new Date(story.updated_at).toLocaleTimeString() : 'Unknown'}</div>
          <button 
            onClick={() => fetchStoryblokContent(true)}
            className="mt-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {story.content.body.map((block: any, index: number) => {
          switch (block.component) {
            case 'hero':
              return (
                <section key={block._uid || index} className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
                  <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                      {block.title || 'Hey, I\'m Daz'}
                    </h1>
                    {block.subtitle && (
                      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        {block.subtitle}
                      </p>
                    )}
                    {block.cta_text && block.cta_link && (
                      <a
                        href={block.cta_link}
                        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {block.cta_text}
                      </a>
                    )}
                  </div>
                </section>
              );
            
            case 'marquee':
              return (
                <section key={block._uid || index} className="py-4 bg-gray-900 text-white overflow-hidden">
                  <div className="animate-marquee whitespace-nowrap">
                    <span className="text-lg font-medium">{block.text}</span>
                  </div>
                </section>
              );
            
            case 'about_section':
              return (
                <section key={block._uid || index} className="py-20 px-6 bg-white">
                  <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                      {block.title || 'About Me'}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      {block.content || 'I\'m a product designer and developer with over 10 years of experience.'}
                    </p>
                  </div>
                </section>
              );
            
            case 'companies':
              return (
                <section key={block._uid || index} className="py-20 px-6 bg-gray-50">
                  <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12">
                      {block.title || 'Companies I\'ve Worked With'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                      {block.companies?.map((company: any, companyIndex: number) => (
                        <div key={companyIndex} className="text-gray-600 font-medium">
                          {company.name || `Company ${companyIndex + 1}`}
                        </div>
                      )) || (
                        <>
                          <div className="text-gray-600 font-medium">Company 1</div>
                          <div className="text-gray-600 font-medium">Company 2</div>
                          <div className="text-gray-600 font-medium">Company 3</div>
                          <div className="text-gray-600 font-medium">Company 4</div>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              );
            
            case 'projects_section':
              return (
                <section key={block._uid || index} className="py-20 px-6 bg-white">
                  <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                      {block.title || 'Featured Projects'}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {block.projects?.map((project: any, projectIndex: number) => (
                        <div key={projectIndex} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {project.name || `Project ${projectIndex + 1}`}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {project.description || 'A brief description of the project.'}
                            </p>
                            <a href={project.link || '#'} className="text-blue-600 font-semibold hover:underline">
                              View Project →
                            </a>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center text-gray-500 col-span-full">
                          No projects available
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              );
            
            case 'latest_work':
              return (
                <section key={block._uid || index} className="py-20 px-6 bg-gray-50">
                  <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                      {block.title || 'Latest from the Blog'}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {block.posts?.map((post: any, postIndex: number) => (
                        <div key={postIndex} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {post.title || `Blog Post ${postIndex + 1}`}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {post.excerpt || 'A brief excerpt from the blog post.'}
                          </p>
                          <a href={post.link || '#'} className="text-blue-600 font-semibold hover:underline">
                            Read More →
                          </a>
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
            
            case 'contact':
              return (
                <section key={block._uid || index} className="py-20 px-6 bg-white">
                  <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                      {block.title || 'Let\'s Work Together'}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                      {block.content || 'Ready to build something amazing? Get in touch and let\'s discuss your project.'}
                    </p>
                    <div className="flex justify-center space-x-6">
                      {block.social_links?.map((link: any) => (
                        <a
                          key={link._uid}
                          href={link.url}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform || link.icon}
                        </a>
                      )) || (
                        <>
                          <a href="https://twitter.com/dazgordon" className="text-gray-600 hover:text-blue-600">Twitter</a>
                          <a href="https://linkedin.com/in/dazgordon" className="text-gray-600 hover:text-blue-600">LinkedIn</a>
                          <a href="https://github.com/dazgordon" className="text-gray-600 hover:text-blue-600">GitHub</a>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              );
            
            default:
              return (
                <div key={block._uid || index} className="py-8">
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
        })}
      </div>
    );
  }

  // Fallback to static content if StoryBlok fails
  console.log('📝 Using fallback static content');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Debug info - remove in production */}
      <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white text-xs p-2 rounded z-50">
        <div>Using fallback content</div>
        <button 
          onClick={() => fetchStoryblokContent(true)}
          className="mt-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
        >
          Retry StoryBlok
        </button>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              Daz Gordon
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
              <a href="/projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
              <a href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Blog</a>
              <a href="/tools" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Tools</a>
              <a href="/ideas" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Ideas</a>
              <a href="/services" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Services</a>
              <a href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Daz Gordon
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Product Designer & Developer building digital products that matter.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <a href="/about" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Learn More →
            </a>
            <a href="/projects" className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">About Me</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Hey, I'm Daz, a product designer and developer based in London. I help startups and scale-ups build digital products that matter. I'm passionate about creating user-centric experiences that are both beautiful and functional.
          </p>
          <a href="/about" className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            Read More →
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            A selection of my recent work, showcasing my skills in product design and development.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placeholder Project Card 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Project Alpha</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                A brief description of Project Alpha, highlighting its key features and technologies used.
              </p>
              <a href="/projects/project-alpha" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                View Project →
              </a>
            </div>
            {/* Placeholder Project Card 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Project Beta</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                A brief description of Project Beta, highlighting its key features and technologies used.
              </p>
              <a href="/projects/project-beta" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                View Project →
              </a>
            </div>
          </div>
          <a href="/projects" className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            View All Projects →
          </a>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Latest Blog Posts</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Thoughts and insights on product design, development, and AI.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placeholder Blog Post Card 1 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Latest Post Title</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                A summary of the latest blog post, enticing readers to click and learn more.
              </p>
              <a href="/blog/latest-post" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Read Article →
              </a>
            </div>
            {/* Placeholder Blog Post Card 2 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Previous Post Title</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                A summary of a previous blog post, offering more content to explore.
              </p>
              <a href="/blog/previous-post" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Read Article →
              </a>
            </div>
          </div>
          <a href="/blog" className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            View All Posts →
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <a href="https://linkedin.com/in/dazgordon" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              LinkedIn
            </a>
            <a href="https://twitter.com/dazgordon" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-blue-400 dark:hover:text-blue-300">
              Twitter
            </a>
            <a href="mailto:daz@example.com" className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400">
              Email
            </a>
          </div>
          <a href="/contact" className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Contact Me →
          </a>
        </div>
      </section>
    </div>
  );
}
