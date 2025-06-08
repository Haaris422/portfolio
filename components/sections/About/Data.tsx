import { ReactNode } from "react";
import { FaFileCode, FaRegKeyboard } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";
import { LuClipboardList } from "react-icons/lu";

export interface Highlight {
  title: string;
  desc: string;
  icon: ReactNode;
}

export const highlights: Highlight[] = [
  {
    title: "Project Vision",
    desc: "I aim to craft websites that are not just visually appealing but also optimized for performance and SEO. Every project is approached with a focus on speed, user experience, and clean architecture.",
    icon: <LuClipboardList />,
  },
  {
    title: "Career Goal",
    desc: "To contribute to a company that values quality and innovation, where I can fully leverage my skills, grow professionally, and make meaningful impact through my work.",
    icon: <GiStairsGoal />,
  },
  {
    title: "Work Style",
    desc: "I believe in writing clean, reusable, and efficient code. I prioritize performance and low latency, and I’m committed to delivering reliable solutions on time without compromising quality.",
    icon: <FaRegKeyboard />,
  },
  {
    title: "Tech Experience",
    desc: "Experienced in building RESTful APIs, real-time applications using WebSockets (like live chat), and managing global state with Redux for scalable, responsive front-end architecture.",
    icon: <FaFileCode />,
  },
];



export interface ItemProps{
    icon:ReactNode;
    title:string;
    desc:string
}

export interface HighlightsCardProps{
    index:number;
    item:ItemProps;
}

