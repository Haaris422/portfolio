import { LuCalendar, LuCalendar1, LuCode, LuLayers } from "react-icons/lu";
import { Button } from "./Button";

interface WorkCardProps {
    name?:string;
    role:string;
    type?:string;
    company?:string;
    period?:string;
    description:string;
    tech?:Array<string>;
}

interface CardProps {
  data: WorkCardProps;
}
export function Card({data}:CardProps){
    return(
        <div className="animate-fade-in min-w-[250px] flex items-start gap-4 relative bg-white border-2 min-h-[200px] rounded-4xl p-8 transition-all border-black hover:shadow-amber-800 hover:shadow-2xs hover:bg-amber-50">
            {data.tech&&<div className="bg-amber-200 p-3 rounded-lg">
                    <LuLayers className="text-2xl text-gray-800" strokeWidth={1.5} />
                  </div>}
            <div>
            <h2 className="text-2xl font-bold mb-2">{data?.name ? data.name: data.role}</h2>
            <div className="flex justify-between mb-6 flex-wrap">
                <span className="italic">{data.company ? data.company:data.role}</span>
                {data?.period && <span className="flex items-center gap-1"><LuCalendar className="text-xl"/>{data.period}</span>}
            </div>
            <span className="text-lg">{data.description}</span>
            {data?.tech && <div className="space-x-4 space-y-4 mt-6">
                {data.tech.map((tech:any) => (
                    <Button className="border-2 duration-500 transform transition-transform border-black hover:scale-105 hover:bg-black hover:text-white" key={tech}>
                        <LuCode/>
                        {tech}
                    </Button>
                ))}
            </div>}
            </div>
        </div>
    )
}