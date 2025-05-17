export function About() {
  return (
    <div className="py-16 px-10 md:px-10 bg-amber-100">
      <div className="flex flex-col-reverse md:flex-row md:space-x-16 items-center ">
        <div className="bg-amber-50 rounded-4xl space-y-4 border-2 border-black p-8 animate-slide-in min-h-[250px]">
          <h2 className="text-2xl font-bold text-center md:text-left">About Me</h2>

          <p className="text-justify">Front-End Developer with 15+ months of experience building fast, scalable, and visually appealing web applications using React, Next.js, TypeScript, and more. Skilled in writing clean, reusable code and delivering responsive, high-performance interfaces. Looking to contribute to a dynamic tech team.

          </p>
        </div>
        <img className="rounded-4xl mb-5 md:mb-0 border-2 border-black animate-slide-in-opp h-[250px] w-[250px]" src="\images\mePp.jpg" alt="My-Face" />

      </div>
    </div>
  );
}
