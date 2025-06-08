import BackgroundAnimation from "@/components/shared/BackgroundAnimation";
import { About } from "@/components/sections/About/About";
import { Contact } from "@/components/sections/Contact/Contact";
import { Experience } from "@/components/sections/Experience/Experience";
import { Skills } from "@/components/sections/Skills/Skills";
export default function Home() {
  return(
     <main>
      <BackgroundAnimation/>
      
      <section className="p-8 lg:px-32 lg:pb-16 pt-24" id="about">
        <About />
      </section>

      <section className="scroll-mt-10 p-8 lg:px-32 lg:py-16" id="experience">
        <Experience />
      </section>
      
      <section className="scroll-mt-10 p-8 lg:px-32 lg:py-16" id="skills">
        <Skills />
      </section>

      <section className="scroll-mt-10" id="contact">
        <Contact/>
      </section>
      
    </main>
  )
}
