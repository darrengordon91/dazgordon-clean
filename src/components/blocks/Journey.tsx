interface JourneyProps {
  blok: {
    _uid: string;
    component: string;
    [key: string]: any;
  };
}

export default function Journey({ blok }: JourneyProps) {
  return (
    <div className="py-8 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Journey Component
        </h2>
        <p className="text-gray-600">
          This is a placeholder for the Journey component. Content will be rendered here.
        </p>
      </div>
    </div>
  );
}
