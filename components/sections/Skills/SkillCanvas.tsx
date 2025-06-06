import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SkillsProps {
  skill: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'other';
}

interface AnimatedSkill extends SkillsProps {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isHovered: boolean;
  originalVx: number;
  originalVy: number;
}

interface AnimatedSkillsProps {
  category: string;
}

interface TooltipData {
  skill: SkillsProps;
  x: number;
  y: number;
  visible: boolean;
}

export function AnimatedSkills({ category }: AnimatedSkillsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const skillsRef = useRef<AnimatedSkill[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 600 });
  const [skillPositions, setSkillPositions] = useState<{x: number, y: number}[]>([]);
  const [tooltip, setTooltip] = useState<TooltipData>({ skill: { skill: '', level: 0, icon: '', category: 'frontend' }, x: 0, y: 0, visible: false });
  const [isMobile, setIsMobile] = useState(false);

  const skills: SkillsProps[] = [
    { skill: "React.js", level: 90, icon: "⚛️", category: 'frontend' },
    { skill: "Next.js", level: 85, icon: "▲", category: 'frontend' },
    { skill: "TypeScript", level: 80, icon: "𝓣", category: 'frontend' },
    { skill: "JavaScript", level: 90, icon: "𝓙𝓢", category: 'frontend' },
    { skill: "HTML", level: 95, icon: "🌐", category: 'frontend' },
    { skill: "CSS", level: 85, icon: "🎨", category: 'frontend' },
    { skill: "Tailwind CSS", level: 90, icon: "🌊", category: 'frontend' },
    { skill: "Redux", level: 75, icon: "🔄", category: 'frontend' },
    { skill: "Node.js", level: 80, icon: "🟢", category: 'backend' },
    { skill: "Socket.io", level: 70, icon: "🔌", category: 'backend' },
    { skill: "Firestore", level: 75, icon: "🔥", category: 'backend' },
    { skill: "Google Cloud", level: 70, icon: "ɢ", category: 'backend' },
    { skill: "MongoDB", level: 75, icon: "🍃", category: 'backend' },
    { skill: "PostgreSQL", level: 70, icon: "🐘", category: 'backend' },
    { skill: "Git", level: 75, icon: "🍃", category: 'other' },
    { skill: "Photoshop", level: 70, icon: "🐘", category: 'other' },
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const isMobileDevice = window.innerWidth < 768;
        setIsMobile(isMobileDevice);
        
        const width = isMobileDevice 
          ? Math.max(350, window.innerWidth - 40)
          : Math.max(800, window.innerWidth - 100);
        const height = isMobileDevice ? 400 : 600;
        
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let hoveredSkill: AnimatedSkill | null = null;

    skillsRef.current.forEach((skill) => {
      const distance = Math.sqrt((mouseX - skill.x) ** 2 + (mouseY - skill.y) ** 2);
      const wasHovered = skill.isHovered;
      skill.isHovered = distance <= skill.size / 2;

      if (skill.isHovered && !wasHovered) {
        // Store original velocity when hover starts
        skill.originalVx = skill.vx;
        skill.originalVy = skill.vy;
        hoveredSkill = skill;
      } else if (!skill.isHovered && wasHovered) {
        // Restore original velocity when hover ends
        skill.vx = skill.originalVx;
        skill.vy = skill.originalVy;
      }

      if (skill.isHovered) {
        // Stop movement when hovered
        skill.vx = 0;
        skill.vy = 0;
        hoveredSkill = skill;
      }
    });

    if (hoveredSkill) {
      setTooltip({
        skill: hoveredSkill,
        x: mouseX,
        y: mouseY,
        visible: true
      });
    } else {
      setTooltip(prev => ({ ...prev, visible: false }));
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    skillsRef.current.forEach((skill) => {
      if (skill.isHovered) {
        skill.vx = skill.originalVx;
        skill.vy = skill.originalVy;
        skill.isHovered = false;
      }
    });
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Filter skills based on category
    const filteredSkills = category === 'all' 
      ? skills 
      : skills.filter(skill => skill.category === category);

    // Initialize animated skills
    skillsRef.current = filteredSkills.map((skill, index) => {
      const size = isMobile ? 60 + Math.random() * 20 : 80 + Math.random() * 40;
      const x = size + Math.random() * (dimensions.width - size * 2);
      const y = size + Math.random() * (dimensions.height - size * 2);
      const vx = (Math.random() - 0.5) * (isMobile ? 1.5 : 2);
      const vy = (Math.random() - 0.5) * (isMobile ? 1.5 : 2);
      
      return {
        ...skill,
        x,
        y,
        vx,
        vy,
        size,
        isHovered: false,
        originalVx: vx,
        originalVy: vy
      };
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      skillsRef.current.forEach((skillA, indexA) => {
        // Update position only if not hovered
        if (!skillA.isHovered) {
          skillA.x += skillA.vx;
          skillA.y += skillA.vy;

          // Boundary collision with damping
          if (skillA.x <= skillA.size / 2 || skillA.x >= dimensions.width - skillA.size / 2) {
            skillA.vx *= -0.8;
            skillA.x = Math.max(skillA.size / 2, Math.min(dimensions.width - skillA.size / 2, skillA.x));
          }
          if (skillA.y <= skillA.size / 2 || skillA.y >= dimensions.height - skillA.size / 2) {
            skillA.vy *= -0.8;
            skillA.y = Math.max(skillA.size / 2, Math.min(dimensions.height - skillA.size / 2, skillA.y));
          }

          // Inter-object collision (only for non-hovered objects)
          skillsRef.current.forEach((skillB, indexB) => {
            if (indexA !== indexB && !skillB.isHovered) {
              const dx = skillA.x - skillB.x;
              const dy = skillA.y - skillB.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (skillA.size + skillB.size) / 2;

              if (distance < minDistance && distance > 0) {
                // Normalize collision vector
                const nx = dx / distance;
                const ny = dy / distance;

                // Separate objects
                const overlap = minDistance - distance;
                const separationX = nx * overlap * 0.5;
                const separationY = ny * overlap * 0.5;

                skillA.x += separationX;
                skillA.y += separationY;
                skillB.x -= separationX;
                skillB.y -= separationY;

                // Elastic collision response
                const relativeVelocityX = skillA.vx - skillB.vx;
                const relativeVelocityY = skillA.vy - skillB.vy;
                const speed = relativeVelocityX * nx + relativeVelocityY * ny;

                if (speed > 0) return; // Objects moving apart

                const restitution = 0.7;
                const impulse = 2 * speed * restitution / 2; // Assuming equal mass

                skillA.vx -= impulse * nx;
                skillA.vy -= impulse * ny;
                skillB.vx += impulse * nx;
                skillB.vy += impulse * ny;
              }
            }
          });
        }

        // Draw shapes based on category - using original white color scheme
        ctx.save();
        ctx.translate(skillA.x, skillA.y);

        // Set styles - highlight if hovered
        if (skillA.isHovered) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 3;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 2;
          ctx.shadowBlur = 0;
        }

        // Draw different shapes for different categories
        ctx.beginPath();
        switch (skillA.category) {
          case 'frontend':
            // Circle
            ctx.arc(0, 0, skillA.size / 2, 0, Math.PI * 2);
            break;
          case 'backend':
            // Square
            ctx.rect(-skillA.size / 2, -skillA.size / 2, skillA.size, skillA.size);
            break;
          case 'other':
            // Triangle
            ctx.moveTo(0, -skillA.size / 2);
            ctx.lineTo(-skillA.size / 2, skillA.size / 2);
            ctx.lineTo(skillA.size / 2, skillA.size / 2);
            ctx.closePath();
            break;
        }
        
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Update positions for text overlays
      setSkillPositions(skillsRef.current.map(skill => ({ x: skill.x, y: skill.y })));

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [category, dimensions, isMobile]);

  // Get current filtered skills for text overlay
  const filteredSkills = category === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === category);

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="border border-white/20 rounded-lg bg-transparent backdrop-blur-sm cursor-pointer"
      />
      
      {/* Text overlays - hidden on mobile when tooltip is visible */}
      <div className={`absolute inset-0 pointer-events-none ${isMobile && tooltip.visible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
        {filteredSkills.map((skill, index) => (
          <SkillTextOverlay
            key={`${skill.skill}-${category}`}
            skill={skill}
            position={skillPositions[index] || { x: 0, y: 0 }}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: Math.min(tooltip.x + 10, dimensions.width - 200),
            top: Math.max(tooltip.y - 80, 10),
          }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 p-4 min-w-[180px]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{tooltip.skill.icon}</span>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{tooltip.skill.skill}</h3>
                <p className="text-xs text-gray-600 capitalize">{tooltip.skill.category}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-700">Proficiency</span>
                <span className="text-xs font-bold text-gray-800">{tooltip.skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500" 
                  style={{ width: `${tooltip.skill.level}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface SkillTextOverlayProps {
  skill: SkillsProps;
  position: { x: number; y: number };
  isMobile: boolean;
}

function SkillTextOverlay({ skill, position, isMobile }: SkillTextOverlayProps) {
  const fontSize = isMobile ? '8px' : '10px';
  const width = isMobile ? '60px' : '80px';
  const height = isMobile ? '45px' : '60px';
  const offset = isMobile ? 30 : 40;

  return (
    <div
      className="absolute flex flex-col items-center justify-center text-white text-center pointer-events-none"
      style={{
        left: position.x - (isMobile ? 30 : 40),
        top: position.y - (isMobile ? 22.5 : 30),
        width,
        height,
        fontSize,
        lineHeight: '1.2',
        transform: 'translate3d(0, 0, 0)', // Hardware acceleration
      }}
    >
      <div className="font-semibold mb-1 drop-shadow-lg">{skill.skill}</div>
      <div className={`${isMobile ? 'w-8 h-1' : 'w-12 h-1.5'} bg-white/30 rounded-full overflow-hidden mb-1`}>
        <div 
          className="h-full bg-white rounded-full transition-all duration-300" 
          style={{ width: `${skill.level}%` }}
        />
      </div>
      <div className="text-xs opacity-80">{skill.level}%</div>
    </div>
  );
}