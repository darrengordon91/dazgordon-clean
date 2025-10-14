interface CompaniesProps {
  blok: {
    _uid: string;
    component: string;
    title?: string;
    companies?: Array<{
      _uid: string;
      name: string;
      logo?: string;
    }>;
  };
}

export default function Companies({ blok }: CompaniesProps) {
  return (
    <section 
      data-blok-c={JSON.stringify(blok)} 
      data-blok-uid={blok._uid}
      className="py-20 px-6 bg-gray-50 dark:bg-slate-800"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
          {blok.title || 'Companies I\'ve Worked With'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          {blok.companies?.map((company) => (
            <div key={company._uid} className="text-gray-600 font-medium">
              {company.logo ? (
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="mx-auto h-12 object-contain"
                />
              ) : (
                company.name
              )}
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
}
