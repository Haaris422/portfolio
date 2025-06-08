'use client';
import { CardBody } from "@/components/shared/CardBody";
import { useInView } from "@/components/hooks/useInView";
import { useRef } from "react";
import { HighlightsCardProps } from "../Data";



export function HighLightsCard({index, item}:HighlightsCardProps){
    const ref = useRef<HTMLDivElement>(null);
            const isVisible = useInView(ref);
            const anim = isVisible
              ? `opacity-100 animate-slide-down`
              : `opacity-0! animate-slide-up`;
    
            return (
              <CardBody
                key={index}
                cardRef={ref}
                delay={index * 0.2}
                animationClass={anim}
                className="w-[300px] hover:scale-105 group"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 perspective-[1000px]">
                  <div className="bg-black text-white text-4xl rounded-full p-3 shadow-md transition-transform duration-700 group-hover:[transform:rotateY(360deg)] [transform-style:preserve-3d] will-change-transform">
                    {item.icon}
                  </div>
                </div>
    
    
                <h2 className="text-center text-xl font-bold">{item.title}</h2>
                <div className="border-t-2 border-gray-300 w-full" />
                <p className="text-center text-md text-gray-200">{item.desc}</p>
              </CardBody>
            );
}