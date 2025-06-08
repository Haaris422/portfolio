"use client";
import { useEffect, useState } from "react";
import { Heading } from "../../shared/Heading";
import { SkillShape } from "./Components/SkillShape";
import { Button } from "@/components/shared/Button";
import { SkillTabelCard } from "./Components/SkillsTableCard";
import { SkillWheel } from "./Components/SkillWheel";
import { FormatToggle } from "./Components/FormToggle";
import { skills, SkillsProps } from "./Data";



export function Skills() {
  const size = 100;
  const [areaWidth, setAreaWidth] = useState(0);
  const [category, setCategory] = useState('all');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [format, setFormat] = useState("wheel");

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

  const currentTab: SkillsProps[] = skills.filter((item) => {
    if (category === 'all') {
      return item;
    } else if (item.category === category) {
      console.log("Skills: line 82: currentTab: if not 'all':", item.skill, category)
      return item;
    } else return null
  });

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
  const [isHovering, setIsHovering] = useState('');
  return (
    <div >
      <div className="space-y-12 pb-8">
        <Heading text="Skills" size="4xl" />
        {!isSmallScreen && (
          <FormatToggle
            format={format}
            setFormat={setFormat}
            isHovering={isHovering}
            setIsHovering={setIsHovering}
          />
        )}


        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {tabs.map((tab) => (
            <Button key={tab}
              onClick={() => setCategory(tab)}
              className={`max-w-md ${category === tab ? 'bg-white/10 backdrop-blur-md' : 'bg-transparent'} w-full cursor-pointer`}>

              <Heading text={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Skills`} className="text-md md:text-lg lg:text-xl" size={''} />

            </Button>
          ))}

        </div>
      </div>
      {format === 'wheel' ? <div className="flex justify-center w-full">
        {areaWidth > 0 && (

          <SkillWheel dynamicHeight={dynamicHeight} areaWidth={areaWidth} centerX={centerX} centerY={centerY} skillShapes={skillShapes} category={category} />
        )}
      </div>
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pt-8">
          {currentTab.map((skill, index) => {
            return (
              <SkillTabelCard key={index} index={index} skill={skill} />
            )
          })}
        </div>}
    </div>
  );
}
