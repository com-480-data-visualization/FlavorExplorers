import { motion, MotionValue, useTransform } from "motion/react";

interface ParticlesProps {
  scrollProgress: MotionValue<number>;
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 8 + 4,
  color: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF", "#FF8B94"][
    Math.floor(Math.random() * 5)
  ],
}));

function Particle({ particle, scrollProgress }: { particle: typeof particles[0]; scrollProgress: MotionValue<number> }) {
  const distanceX = (particle.x - 50) * 8;
  const distanceY = (particle.y - 50) * 8;

  const x = useTransform(scrollProgress, [0, 1], [0, distanceX]);
  const y = useTransform(scrollProgress, [0, 1], [0, distanceY]);
  const opacity = useTransform(scrollProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.5]);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        x,
        y,
        opacity,
        scale,
      }}
    />
  );
}

export function Particles({ scrollProgress }: ParticlesProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <Particle key={particle.id} particle={particle} scrollProgress={scrollProgress} />
      ))}
    </div>
  );
}
