import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import { Button } from "../Button";
import { LuLinkedin } from "react-icons/lu";
import Link from "next/link";

export function About() {
  const skills = ["React.js", "Next.js", "TypeScript", "Tailwind", "JavaScript", "HTML", "CSS", "Redux"]


  return (
      <div className="py-24 px-48 flex flex-col-reverse justify-between lg:flex-row lg:space-x-16 items-center ">
        <div className="space-y-4 animate-slide-in min-h-[250px]">
          <h2 className="relative group text-4xl font-bold text-center lg:text-left w-full">
            <span className="relative inline-block">
              About Me
              <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full lg:w-[40%] group-hover:w-full"></span>
            </span>
          </h2>


          <p className="text-justify text-xl max-w-[750px] pt-8">Front-End Developer with 15+ months of experience building fast, scalable, and visually appealing web applications using React, Next.js, TypeScript, and more. Skilled in writing clean, reusable code and delivering responsive, high-performance interfaces. Looking to contribute to a dynamic tech team.

          </p>
          <div className="py-6">
            <h3 className="relative group mb-6 text-2xl font-bold text-center lg:text-left w-full">
              <span className="relative inline-block">
                Skills & Expertise
                <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full lg:w-[40%] group-hover:w-full"></span>
              </span>
            </h3>
            <div className="flex max-w-[750px] flex-wrap gap-4 pt-6 justify-center lg:justify-start">
              {skills.map((skill) => (<Button className="bg-white border-2 transition-all border-black duration-500 hover:bg-amber-400 hover:translate-y-[-2px]" key={skill}>{skill}</Button>))}
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
        <div className="relative group animate-slide-in-opp mb-8 lg:mb-0">
          <div className="absolute inset-0 bg-amber-400 rounded-2xl transform rotate-3 
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
