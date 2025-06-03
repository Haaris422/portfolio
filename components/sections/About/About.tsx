"use client"
import { LuArrowUpRight, LuLinkedin, LuGithub } from "react-icons/lu";
import { Button } from "../../Button";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { Heading } from "../../Heading";
import Socials from "../Contact/Socials";
import { HighLights } from "./HighLights";
export function About() {
  const skills = ["React.js", "Next.js", "TypeScript", "Tailwind", "JavaScript", "HTML", "CSS", "Redux"]
  const contentRef = useRef<HTMLDivElement | any>(null);

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
        <div className="py-6">
          <Heading text="Skills & Expertise" className="mb-6" size="2xl" />
          
          <div className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start">
          <HighLights/>
          </div>
          {/* <div className="flex max-w-[750px] flex-wrap gap-4 pt-6 justify-center lg:justify-start">
              {skills.map((skill) => (<Button className="bg-white opacity-75 border-2 transition-all border-black duration-500 hover:bg-[#6c757d] hover:translate-y-[-2px]" key={skill}>{skill}</Button>))}
            </div> */}
        </div>

        <Socials />
      </div>

    </div>

  );
}
