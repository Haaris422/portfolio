"use client";
import { useState } from "react";
import HamburgerButton from "./Hamburger";
import ThemeToggleButton from "./ThemeToggle";
export function Navbar() {
    const menuItems = [
        { label: "Education", href: "#" },
        { label: "Work Experience", href: "#" },
        { label: "Skills", href: "#" },
    ];
    const [openMenu, setOpenMenu] = useState(false);
    function openMobileNav() {
        setOpenMenu(!openMenu);
    }
    

    return (
        <div className="fixed w-full z-10">
            <div className={` flex items-center text-secondary justify-between bg-primary py-2 px-4`}>
                <div>
                    <p className="text-lg animate-slide-down">Mohd. Haaris Amin</p>

                    <p className="text-sm animate-slide-in">Front-End Developer</p>
                </div>
                <ul className="hidden md:flex space-x-4">
                    {menuItems.map((item) => {
                        return (
                            <li className="animate-slide-down" key={item.label}>
                                <a href={item.href}>
                                    {item.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <div className="animate-slide-in-opp">
                    <p className="hidden md:block">Contact Me</p>

                    <div className="block md:hidden">
                        <HamburgerButton open={openMenu} onClick={openMobileNav} />
                    </div>
                </div>


            </div>
            <ul className={`flex md:hidden flex-col opacity-90 space-y-4 p-5 justify-center items-center bg-amber-50  transition-all duration-500 ease-in-out overflow-hidden ${openMenu ? "max-h-screen text-black py-2" : "max-h-0 py-0 text-amber-50"
                }`}
            >
                {menuItems.map((item) => {
                    return (
                        <li key={item.label}>
                            <a href={item.href}>
                                {item.label}
                            </a>
                        </li>
                    )
                })}
                <li>
                    <a href="#">
                        Contact Me
                    </a>
                </li>
            </ul>
        </div>
    )
}