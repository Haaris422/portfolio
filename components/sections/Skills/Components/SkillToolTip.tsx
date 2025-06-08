"use client";
import { useRef, useEffect, useState } from "react";
import { SkillCardProps } from "../Data";



export function SkillTooltip({ title, proficiency, icon, cardPos }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateBar, setAnimateBar] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    const barTimeout = setTimeout(() => {
      setAnimateBar(true);
    }, 300);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(barTimeout);
    };
  }, []);

  return (
    <div
      className={`fixed z-[9999] pointer-events-none transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      ref={cardRef}
      style={{
        top: cardPos.placeAbove ? cardPos.y : cardPos.y,
        left: cardPos.x,
        transform: cardPos.placeAbove 
          ? 'translate(-50%, -100%)' 
          : 'translate(-50%, 0)',
      }}
    >
      <div 
        className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 ${
          cardPos.placeAbove 
            ? 'bottom-[-8px] border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800' 
            : 'top-[-8px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-800'
        }`}
      />
      
      <div className="bg-gray-800 text-white p-5 w-[280px] rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-semibold shadow-lg">
            {icon}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Proficiency</span>
            <span className="text-white font-semibold">{proficiency}%</span>
          </div>
          
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                proficiency >= 80 
                  ? 'bg-gradient-to-r from-green-400 to-green-500' 
                  : proficiency >= 60 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                  : 'bg-gradient-to-r from-red-400 to-red-500'
              }`}
              style={{ 
                width: animateBar ? `${proficiency}%` : "0%",
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2)'
              }}
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Skill Level</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              proficiency >= 80 
                ? 'bg-green-500/20 text-green-400' 
                : proficiency >= 60 
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {proficiency >= 80 ? 'Expert' : proficiency >= 60 ? 'Intermediate' : 'Beginner'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}