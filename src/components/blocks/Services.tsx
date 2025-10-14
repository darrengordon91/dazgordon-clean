interface ServicesProps {
  blok: {
    _uid: string;
    component: string;
    [key: string]: any;
  };
}

export default function Services({ blok }: ServicesProps) {
  return (
    <div className="py-8 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Services Component
        </h2>
        <p className="text-gray-600">
          This is a placeholder for the Services component. Content will be rendered here.
        </p>
      </div>
    </div>
  );
}
