interface MarqueeProps {
  blok: {
    _uid: string;
    component: string;
    text?: string;
    speed?: number;
  };
}

export default function Marquee({ blok }: MarqueeProps) {
  return (
    <section 
      data-blok-c={JSON.stringify(blok)} 
      data-blok-uid={blok._uid}
      className="py-4 bg-gray-900 text-white overflow-hidden"
    >
      <div 
        className="animate-marquee whitespace-nowrap"
        style={{ animationDuration: `${blok.speed || 20}s` }}
      >
        <span className="text-lg font-medium mr-8">
          {blok.text || 'Default marquee text'}
        </span>
        <span className="text-lg font-medium mr-8">
          {blok.text || 'Default marquee text'}
        </span>
        <span className="text-lg font-medium mr-8">
          {blok.text || 'Default marquee text'}
        </span>
      </div>
    </section>
  );
}
