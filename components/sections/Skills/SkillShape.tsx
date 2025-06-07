'use client';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SkillTooltip } from "./SkillToolTip";

interface SkillShapeProps {
  category: 'frontend' | 'backend' | 'other';
  title: string;
  proficiency: number;
  index: number;
  icon: string;
  top: number;
  left: number;
  rotate: number;
}

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
  const color = "rgba(255, 255, 255, 0.1)";
  const stroke = "rgba(255, 255, 255, 0.9)";
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0, placeAbove: false });
  const shapeRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  const shape = {
    frontend: (
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - strokeWidth / 2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={color}
        />
      </svg>
    ),
    backend: (
      <svg width={size} height={size}>
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={size - strokeWidth}
          height={size - strokeWidth}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={color}
        />
      </svg>
    ),
    other: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon
          points="50,5 95,95 5,95"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={color}
        />
      </svg>
    )
  };

  useEffect(() => {
    if (isHovered && shapeRef.current) {
      const rect = shapeRef.current.getBoundingClientRect();
      const placeAbove = rect.bottom + 150 > window.innerHeight; 
      setCardPos({
        x: rect.left + rect.width / 2,
        y: placeAbove ? rect.top - 12 : rect.bottom + 12,
        placeAbove,
      });
    }
  }, [isHovered]);

  useEffect(() => {
    if (isHovered) {

      setBarWidth(0);
      const timeout = setTimeout(() => {
        setBarWidth(proficiency);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [isHovered, proficiency]);

  return (
    <>
      <div
        ref={shapeRef}
        className="absolute cursor-pointer animate-fade-in"
        style={{
          top,
          left,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${index * 100}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full z-0">
          <div
            style={{
              transform: `rotate(${isHovered ? 0 : rotate}deg)`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease'
            }}
          >
            {shape[category]}
          </div>

          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-white text-center px-1 pointer-events-none">
            {category === "other" && <div className="opacity-0">e</div>}
            <span className="text-sm font-semibold">{title}</span>
            <div className="w-[80%] mt-1 bg-white/30 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: `${proficiency}%` }} />
            </div>
          </div>
        </div>
      </div>

      {isHovered &&
        typeof window !== "undefined" &&
        createPortal(
          // <div
          //   className="fixed z-[9999] bg-[#6c757d] text-white p-4 w-[250px] space-y-2 rounded-xl shadow-xl transition-all"
          //   style={{
          //     top: cardPos.y,
          //     left: cardPos.x,
          //     transform: 'translateX(-50%)',
          //   }}
          // >
          //   <div className="flex justify-between text-lg font-bold pb-4 items-center">
          //     <span>{title}</span>
          //     <span className="p-2 rounded-full bg-white text-black">{icon}</span>
          //   </div>

          //   <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden">
          //     <div
          //       className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
          //       style={{ width: `${barWidth}%` }}
          //     />
          //   </div>

          //   <div className="flex pt-4 justify-between items-center text-white">
          //     <span>Proficiency</span>
          //     <span>{proficiency}%</span>
          //   </div>
          // </div>
          <SkillTooltip title={title} icon={icon} proficiency={proficiency} barWidth={barWidth} cardPos={cardPos}/>
          ,
          document.body
        )}
    </>
  );
}
