import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
export default function Home() {
  return(
     <main >
      <section className="pt-10" id="about">
        <About />
      </section>

      <section className="scroll-mt-10" id="experience">
        <Experience />
      </section>

      <section className="scroll-mt-10" id="education">
        <Education />
      </section>
      
    </main>
  )
}
