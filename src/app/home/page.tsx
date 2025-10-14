import { StoryblokComponent } from '@storyblok/react';
import '../../lib/storyblok'; // Import to initialize StoryBlok

// Function to fetch StoryBlok content at build time
async function getStoryblokContent() {
  try {
    console.log('🔍 Fetching StoryBlok content for home page...');
    console.log('Environment variables:', {
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN ? 'Set' : 'Not Set',
      previewToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ? 'Set' : 'Not Set',
      spaceId: process.env.STORYBLOK_SPACE_ID || 'Not Set',
      region: process.env.STORYBLOK_REGION || 'Not Set',
    });
    
    const apiUrl = `https://api.storyblok.com/v2/cdn/stories/home?token=${process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN}&version=published&resolve_relations=featured_projects,featured_posts,featured_tools`;
    console.log('API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
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
    return data.story;
  } catch (error) {
    console.error('❌ Error fetching StoryBlok content:', error);
    return null;
  }
}

export default async function HomePage() {
  const story = await getStoryblokContent();

  // If we have StoryBlok content, render it
  if (story && story.content) {
    console.log('🎨 Rendering StoryBlok content:', story.content);
    return (
      <div className="min-h-screen">
        <StoryblokComponent blok={story.content} />
      </div>
    );
  }

  // Fallback to static content if StoryBlok fails
  console.log('📝 Using fallback static content');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
