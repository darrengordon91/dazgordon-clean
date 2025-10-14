interface MarqueeProps {
  blok: {
    _uid: string;
    component: string;
    text?: string;
  };
}

export default function Marquee({ blok }: MarqueeProps) {
  return (
    <section className="py-4 bg-gray-900 text-white overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-lg font-medium">{blok.text || 'Default marquee text'}</span>
      </div>
    </section>
  );
}
