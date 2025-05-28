import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact/Contact";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
export default function Home() {
  return(
     <main className="bg-gradient-to-b from-amber-50 to-amber-100">
      <section className="pt-10" id="about">
        <About />
      </section>

      <section className="scroll-mt-10" id="experience">
        <Experience />
      </section>
      
      <section className="scroll-mt-10" id="skills">
        <Skills />
      </section>

      <section className="scroll-mt-10" id="contact">
        <Contact/>
      </section>
      
    </main>
  )
}
