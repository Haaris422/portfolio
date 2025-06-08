'use client';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SkillTooltip } from "./SkillToolTip";
import { SkillShapeProps } from "../Data";


export function SkillShape({
  category,
  title,
  proficiency,
  index,
  icon,
  top,
  left,
  rotate
}: SkillShapeProps) {
  const size = 110;
  const strokeWidth = 2;
  const baseColor = "rgba(255, 255, 255, 0.1)";
  const hoverColor = "rgba(255, 255, 255, 0.25)";
  const baseStroke = "rgba(255, 255, 255, 0.9)";
  const hoverStroke = "rgba(255, 255, 255, 1)";
  
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0, placeAbove: false });
  const shapeRef = useRef<HTMLDivElement>(null);

  const shape = {
    frontend: (
      <svg width={size} height={size} className="transition-all duration-300">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - strokeWidth / 2}
          stroke={isHovered ? hoverStroke : baseStroke}
          strokeWidth={isHovered ? strokeWidth + 1 : strokeWidth}
          fill={isHovered ? hoverColor : baseColor}
          className="transition-all duration-300"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' : 'none'
          }}
        />
        {isHovered && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size / 2) - strokeWidth / 2 - 8}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
        )}
      </svg>
    ),
    backend: (
      <svg width={size} height={size} className="transition-all duration-300">
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={size - strokeWidth}
          height={size - strokeWidth}
          stroke={isHovered ? hoverStroke : baseStroke}
          strokeWidth={isHovered ? strokeWidth + 1 : strokeWidth}
          fill={isHovered ? hoverColor : baseColor}
          className="transition-all duration-300"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' : 'none'
          }}
        />
        {isHovered && (
          <rect
            x={strokeWidth / 2 + 8}
            y={strokeWidth / 2 + 8}
            width={size - strokeWidth - 16}
            height={size - strokeWidth - 16}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
        )}
      </svg>
    ),
    other: (
      <svg width={size} height={size} viewBox="0 0 100 100" className="transition-all duration-300">
        <polygon
          points="50,5 95,95 5,95"
          stroke={isHovered ? hoverStroke : baseStroke}
          strokeWidth={isHovered ? strokeWidth + 1 : strokeWidth}
          fill={isHovered ? hoverColor : baseColor}
          className="transition-all duration-300"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' : 'none'
          }}
        />
        {isHovered && (
          <polygon
            points="50,15 85,85 15,85"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
        )}
      </svg>
    )
  };

  useEffect(() => {
    if (isHovered && shapeRef.current) {
      const rect = shapeRef.current.getBoundingClientRect();
      const placeAbove = rect.bottom + 200 > window.innerHeight; 
      setCardPos({
        x: rect.left + rect.width / 2,
        y: placeAbove ? rect.top - 16 : rect.bottom + 16,
        placeAbove,
      });
    }
  }, [isHovered]);

  

  return (
    <>
      <div
        ref={shapeRef}
        className="absolute cursor-pointer animate-fade-in group"
        style={{
          top,
          left,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${index * 100}ms`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered 
            ? 'scale(1.15) translateY(-4px)' 
            : 'scale(1) translateY(0px)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full z-0">
          {isHovered && (
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                animationDuration: '2s',
                animationIterationCount: 'infinite'
              }}
            />
          )}
          
          <div
            style={{
              transform: `rotate(${isHovered ? 0 : rotate}deg)`,
              transformOrigin: 'center',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {shape[category]}
          </div>

          <div 
            className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-white text-center px-1 pointer-events-none transition-all duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              textShadow: isHovered ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'
            }}
          >
            {category === "other" && <div className="opacity-0">e</div>}
            <span className={`text-sm font-semibold transition-all duration-300 ${
              isHovered ? 'text-white' : 'text-gray-200'
            }`}>
              {title}
            </span>
            <div className="w-[80%] mt-1 bg-white/30 h-2 rounded-full overflow-hidden transition-all duration-300">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-white shadow-lg' : 'bg-white'
                }`} 
                style={{ 
                  width: `${proficiency}%`,
                  boxShadow: isHovered ? '0 0 8px rgba(255, 255, 255, 0.6)' : 'none'
                }} 
              />
            </div>
          </div>

        </div>
      </div>

      {isHovered &&
        typeof window !== "undefined" &&
        createPortal(
          <SkillTooltip title={title} icon={icon} proficiency={proficiency} cardPos={cardPos}/>
          ,
          document.body
        )}
    </>
  );
}