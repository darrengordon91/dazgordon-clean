interface CompaniesProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    companies?: Array<{
      name: string;
      logo?: string;
    }>;
  };
}

export default function Companies({ blok }: CompaniesProps) {
  const defaultCompanies = [
    'TechCorp', 'StartupX', 'InnovateLab', 'DigitalCo', 'FutureSoft', 'NextGen'
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          {blok.title || 'Companies I\'ve Worked With'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
          {(blok.companies && blok.companies.length > 0) ? (
            blok.companies.map((company, index) => (
              <div key={index} className="text-gray-600 font-medium">
                {company.name}
              </div>
            ))
          ) : (
            defaultCompanies.map((company, index) => (
              <div key={index} className="text-gray-600 font-medium">
                {company}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}