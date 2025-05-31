"use client";
import { useEffect, useRef, useState } from "react";
import HamburgerButton from "./Hamburger";
import ThemeToggleButton from "./ThemeToggle";
import Link from "next/link";

export function Navbar() {
  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Work Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact Me", href: "#contact" },
  ];

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  function openMobileNav() {
    setOpenMenu(!openMenu);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openMenu &&
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);
  useEffect(() => {
    const sectionElements = menuItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[];

    function getCurrentSection() {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection: string | null = null;

      for (const section of sectionElements) {
        const { top, bottom } = section.getBoundingClientRect();
        const sectionTop = window.scrollY + top;
        const sectionBottom = window.scrollY + bottom;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = `#${section.id}`;
          break;
        }
      }

      setActiveSection(currentSection);
    }

    window.addEventListener("scroll", getCurrentSection);
    getCurrentSection(); // Run on mount

    return () => {
      window.removeEventListener("scroll", getCurrentSection);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.1,
    };


    let timeout: NodeJS.Timeout;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            setActiveSection(`#${entry.target.id}`);
          }, 50);
        }
      });
    }, observerOptions);


    menuItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed w-full z-10 text-[#d9d9d9] backdrop-blur-md">
      <div className="flex items-center justify-between py-2 px-4">
        <div>
          <p className="text-xl animate-slide-down">Mohd. Haaris Amin</p>
          <p className="text-md animate-slide-in">Front-End Developer</p>
        </div>

        <ul className="hidden text-xl md:flex space-x-8">
          {menuItems.filter((item) => item.href !== "#contact").map((item) => (
            <li
              key={item.label}
              className={`relative group animate-slide-down ${activeSection === item.href ? "text-white font-semibold" : ""
                }`}
            >
              <Link href={item.href}>{item.label}</Link>
              <span
                className={`absolute mt-0.5 left-1/2 bottom-0 h-[2.5px] transition-all duration-300 ease-in-out transform -translate-x-1/2 ${activeSection === item.href
                  ? "w-full bg-white"
                  : "w-0 group-hover:w-full group-hover:left-0 group-hover:translate-x-0 bg-[#d9d9d9]"
                  }`}
              />
            </li>
          ))}
        </ul>

        <div className="animate-slide-in-opp text-xl">
          <div
            className={`relative hidden md:block group animate-slide-down ${activeSection === "#contact" ? "text-white font-semibold" : ""
              }`}
          >
            <Link href="#contact">Contact Me</Link>
            <span
              className={`absolute mt-0.5 left-1/2 bottom-0 h-[2.5px] transition-all duration-300 ease-in-out transform -translate-x-1/2 ${activeSection === "#contact"
                ? "w-full bg-white"
                : "w-0 group-hover:w-full group-hover:left-0 group-hover:translate-x-0 bg-[#d9d9d9]"
                }`}
            />
          </div>
          <div ref={hamburgerRef} className="block md:hidden">
            <HamburgerButton open={openMenu} onClick={openMobileNav} />
          </div>
        </div>
      </div>

      <ul
        ref={menuRef}
        className={`tab flex md:hidden gap-8 py-2 text-lg text-[#d9d9d9] flex-col opacity-60 font-bold justify-center items-center transition-all duration-500 ease-in-out overflow-hidden ${openMenu ? "max-h-screen" : "max-h-0 py-0"
          }`}
      >
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`relative group animate-slide-down ${activeSection === item.href ? "text-white font-semibold" : ""
              }`}
          >
            <Link href={item.href}>{item.label}</Link>
            <span
              className={`absolute mt-0.5 left-1/2 bottom-0 h-[2.5px] transition-all duration-300 ease-in-out transform -translate-x-1/2 ${activeSection === item.href
                ? "w-full bg-white"
                : "w-0 group-hover:w-full group-hover:left-0 group-hover:translate-x-0 bg-[#d9d9d9]"
                }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
