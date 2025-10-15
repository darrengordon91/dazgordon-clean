interface MarqueeProps {
  blok: {
    _uid: string;
    component: string;
    text?: string;
    speed?: string;
  };
}

export default function Marquee({ blok }: MarqueeProps) {
  return (
    <section className="py-4 bg-gray-900 text-white overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-lg font-medium">
          {blok.text || 'Product Design • Frontend Development • User Experience • Digital Strategy'}
        </span>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}