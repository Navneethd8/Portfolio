import Link from "next/link";
import SiteLayout from "@/components/siteLayout"
import { FaLinkedin,FaGithub,FaXTwitter } from 'react-icons/fa6';
import { CgWebsite } from "react-icons/cg";
import { MdEmail } from "react-icons/md";


export default function Home() {
  return (
    <SiteLayout
      sidebar={
        <div className="flex flex-col h-full w-full">
          <div className="flex-shrink-0 mb-4">
              <h1 className="text-2xl font-semibold mb-2 text-[var(--background)]">Navneeth Dhamotharan</h1>
              <p className="text-[var(--background)] text-xl">Aspiring Data / Software Engineer</p>
          </div>

          <div className="flex flex-col gap-4">
            <nav 
              className="
                  flex
                  gap-2
                  flex-row 
                  overflow-x-auto 
                  whitespace-nowrap 
                  
                  lg:flex-col 
                  lg:overflow-visible 
                  lg:whitespace-normal
                  lg:pr-2
                  lg:flex-grow

                  "
            >
              <a href="#about" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                About
              </a>
              <a href="#education" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Education
              </a>
              <a href="#experience" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Experience
              </a>
              <a href="#skills" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Skills
              </a>
              <a href="#projects" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Projects
              </a>
              <a href="#resume" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Resume
              </a>
            </nav>

            <div>
              <p className="text-[var(--background)] text-xl">Let's Connect!</p>
            </div>
            <nav 
              className="
                  flex
                  gap-2
                  justify-center
                  flex-row 
                  overflow-x-auto 
                  whitespace-nowrap 

                  
                  lg:flex-col 
                  lg:overflow-visible 
                  lg:whitespace-normal
                  lg:pr-2
                  lg:flex-grow

                  "
            >
              <a href="mailto:nd17@uw.edu" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <MdEmail />
                <span className="hidden lg:inline">nd17@uw.edu</span>
              </a>

              <a href="https://www.linkedin.com/in/navneethd" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <FaLinkedin />
                <span className="hidden lg:inline">LinkedIn</span>
              </a>

              <a href="https://github.com/navneethd8" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <FaGithub />
                <span className="hidden lg:inline">GitHub</span>
              </a>

              <a href="https://navneeth.vercel.app" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <CgWebsite />
                <span className="hidden lg:inline">Website</span>
              </a>

              <a href="https://x.com/NavneethDG" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <FaXTwitter />
                <span className="hidden lg:inline">Twitter / X</span>
              </a>
            </nav>
          </div>
        </div>
      }
    >
      <section>
        <h2 id="about"className="text-2xl font-semibold mb-4">Hi! I'm Navneeth Dhamotharan</h2>
        <p className="text-l mb-4">
          I'm currently a Bachelor's student at the University of Washington, specializing in Data Science under the iSchool, with a second degree in Economics. My primary interests lie in Software and Data Engineering, with a growing focus on the intersection of Machine Learning and economic applications.
        </p>
        <p className="text-l mb-4">
          Outside the classroom, I’m a director at Eat Together, a platform helping students connect over shared meals. I also contribute to the Software Engineering Career Club, building tools like SWECC Labs and the Resume Review platform to support students in becoming better engineers.
        </p>
        <p className="text-l mb-4">
          I'm currently developing a stock market prediction platform that brings together software, data pipelines, and ML modeling—culminating in an interactive dashboard to visualize forecasts and trends.
        </p>
      </section>
    </SiteLayout>
  );
}
