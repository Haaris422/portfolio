"use client"
import { LuArrowUpRight,LuLinkedin, LuGithub } from "react-icons/lu";
import { Button } from "../Button";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { Heading } from "../Heading";
export function About() {
  const skills = ["React.js", "Next.js", "TypeScript", "Tailwind", "JavaScript", "HTML", "CSS", "Redux"]
  const contentRef = useRef<HTMLDivElement | any>(null);
  const imageRef = useRef<HTMLDivElement | any>(null);

  const showContent = useInView(contentRef);
  const showImage = useInView(imageRef);


  return (
      <div className="p-2 lg:px-32 flex flex-col-reverse justify-between lg:flex-row lg:space-x-16 items-center ">
        <div ref={contentRef} className={`px-2 py-8 lg:p-16 space-y-4 min-h-[250px] transition-opacity duration-1000 ${
          showContent ? "animate-slide-in opacity-100" : "opacity-0"
        }`}>
          <Heading text="About Me" className="m-0" size="4xl" />
          <p className="text-justify text-xl max-w-[750px] pt-8">Front-End Developer with 15+ months of experience building fast, scalable, and visually appealing web applications using React, Next.js, TypeScript, and more. Skilled in writing clean, reusable code and delivering responsive, high-performance interfaces. Looking to contribute to a dynamic tech team.

          </p>
          <div className="py-6">
            <Heading text="Skills & Expertise" className="mb-6" size="2xl"/>

            <div className="flex max-w-[750px] flex-wrap gap-4 pt-6 justify-center lg:justify-start">
              {skills.map((skill) => (<Button className="bg-white opacity-75 border-2 transition-all border-black duration-500 hover:bg-[#6c757d] hover:translate-y-[-2px]" key={skill}>{skill}</Button>))}
            </div>
          </div>

          <div className="flex space-x-4 pt-8 justify-center lg:justify-start">
            <Link target="_blank" className="transform transition-transform duration-300 hover:scale-105" href="https://github.com/Haaris422">
              <Button className="bg-black cursor-pointer text-white group transition-all duration-300 ">
                <LuGithub />
                Github
                <LuArrowUpRight className="opacity-0 translate-x-[-8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </Button>
            </Link>
            <Link target="_blank" className="transform transition-transform duration-300 hover:scale-105" href="https://linkedin.com/in/mohd-haaris-amin

">
              <Button className="bg-blue-400 cursor-pointer text-white group transition-all duration-300">
                <LuLinkedin />
                LinkedIn
                <LuArrowUpRight className="opacity-0 translate-x-[-8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </Button>
            </Link>
          </div>
        </div>
        <div ref={contentRef} className={`relative group mb-8 lg:mb-0 transition-opacity duration-1000 ${
          showImage ? "animate-slide-in-opp opacity-100" : "opacity-0"
        }`}>
          <div className="absolute inset-0 bg-[#6c757d] rounded-2xl transform rotate-3 
              transition-transform duration-300 group-hover:rotate-6"></div>
          <img
            className="relative rounded-2xl border-2 border-gray-800 min-h-[300px] min-w-[300px] 
                h-[350px] w-[350px] object-cover shadow-lg transition-transform 
                duration-300 group-hover:translate-y-[-5px]"
            src="/images/mePp.jpg"
            alt="Profile"
          />
        </div>
      </div>

  );
}
