import { CardBody } from "@/components/shared/CardBody";
import { useInView } from "@/components/hooks/useInView";
import { useRef } from "react";
import { SkillCard } from "../Data";

export function SkillTabelCard({ skill, index }: SkillCard) {
    const cardRef = useRef<HTMLDivElement>(null);
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
            <div className="flex justify-between items-center">
                Level:
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${skill.level >= 80
                        ? 'bg-green-500/20 text-green-400'
                        : skill.level >= 60
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                    }`}>
                    {skill.level >= 80 ? 'Expert' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                </span>
            </div>
        </CardBody>
    )
}