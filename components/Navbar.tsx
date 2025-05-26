"use client";
import { useState } from "react";
import HamburgerButton from "./Hamburger";
import ThemeToggleButton from "./ThemeToggle";
import Link from "next/link";
export function Navbar() {
    const menuItems = [
        { label: "About", href: "#about" },
        { label: "Work Experience", href: "#experience" },
        { label: "Skills", href: "#skills" },
        { label: "Education", href: "#education" },
        
    ];
    const [openMenu, setOpenMenu] = useState(false);
    function openMobileNav() {
        setOpenMenu(!openMenu);
    }


    return (
        <div className="fixed bg-white w-full z-10 border-b-2">
            <div className={` flex items-center text-secondary justify-between py-2 px-4`}>
                <div>
                    <p className="text-lg animate-slide-down">Mohd. Haaris Amin</p>

                    <p className="text-sm animate-slide-in">Front-End Developer</p>
                </div>
                <ul className="hidden md:flex space-x-8">
                    {menuItems.map((item) => {
                        return (
                            <li
                                key={item.label}
                                className="relative group text-secondary animate-slide-down"
                            >
                                <Link href={item.href}>
                                    {item.label}
                                </Link>
                                <span className="absolute mt-0.5 left-1/2 bottom-0 w-0 h-[2.5px] bg-black transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 transform -translate-x-1/2 group-hover:translate-x-0" />
                            </li>
                        );
                    })}
                </ul>

                <div className="animate-slide-in-opp">
                    <p className="hidden md:block">Contact Me</p>

                    <div className="block md:hidden">
                        <HamburgerButton open={openMenu} onClick={openMobileNav} />
                    </div>
                </div>


            </div>
            <ul className={`tab flex md:hidden flex-col opacity-60 font-bold justify-center items-center bg-amber-100  transition-all duration-500 ease-in-out overflow-hidden ${openMenu ? "max-h-screen text-black" : "max-h-0 py-0 text-amber-50"
                }`}
            >
                {menuItems.map((item) => {
                    return (
                        <li className="hover:bg-amber-50 w-full text-center py-2" key={item.label}>
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    )
                })}
                <li className="hover:bg-amber-50 w-full text-center py-2">
                    <Link href="#">
                        Contact Me
                    </Link>
                </li>
            </ul>
        </div>
    )
}