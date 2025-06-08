export interface SkillsProps {
  skill: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'other';
}

export const skills: SkillsProps[] = [
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
    { skill: "Git", level: 75, icon: "</>", category: 'other' },
    { skill: "Photoshop", level: 70, icon: "🅿", category: 'other' },
  ];


export interface FormatToggleProps {
  format: string;
  setFormat: (format: string) => void;
  isHovering: string;
  setIsHovering: (hover: string) => void;
}

export interface SkillShapeProps {
  category: 'frontend' | 'backend' | 'other';
  title: string;
  proficiency: number;
  index: number;
  icon: string;
  top: number;
  left: number;
  rotate: number;
}

export interface SkillCard {
    skill: SkillsProps;
    index: number
}

export interface SkillCardProps {
  title: string;
  proficiency: number;
  icon: string;
  cardPos: { x: number; y: number; placeAbove: boolean };
}

export interface SkillWheelProps {
    dynamicHeight:number;
    areaWidth:number;
    centerX:number;
    centerY:number;
    category:string;
    skillShapes: React.ReactElement[] | null;
}