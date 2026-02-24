import { useMemo } from "react";

const GoldenRain = () => {
  const particles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.1 + Math.random() * 0.2,
      height: `${Math.random() * 100 + 50}px`
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-150px] w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent"
          style={{
            left: p.left,
            height: p.height,
            opacity: p.opacity,
            animation: `rain ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
      <style>{`
        @keyframes rain {
          0% { transform: translateY(0); }
          100% { transform: translateY(110vh); }
        }
      `}</style>
    </div>
  );
};

export default GoldenRain;
