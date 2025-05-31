"use client";
import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 }); // initialize far away

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

    class Shape {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      opacity: number;
      type: 'triangle' | 'square' | 'circle';
      rotation: number;
      rotationSpeed: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 10;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`;
        this.speed = Math.random() * 0.2 + 0.05;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.type = ['triangle', 'square', 'circle'][Math.floor(Math.random() * 3)] as any;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      update(canvas: HTMLCanvasElement) {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;

        // Reset if off screen
        if (this.y > canvas.height + this.size) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        }

        // Mouse avoidance
        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const avoidRadius = 80;

        if (dist < avoidRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (avoidRadius - dist) / avoidRadius;
          const repel = force * 2;

          this.x += Math.cos(angle) * repel;
          this.y += Math.sin(angle) * repel;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        switch (this.type) {
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
          case 'square':
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        ctx.restore();
      }
    }

    const shapes: Shape[] = [];
    const totalShapes = Math.min(Math.floor(window.innerWidth / 15), 50);

    for (let i = 0; i < totalShapes; i++) {
      shapes.push(new Shape(canvas));
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.update(canvas);
        shape.draw(ctx);
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
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default BackgroundAnimation;
