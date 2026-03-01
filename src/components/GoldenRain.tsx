import { useMemo } from "react";

const GoldenRain = () => {
  const particles = useMemo(() => 
    Array.from({ length: 30 }).map((_, i) => ({ 
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 4}s`, 
      delay: `${Math.random() * 5}s`,
      opacity: 0.08 + Math.random() * 0.12, 
      height: `${Math.random() * 80 + 40}px`
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-150px] w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent will-change-transform transform-gpu"
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
          0% { transform: translateY(0) translateZ(0); }
          100% { transform: translateY(115vh) translateZ(0); }
        }
      `}</style>
    </div>
  );
};

export default GoldenRain;
