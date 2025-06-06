import { useRef } from "react";
import { useInView } from "@/components/hooks/useInView";
import { CardBody } from "@/components/CardBody";
import { FaFileCode, FaRegKeyboard } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";
import { LuClipboardList } from "react-icons/lu";

interface HighlightsProps{
    visible?:boolean
}

export function HighLights({visible}:HighlightsProps) {
 const highlights = [
        {
            title: "Project Vision",
            desc: "I aim to craft websites that are not just visually appealing but also optimized for performance and SEO. Every project is approached with a focus on speed, user experience, and clean architecture.",
            icon:<LuClipboardList />
        },
        {
            title: "Career Goal",
            desc: "To contribute to a company that values quality and innovation, where I can fully leverage my skills, grow professionally, and make meaningful impact through my work.",
            icon:<GiStairsGoal />
        },
        {
            title: "Work Style",
            desc: "I believe in writing clean, reusable, and efficient code. I prioritize performance and low latency, and I’m committed to delivering reliable solutions on time without compromising quality.",
            icon:<FaRegKeyboard />
        },
        {
            title: "Tech Experience",
            desc: "Experienced in building RESTful APIs, real-time applications using WebSockets (like live chat), and managing global state with Redux for scalable, responsive front-end architecture.",
            icon:<FaFileCode />
        }
    ];

  return (
    <div className={`flex gap-8 flex-wrap justify-center`}>
      {highlights.map((item, index) => {
        const ref = useRef<HTMLDivElement | any>(null);
        const isVisible = useInView(ref);
        const anim = isVisible
          ? `opacity-100 animate-slide-down`
          : `opacity-0! animate-slide-up`;

        return (
          <CardBody
            key={index}
            cardRef={ref}
            delay={index * 0.2}
            animationClass={anim}
            className="w-[300px]"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-4xl rounded-full p-3 shadow-md">
              {item.icon}
            </div>
            <h2 className="text-center text-xl font-bold">{item.title}</h2>
            <div className="border-t-2 border-gray-300 w-full" />
            <p className="text-center text-md text-gray-200">{item.desc}</p>
          </CardBody>
        );
      })}
    </div>
  );
}
