import React, { useEffect, useRef, useCallback, useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
  type: "dot" | "ring" | "glow";
  trail: { x: number; y: number; opacity: number }[];
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const colors = useMemo(
    () => [
      "#4caf50", // Primary green
      "#81c784", // Light green
      "#2e7d32", // Dark green
      "#a5d6a7", // Very light green
      "#66bb6a", // Medium green
    ],
    []
  );

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => {
      const types: Particle["type"][] = ["dot", "ring", "glow"];
      const type = types[Math.floor(Math.random() * types.length)];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: type === "glow" ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        type,
        trail: [],
      };
    },
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);

      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(canvas));
      }

      particlesRef.current = particles;
    };

    const updateParticles = () => {
      const time = timeRef.current;

      particlesRef.current.forEach((particle) => {
        // Store previous position for trail
        if (particle.type === "glow") {
          particle.trail.push({
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity * 0.3,
          });

          // Limit trail length
          if (particle.trail.length > 8) {
            particle.trail.shift();
          }

          // Fade trail
          particle.trail.forEach((point, index) => {
            point.opacity *= 0.9;
          });
        }

        // Add subtle sine wave movement
        particle.x +=
          particle.vx + Math.sin(time * 0.001 + particle.pulse) * 0.1;
        particle.y +=
          particle.vy + Math.cos(time * 0.0015 + particle.pulse) * 0.1;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.002;
          particle.vy += (dy / distance) * force * 0.002;
        }

        // Wrap around edges with smooth transition
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;

        // Pulse animation
        particle.pulse += particle.pulseSpeed;

        // Dynamic opacity based on pulse
        const basePulse = Math.sin(particle.pulse) * 0.3 + 0.7;
        particle.opacity = Math.max(0.1, Math.min(0.9, basePulse * 0.8));

        // Velocity damping
        particle.vx *= 0.995;
        particle.vy *= 0.995;
      });
    };

    const drawParticle = (particle: Particle) => {
      ctx.globalAlpha = particle.opacity;

      switch (particle.type) {
        case "dot":
          // Simple dot with glow
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;

        case "ring":
          // Ring particle
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 5;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
          break;

        case "glow":
          // Glowing particle with trail
          // Draw trail first
          particle.trail.forEach((point, index) => {
            ctx.globalAlpha = point.opacity;
            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          });

          // Draw main particle
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle1 = particlesRef.current[i];
          const particle2 = particlesRef.current[j];
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = ((150 - distance) / 150) * 0.15;
            ctx.globalAlpha = opacity;

            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particle1.x,
              particle1.y,
              particle2.x,
              particle2.y
            );
            gradient.addColorStop(0, particle1.color);
            gradient.addColorStop(1, particle2.color);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first
      drawConnections();

      // Draw particles
      particlesRef.current.forEach(drawParticle);

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      timeRef.current += 16; // Approximate 60fps
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
