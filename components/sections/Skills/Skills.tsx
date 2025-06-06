"use client";
import { useEffect, useState } from "react";
import { Heading } from "../../Heading";
import { SkillShape } from "./SkillShape";
import { Button } from "@/components/Button";
import { SkillsContainer } from "./SkillsContainer";

interface SkillsProps {
  skill: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'other';
}

export function Skills() {
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
    { skill: "Firestore Services", level: 75, icon: "🔥", category: 'backend' },
    { skill: "Google Cloud Services", level: 70, icon: "ɢ", category: 'backend' },
    { skill: "MongoDB", level: 75, icon: "🍃", category: 'backend' },
    { skill: "PostgreSQL", level: 70, icon: "🐘", category: 'backend' },
    { skill: "Git", level: 75, icon: "🍃", category: 'other' },
    { skill: "Photoshop", level: 70, icon: "🐘", category: 'other' },
  ];


  const size = 100;
  const padding = 10;
  const areaHeight = 600;

  const [areaWidth, setAreaWidth] = useState(0);
  const [category, setCategory] = useState('all');
  useEffect(() => {
    const updateWidth = () => {
      setAreaWidth(window.innerWidth - 500);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const placed: { top: number; left: number }[] = [];

  function generatePosition(): { top: number; left: number } {
    const maxTries = 1000;
    let tries = 0;

    while (tries < maxTries) {
      const left = Math.floor(Math.random() * (areaWidth - size));
      const top = Math.floor(Math.random() * (areaHeight - size));

      const overlaps = placed.some(pos => {
        const dx = pos.left - left;
        const dy = pos.top - top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < size + padding;
      });

      if (!overlaps) {
        return { top, left };
      }

      tries++;
    }

    return { top: Math.random() * areaHeight, left: Math.random() * areaWidth };
  }

  const currentTab: SkillsProps[] = areaWidth > 0 ? skills.filter((item) => {
    if (category === 'all') {
      return item;
    } else if (item.category === category) {
      console.log("Skills: line 82: currentTab: if not 'all':", item.skill, category)
      return item;
    } else return null
  }) : skills;

  const skillShapes = areaWidth > 0
    ? currentTab.map((skill, i) => {
      const { top, left } = generatePosition();
      placed.push({ top, left });
      return (
        <SkillShape
          key={i}
          index={i}
          icon={skill.icon}
          category={skill.category}
          title={skill.skill}
          proficiency={skill.level}
          top={top}
          left={left}
        />
      );
    })
    : null;
  const tabs = [
    'all',
    'frontend',
    'backend',
    'other',
  ]
  return <SkillsContainer/>
  // return (
  //   <div className="p-2 pb-8 lg:px-32">
  //     <div className="px-2 lg:p-16 space-y-4">
  //       <Heading text="Skills" size="4xl" className="pb-8" />
  //       <div className="flex gap-2 justify-between">
  //         {tabs.map((tab) => (
  //           <Button key={tab} onClick={() => setCategory(tab)} className={`${category === tab ? 'bg-white/10 backdrop-blur-md' : 'bg-transparent'} w-full cursor-pointer`}>
  //             <Heading text={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Skills`} size="2xl" />

  //           </Button>
  //         ))}

  //       </div>
  //     </div>
  //     <div className="flex justify-center w-full">
  //       {areaWidth > 0 && (
  //         <div
  //           className="relative"
  //           style={{ height: `${areaHeight}px`, width: `${areaWidth}px` }}
  //         >
  //           {skillShapes}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
