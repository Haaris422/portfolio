import { Heading } from "../Heading";
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
    { skill: "Google Cloud Services", level: 70, icon: "ɢ" },
    { skill: "MongoDB", level: 75, icon: "🍃" },
    { skill: "PostgreSQL", level: 70, icon: "🐘" },

  ];
  return (
    <div className="p-2 lg:px-32">

      <div className="px-2 py-8 lg:p-16 space-y-4">

        <Heading text="Skills" size="4xl" className="pb-8" />
        <div>
          <Heading text="Frontend Skills" size="2xl" className="pb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 rounded-4xl p-8 lg:grid-cols-3 gap-8">
            {frontendSkills.map((skill, index) => (
              <SkillCard key={index} data={skill} />
            ))}
          </div>

          <Heading text="Backend Skills" size="2xl" className="py-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 rounded-4xl p-8 lg:grid-cols-3 gap-8">
            {backendSkills.map((skill, index) => (
              <SkillCard key={index} data={skill} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}