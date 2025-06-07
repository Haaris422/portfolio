"use client";
import { useEffect, useRef, useState } from "react";
import { Heading } from "../../Heading";
import { SkillShape } from "./SkillShape";
import { Button } from "@/components/Button";
import { LuTable } from "react-icons/lu";
import { TbWheel } from "react-icons/tb";
import { SkillTabelCard } from "./SkillsTableCard";
import { SkillWheel } from "./SkillWheel";

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
  const areaHeight = 900;

  const [areaWidth, setAreaWidth] = useState(0);

  const [category, setCategory] = useState('all');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [format, setFormat] = useState("wheel")
  useEffect(() => {
    const updateWidth = () => {
      setAreaWidth(window.innerWidth - 500);
      
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
 useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
      if (e.matches) setFormat("table");
    };

    setIsSmallScreen(mediaQuery.matches);
    if (mediaQuery.matches) setFormat("table");

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);
  const placed: { top: number; left: number }[] = [];



  const currentTab: SkillsProps[] = areaWidth > 0 ? skills.filter((item) => {
    if (category === 'all') {
      return item;
    } else if (item.category === category) {
      console.log("Skills: line 82: currentTab: if not 'all':", item.skill, category)
      return item;
    } else return null
  }) : skills;

  const angleStep = (2 * Math.PI) / currentTab.length;
  const safePadding = 40;
  const arcLength = size + safePadding;
  const minRadius = (currentTab.length * arcLength) / (2 * Math.PI);
  const radius = Math.max(250, minRadius);
  const centerX = areaWidth / 2;
  const padding = 40;
  const dynamicHeight = 2 * radius + size + padding;

  const centerY = dynamicHeight / 2;

  const skillShapes = areaWidth > 0
    ? currentTab.map((skill, i) => {
      const angle = i * angleStep;

      const left = centerX + radius * Math.cos(angle) - size / 2;
      const top = centerY + radius * Math.sin(angle) - size / 2;

      const rotation = (angle * 180) / Math.PI + 90;

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
          rotate={rotation}
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
  const [isHovering, setIsHovering] = useState('wheel');
  return (
    <div className="p-2 pb-8 lg:px-24">
      <div className="px-2 lg:p-16 space-y-4">
        <Heading text="Skills" size="4xl" className="pb-8" />
        {!isSmallScreen && <div className="flex w-full justify-center mb-14 items-center text-2xl text-white relative">
          <div
            onMouseEnter={() => setIsHovering('wheel')}
            onMouseLeave={() => setIsHovering('')}
            className="relative"
          >
            <Button
              onClick={() => setFormat('wheel')}
              className={`${format === 'wheel' ? 'bg-white/40 ' : 'bg-white/10 '} transition-all 
              duration-300 ease-in-out group cursor-pointer group 
              hover:bg-white/40 rounded-r-none border border-white/20 border-r-black backdrop-blur-md p2`}
            >
              <TbWheel className=" group-hover:scale-110" />
            </Button>
            {isHovering === 'wheel' && (
              <div className="absolute  animate-slide-in top-full mt-1 -left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded border border-white/20 shadow-lg z-50">
                Wheel View
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => setIsHovering('table')}
            onMouseLeave={() => setIsHovering('')}
            className="relative"
          >
            <Button
              onClick={() => setFormat('table')}
              className={`${format === 'table' ? 'bg-white/40 ' : 'bg-white/10 '} rounded-l-none border 
              hover:bg-white/40 transition-all duration-300 ease-in-out group cursor-pointer 
              group border-white/20 border-l-black backdrop-blur-md p2`}
            >
              <LuTable className=" group-hover:scale-110" />
            </Button>
            {isHovering === 'table' && (
              <div className="absolute w-[80px] animate-slide-in-opp top-full mt-1 left-full -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded border border-white/20 shadow-lg z-50">
                Table View
              </div>
            )}
          </div>
        </div>}

        <div className="flex gap-2 justify-between">
          {tabs.map((tab) => (
            <Button key={tab} onClick={() => setCategory(tab)} className={`max-w-md ${category === tab ? 'bg-white/10 backdrop-blur-md' : 'bg-transparent'} w-full cursor-pointer`}>
              <Heading text={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Skills`} className="text-md sm:text-2xl" size={''} />

            </Button>
          ))}

        </div>
      </div>
      {format === 'wheel' ? <div className="flex justify-center w-full">
        {areaWidth > 0 && (
          
          <SkillWheel dynamicHeight={dynamicHeight} areaWidth={areaWidth} centerX={centerX} centerY={centerY} skillShapes={skillShapes} category={category}/>
        )}
      </div>
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {currentTab.map((skill, index) => {
            return (
              <SkillTabelCard key={index} index={index} skill={skill}/>
            )
          })}
        </div>}
    </div>
  );
}
