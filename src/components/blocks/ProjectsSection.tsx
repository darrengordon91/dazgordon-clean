interface ProjectsSectionProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    description?: string;
    projects?: Array<{
      _uid: string;
      name: string;
      description: string;
      image?: string;
      link?: string;
      status?: string;
    }>;
  };
}

export default function ProjectsSection({ blok }: ProjectsSectionProps) {
  return (
    <section 
      data-blok-c={JSON.stringify(blok)} 
      data-blok-uid={blok._uid}
      className="py-20 px-6 bg-white dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {blok.title || 'Featured Projects'}
          </h2>
          {blok.description && (
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {blok.description}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blok.projects?.map((project) => (
            <div key={project._uid} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {project.image && (
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  {project.status && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'live' ? 'bg-green-100 text-green-800' :
                      project.status === 'development' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                {project.link && (
                  <a 
                    href={project.link} 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Project →
                  </a>
                )}
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
}
