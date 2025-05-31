"use client";
import { useRef } from "react";
import { useInView } from "./hooks/useInView";

interface SkillCardProps {
  skill: string;
  level: number;
  icon: string;
}

interface CardProps {
  data: SkillCardProps;
}

export function SkillCard({ data }: CardProps) {
  const cardRef = useRef<HTMLDivElement | any>(null);
  const inView = useInView(cardRef);

  return (
    <div
      ref={cardRef}
      className="bg-white p-4 space-y-2 rounded-4xl transition-all duration-800 hover:scale-105 hover:border-2"
    >
      <div className="flex justify-between text-lg font-bold pb-4 items-center">
        <span>{data.skill}</span>
        <span>{data.icon}</span>
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${data.level}%` : "0%",
          }}
        />
      </div>

      <div className="flex pt-4 justify-between items-center">
        <span>Proficiency</span>
        <span>{data.level}%</span>
      </div>
    </div>
  );
}
