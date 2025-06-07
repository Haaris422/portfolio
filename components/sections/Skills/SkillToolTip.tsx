"use client";
import { useRef } from "react";
import { useInView } from "@/components/hooks/useInView";

interface SkillCardProps {
  title: string;
  proficiency: number;
  icon: string;
  barWidth:number;
  cardPos: {x:number; y:number}
}



export function SkillTooltip({ title, proficiency, icon, cardPos, barWidth  }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement | any>(null);
  const inView = useInView(cardRef);

  return (
    // <div
    //   ref={cardRef}
    //   className="bg-white p-4 space-y-2 rounded-4xl transition-all duration-800 hover:scale-105 hover:border-2"
    // >
    //   <div className="flex justify-between text-lg font-bold pb-4 items-center">
    //     <span>{data.skill}</span>
    //     <span>{data.icon}</span>
    //   </div>

    //   <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
    //     <div
    //       className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
    //       style={{
    //         width: inView ? `${data.level}%` : "0%",
    //       }}
    //     />
    //   </div>

    //   <div className="flex pt-4 justify-between items-center">
    //     <span>Proficiency</span>
    //     <span>{data.level}%</span>
    //   </div>
    // </div>
    <div
            className="fixed z-[9999] bg-[#6c757d] text-white p-4 w-[250px] space-y-2 rounded-xl shadow-xl transition-all"
            ref={cardRef}
            style={{
              top: cardPos.y,
              left: cardPos.x,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flex justify-between text-lg font-bold pb-4 items-center">
              <span>{title}</span>
              <span className="p-2 rounded-full bg-white text-black">{icon}</span>
            </div>

            <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                style={{ width: inView ? `${proficiency}%` : "0%" }}
              />
            </div>

            <div className="flex pt-4 justify-between items-center text-white">
              <span>Proficiency</span>
              <span>{proficiency}%</span>
            </div>
          </div>
  );
}
