import { SkillCard } from "../SkillCard";

export function Skills() {
    const frontendSkills = [
    { skill: "React.js", level: 90, icon: "⚛️" },
    { skill: "Next.js", level: 85, icon: "▲" },
    { skill: "TypeScript", level: 80, icon: "𝓣" },
    { skill: "JavaScript", level: 90, icon: "𝓙𝓢" },
    { skill: "HTML", level: 95, icon: "🌐" },
    { skill: "CSS", level: 85, icon: "🎨" },
    { skill: "Tailwind CSS", level: 90, icon: "🌊" },
    { skill: "Redux", level: 75, icon: "🔄" },
  ];

  const backendSkills = [
    { skill: "Node.js", level: 80, icon: "🟢" },
    { skill: "Socket.io", level: 70, icon: "🔌" },
    { skill: "Firestore Services", level: 75, icon: "🔥" },
  ];
  return (
    <div className="p-2 md:px-32 md:py-2">

      <div className="px-2 py-8 md:p-16 space-y-4">

        <h2 className="relative pb-8 group text-4xl font-bold text-center md:text-left w-full">
          <span className="relative inline-block">
            Skills
            <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full md:w-[40%] group-hover:w-full"></span>
          </span>
        </h2>
        <div>
            <h2 className="relative pb-8 group text-2xl font-bold text-center md:text-left w-full">
          <span className="relative inline-block">
            Frontend Skills
            <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full md:w-[40%] group-hover:w-full"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {frontendSkills.map((skill, index) => (
                <SkillCard key={index} data={skill}/>
            ))}
        </div>

        <h2 className="relative py-8 group text-2xl font-bold text-center md:text-left w-full">
          <span className="relative inline-block">
            Backend Skills
            <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full md:w-[40%] group-hover:w-full"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendSkills.map((skill, index) => (
                <SkillCard key={index} data={skill}/>
            ))}
        </div>
        </div>

    </div>
    </div>
  )
}