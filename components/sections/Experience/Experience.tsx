import { Heading } from "../../shared/Heading";
import { experience, projects } from "./Data";
import { Card } from "./Components/WorkCard";

export function Experience() {
  

  return (

      <div className="space-y-12">

        <Heading text="Work Experience" size="4xl"/>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <Card key={index} data={exp} />
          ))}
        </div>
        <Heading text={"Major Projects"} size="2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj, index) => (
            <Card key={index} data={proj} />
          ))}
        </div>
      </div>
  )
}