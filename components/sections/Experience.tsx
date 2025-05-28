import { Card } from "../WorkCard";

export function Experience() {
  const experience = [
    {
      type: "Full Time",
      role: "Associate Software Developer",
      period: "Nov 2023 - Dec 2024",
      company: "Nativebyte",
      description: "Led front-end development on three projects. Built and maintained high-quality web applications using technologies such as Redux, Firebase, and Socket.IO. Gained hands-on experience with industry-grade tools and team collaboration workflows."
    },
    {
      type: "Internship",
      role: "Software Developer Intern",
      period: "Sept 2023 - Oct 2023",
      company: "Nativebyte",
      description: "Quickly promoted to a full-time Associate Software Engineer within six weeks. Contributed to multiple features and enhancements to existing websites during the internship period. "
    }
  ]
  const projects = [
    {
      name: "SVG Editor",
      role: "Lead Front-End Developer",
      description: "Scalable vector drawing and editing platform using React.js, Fabric.js, and Material UI.",
      tech: ["React.js", "Fabric.js", "Material UI"]
    },
    {
      name: "Admin Panel",
      role: "Associate Front-End Developer",
      description: "Courier delivery app admin panel built with Next.js, Redux, Node.js and Firebase.",
      tech: ["Next.js", "Redux", "Node.js", "Firebase"]
    },
    {
      name: "Chatbot Admin Panel",
      role: "Lead Front-End Developer",
      description: "Admin panel for an AI chatbot using React.js, Node.js, Redux, react-bootstrap, and Socket.IO.",
      tech: ["React.js", "Node.js", "Redux", "Socket.IO"]
    },
    {
      name: "E-Commerce Site",
      role: "Associate → Lead Front-End Developer",
      description: "E-commerce platform for buying and selling cloud particles. Built using Next.js, Node.js, TypeScript, and MUI.",
      tech: ["Next.js", "Node.js", "TypeScript", "MUI"]
    }
  ];

  return (
    <div className="p-2 lg:px-32 lg:py-2">

      <div className="px-2 py-8 lg:p-16 space-y-4">

        <h2 className="relative pb-8 group text-4xl font-bold text-center lg:text-left w-full">
          <span className="relative inline-block">
            Work Experience
            <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full lg:w-[40%] group-hover:w-full"></span>
          </span>
        </h2>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <Card key={index} data={exp} />
          ))}
        </div>
        <h2 className="relative group text-2xl my-10 font-bold text-center lg:text-left w-full">
        <span className="relative inline-block">
          Major Projects
          <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full lg:w-[40%] group-hover:w-full"></span>
        </span>
      </h2> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj, index) => (
            <Card key={index} data={proj} />
          ))}
        </div>
      </div>
    </div>
  )
}