"use client";
import { Button } from "@/components/Button"
import Link from "next/link"
import { FaXTwitter } from "react-icons/fa6"
import { LuArrowUpRight, LuGithub, LuLinkedin, LuMail, LuMapPin } from "react-icons/lu"
import { useRef } from "react";
import { useInView } from "@/components/hooks/useInView";
import Socials from "./Socials";
import { CardBody } from "@/components/CardBody";

export function ContactInfo() {
        const contentRef = useRef<HTMLDivElement | any>(null);
        const showContent = useInView(contentRef);
    
    const otherContacts = [
        {
            label: "Email",
            value: "haarisamin123@gmail.com",
            icon: <LuMail />,
            link: "mailto:haarisamin123@gmail.com"
        },
        {
            label: "Twitter",
            value: "@HaarisAmin2",
            icon: <FaXTwitter />,
            link: "https://x.com/HaarisAmin2"
        },
        {
            label: "Location",
            value: "Greater Noida, Uttar Pradesh",
            icon: <LuMapPin />,
            link: null
        },
    ]
    const anim=` ${
          showContent ? "animate-fade-in opacity-10 *:" : "animate-fade-out"
        }`;
    return (
        <div ref={contentRef} className={`relative backdrop-blur-3xl group transition-opacity duration-1000 ${
          showContent ? "animate-fade-in opacity-10 *:" : "animate-fade-out"
        }`}>
                <div className="absolute inset-0 bg-[#51606c] rounded-2xl transform -rotate-1 
              transition-transform duration-300 group-hover:-rotate-2"></div>
        <CardBody className="relative bg-[#6c757d] text-white rounded-4xl
         w-full border-2 border-black p-4 flex flex-col h-full shadow-lg transition-transform 
                duration-300 group-hover:translate-y-[-5px]">

            <h2 className="relative p-2 group text-2xl font-bold text-center lg:text-left w-full">
                <span className="relative inline-block">Other Ways to Connect</span>
            </h2>

            <div className="p-2 sm:p-4 space-y-8">
                {otherContacts.map((location, index) => (
                    <div className="flex items-center gap-8" key={index}>
                        <div className="bg-black text-white text-lg sm:text-2xl p-3 rounded-lg">{location.icon}</div>
                        <div className="inline-block text-md sm:text-lg">
                            <div className="font-bold">{location.label}</div>
                            {location.link ? (
                                <Link target="_blank" href={location.link}>{location.value}</Link>
                            ) : (
                                <span>{location.value}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col my-4 px-4 justify-start mt-auto">
                <div className="border-t-2 border-gray-300 w-full my-0.5" />
                <Socials/>
            </div>
        </CardBody>

        </div>
    )
}