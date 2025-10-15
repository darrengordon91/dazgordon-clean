interface ProjectsSectionProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    projects?: Array<{
      name: string;
      description: string;
      link: string;
      image?: string;
    }>;
  };
}

export default function ProjectsSection({ blok }: ProjectsSectionProps) {
  const defaultProjects = [
    {
      name: 'Project Alpha',
      description: 'A revolutionary product that solves real problems for users.',
      link: '/projects/alpha',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Project Beta',
      description: 'An innovative solution that improves user experience.',
      link: '/projects/beta',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Project Gamma',
      description: 'A cutting-edge application with modern design principles.',
      link: '/projects/gamma',
      image: 'https://via.placeholder.com/400x300'
    }
  ];

  const projects = blok.projects && blok.projects.length > 0 ? blok.projects : defaultProjects;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          {blok.title || 'Featured Projects'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <a 
                  href={project.link} 
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}