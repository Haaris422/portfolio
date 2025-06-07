"use client"
import { Button } from "../../Button";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { Heading } from "../../Heading";
import { HighLights } from "./HighLights";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Download } from "./Download";
export function About() {
  const skills = ["React.js", "Next.js", "TypeScript", "Tailwind", "JavaScript", "HTML", "CSS", "Redux"]
  const contentRef = useRef<HTMLDivElement | any>(null);
  const [isClient, setIsClient] = useState(false);
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
    setClicked(!isSmallScreen);
  }, []);
  const showContent = useInView(contentRef);


  return (
    <div ref={contentRef} className="flex justify-center items-center ">
      <div className={`space-y-12 min-h-[250px] transition-opacity duration-1000 ${showContent ? "animate-slide-in opacity-100" : "animate-slide-out"
        }`}>
        <Heading text="About Me" size="4xl" />
        <span className="w-full flex justify-center">
          <p className="text-justify md:text-center px-4 text-xl outlined-text max-w-[750px]">
            Front-End Developer with 15+ months of experience building fast, scalable, and visually appealing web applications using React, Next.js, TypeScript, and more. Skilled in writing clean, reusable code and delivering responsive, high-performance interfaces. Looking to contribute to a dynamic tech team.

          </p>
        </span>

        <div className="flex justify-center">
          <Button onClick={() => setClicked(!clicked)} className="cursor-pointer hover:opacity-75 group z-10 transition-all duration-300">
            <Heading text="Highlights" className="transition-all duration-300 ease-in-out translate-x-[24px] group-hover:translate-x-0" size="2xl" />
            <MdKeyboardDoubleArrowDown
              color="white"
              size={'50px'}
              className={`
      transition-all duration-300 ease-in-out
      opacity-0 translate-x-[-8px]
      group-hover:opacity-100 group-hover:translate-x-0
      ${clicked ? 'rotate-180' : 'rotate-360'}
    `}
            />
          </Button>
        </div>

        {clicked && <div className={`flex flex-wrap gap-4 justify-center lg:justify-start transition-all`}>
          <HighLights />
        </div>}


      </div>
      <Download />

    </div>

  );
}
