import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  blur: number;
  layer: number; // 0=far, 1=mid, 2=near for parallax
}

const GoldenRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles with 3 depth layers
    for (let i = 0; i < 90; i++) {
      const layer = i < 30 ? 0 : i < 60 ? 1 : 2;
      const layerScale = [0.4, 0.7, 1][layer];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: (0.2 + Math.random() * 0.8) * layerScale,
        size: (0.5 + Math.random() * 1.5) * layerScale + 0.5,
        opacity: (0.05 + Math.random() * 0.2) * layerScale + 0.05,
        blur: layer === 0 ? 2 : layer === 1 ? 0.5 : 0,
        layer,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        if (p.blur > 0) {
          ctx.filter = `blur(${p.blur}px)`;
        }

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 72%, 52%, ${p.opacity * 0.3})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 80%, 65%, ${p.opacity})`;
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y - p.speed * 8);
        ctx.strokeStyle = `hsla(43, 72%, 52%, ${p.opacity * 0.25})`;
        ctx.lineWidth = p.size * 0.4;
        ctx.stroke();

        ctx.restore();

        p.y += p.speed;
        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};

export default GoldenRain;
