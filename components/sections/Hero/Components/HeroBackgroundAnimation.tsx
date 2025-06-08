"use client";
import React, { useEffect, useRef } from 'react';
type ShapeType = 'dot' | 'line' | 'plus';

const HeroBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'dot' | 'line' | 'plus';
      rotation: number;
      rotationSpeed: number;
      pulsePhase: number;
      baseSize: number;
      baseOpacity: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 15 + 3;
        this.size = this.baseSize;
        this.color = `rgba(160, 160, 180, ${Math.random() * 0.4 + 0.2})`;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.baseOpacity = Math.random() * 0.6 + 0.3;
        this.opacity = this.baseOpacity;
        this.type = ['dot', 'line', 'plus'][Math.floor(Math.random() * 3)] as ShapeType;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.015;

        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attractRadius = 120;

        if (dist < attractRadius && dist > 0) {
          const angle = Math.atan2(dy, dx);
          const force = (attractRadius - dist) / attractRadius;
          const attract = force * 0.8;

          this.x -= Math.cos(angle) * attract;
          this.y -= Math.sin(angle) * attract;
          
          this.size = this.baseSize * (1 + force * 1.2);
          this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
        } else {
          this.size = this.baseSize;
          this.opacity = this.baseOpacity;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
        ctx.globalAlpha = this.opacity * pulse;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1.5;

        const size = this.size * pulse;

        switch (this.type) {
          case 'dot':
            ctx.beginPath();
            ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'line':
            ctx.beginPath();
            ctx.moveTo(-size / 2, 0);
            ctx.lineTo(size / 2, 0);
            ctx.stroke();
            break;
          case 'plus':
            ctx.beginPath();
            ctx.moveTo(-size / 3, 0);
            ctx.lineTo(size / 3, 0);
            ctx.moveTo(0, -size / 3);
            ctx.lineTo(0, size / 3);
            ctx.stroke();
            break;
        }

        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    const totalParticles = Math.min(Math.floor(window.innerWidth / 12), 80);

    for (let i = 0; i < totalParticles; i++) {
      particles.push(new Particle(canvas));
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(25, 25, 35, 0.95)');
      gradient.addColorStop(1, 'rgba(35, 35, 45, 0.95)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            const mouseDistanceP1 = Math.sqrt((particle.x - mouse.current.x) ** 2 + (particle.y - mouse.current.y) ** 2);
            const mouseDistanceP2 = Math.sqrt((otherParticle.x - mouse.current.x) ** 2 + (otherParticle.y - mouse.current.y) ** 2);
            
            let opacity = 0.15 * (1 - dist / 100);
            
            if (mouseDistanceP1 < 120 || mouseDistanceP2 < 120) {
              opacity *= 3;
            }
            
            ctx.strokeStyle = `rgba(140, 140, 160, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      if (mouse.current.x > -500 && mouse.current.y > -500) {
        particles.forEach((particle) => {
          const dx = particle.x - mouse.current.x;
          const dy = particle.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            const opacity = 0.4 * (1 - dist / 100);
            
            ctx.strokeStyle = `rgba(200, 200, 220, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.shadowColor = 'rgba(200, 200, 220, 0.5)';
            ctx.shadowBlur = 5;
            
            ctx.beginPath();
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
            
            ctx.shadowBlur = 0;
          }
        });

        const nearbyParticles = particles.filter(p => {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          return Math.sqrt(dx * dx + dy * dy) < 100;
        });

        if (nearbyParticles.length > 0) {
          ctx.beginPath();
          ctx.arc(mouse.current.x, mouse.current.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200, 200, 220, 0.3)';
          ctx.shadowColor = 'rgba(200, 200, 220, 0.6)';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      particles.forEach((particle) => {
        particle.update(canvas);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
};

export default HeroBackgroundAnimation;