import { CardBody } from "@/components/CardBody";
import { useInView } from "@/components/hooks/useInView";
import { useRef } from "react";
interface SkillsProps {
    skill: string;
    level: number;
    icon: string;
    category: 'frontend' | 'backend' | 'other';
}
interface SkillCard {
    skill: SkillsProps;
    index:number
}
export function SkillTabelCard({ skill, index }: SkillCard) {
    const cardRef = useRef<HTMLDivElement | any>(null);
    const inView = useInView(cardRef);
    const animClass = 'animate-fade-in'
    return (
        <CardBody delay={index * 0.1} cardRef={cardRef} animationClass={animClass} className="text-white p-4! cursor-pointer hover:scale-105">
            
            <div className="flex justify-between items-center w-full">
                <span>
                    <h2 className="text-xl font-bold">
                    {skill.skill}
                    </h2>
                    <span className="italic text-sm">
                        {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                    </span>
                </span>
                <span className="text-white bg-black/80 rounded-2xl p-2">{skill.icon}</span>
            </div>
            <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                <div
                    className="h-full bg-black/80 rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: inView ? `${skill.level}%` : "0%",
                    }}
                />
            </div>
            <div className="flex justify-between items-center">
                Profeciency:
                <span>
                    {skill.level}%
                </span>
            </div>
        </CardBody>
    )
}