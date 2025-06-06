"use client"
import { LuArrowUpRight, LuLinkedin, LuGithub, LuArrowDown01 } from "react-icons/lu";
import { Button } from "../../Button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { Heading } from "../../Heading";
import Socials from "../Contact/Socials";
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
    <div className="p-24 flex justify-center flex-row lg:space-x-16 items-center ">
      <div ref={contentRef} className={`space-y-4 min-h-[250px] transition-opacity duration-1000 ${showContent ? "animate-slide-in opacity-100" : "animate-slide-out"
        }`}>
        <Heading text="About Me" className="m-0" size="4xl" />
        <span className="w-full flex justify-center">
          <p className="text-center text-xl outlined-text max-w-[750px] pt-8">Front-End Developer with 15+ months of experience building fast, scalable, and visually appealing web applications using React, Next.js, TypeScript, and more. Skilled in writing clean, reusable code and delivering responsive, high-performance interfaces. Looking to contribute to a dynamic tech team.

          </p>
        </span>

        <div className="py-6 flex justify-center">
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


          {/* <div className="flex max-w-[750px] flex-wrap gap-4 pt-6 justify-center lg:justify-start">
              {skills.map((skill) => (<Button className="bg-white opacity-75 border-2 transition-all border-black duration-500 hover:bg-[#6c757d] hover:translate-y-[-2px]" key={skill}>{skill}</Button>))}
            </div> */}
        </div>

        {clicked && <div className={`flex flex-wrap gap-4 pt-6 justify-center lg:justify-start transition-all`}>
          <HighLights />
        </div>}


      </div>
        <Download />

    </div>

  );
}
