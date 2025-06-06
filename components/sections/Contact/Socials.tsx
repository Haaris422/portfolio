import { Button } from "@/components/Button";
import Link from "next/link";
import { LuGithub, LuArrowUpRight, LuLinkedin } from "react-icons/lu";

const Socials = () =>{

    return(
        <div className="flex space-x-4 pt-8 justify-center lg:justify-start">
            <Link target="_blank" className="transform transition-transform duration-300 hover:scale-105" href="https://github.com/Haaris422">
              <Button className="bg-black hover:opacity-75 cursor-pointer text-white group transition-all duration-300 ">
                <LuGithub />
                Github
                <LuArrowUpRight className="opacity-0 translate-x-[-8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </Button>
            </Link>
            <Link target="_blank" className="transform transition-transform duration-300 hover:scale-105" href="https://linkedin.com/in/mohd-haaris-amin

">
              <Button className="bg-blue-400 hover:opacity-75 cursor-pointer text-white group transition-all duration-300">
                <LuLinkedin />
                LinkedIn
                <LuArrowUpRight className="opacity-0 translate-x-[-8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </Button>
            </Link>
          </div>
    )

}

export default Socials;