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
      <section id="about" className="mb-4">
        <h1 id="about-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[2px] after:w-12 after:bg-[var(--foreground)] after:mt-2">
          About Me !
        </h1>
        <div className="flex flex-col md:flex-row items-start gap-6 md:items-center">
          <img
            src="images/ETLogo.png"
            alt="Navneeth Dhamotharan"
            className="w-40 h-40 rounded-lg object-cover flex-shrink-0 mx-auto md:mx-0"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Hi! I'm Navneeth
            </h2>
            <p className="text-l mb-4">
              I'm currently a Bachelor's student at the University of Washington,
              specializing in Data Science under the iSchool, with a second degree in
              Economics. My primary interests lie in Software and Data Engineering,
              with a growing focus on the intersection of Machine Learning and
              economic applications.
            </p>
            <p className="text-l mb-4">
              Outside the classroom, I’m the director at Eat Together, a platform
              helping students connect over shared meals. I also contribute to the
              Software Engineering Career Club, building tools and community through SWECC Labs,
              Resume Review platform and other projects to support students in becoming better
              engineers.
            </p>
            <p className="text-l mb-4">
              I'm currently developing a stock market prediction platform that brings
              together software, data pipelines, and ML modeling—culminating in an
              interactive dashboard to visualize forecasts and trends.
            </p>
          </div>
        </div>
      </section>
      <section id="education" className="mb-4">
        <h1 id="education-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Education
        </h1>
        <h2 className="text-xl font-semibold mb-1">
          University of Washington, Seattle
        </h2>
        <div className="flex flex-wrap justify-between items-center text-lg text-[var(--sidebar)] mb-2">
          <span>B.S. Informatics: Data Science &nbsp; + &nbsp; B.A. Economics (GPA: 3.54)</span>
          <span className="text-lg italic text-[var(--sidebar)]">
            Sep 2023 – Jun 2027 (Expected)
          </span>
        </div>
        <p className="leading-relaxed">
          <span className="font-semibold">Relevant Coursework:</span> Data Structures and Algorithms, 
          Introduction to Data Science, Statistical Analysis in R, Databases, Econometrics
        </p>
      </section>
      <section id="#experience" className="mb-4">
        <h1 id="experience-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Experience
        </h1>
      </section>
      <section id="#skills" className="mb-4">
        <h1 id="skills-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Skills
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {["Java", "Python", "SQL(Postgres)", "JavaScript", "HTML", "CSS", "R", "React", "Node.js"].map((lang) => (
                <span
                  key={lang}
                  className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-3 py-1 rounded-md text-sm font-mono"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3"> Tools & Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {[ "Git", "Google Cloud Platform(GCP)", "Homebrew", "Firebase", "RStudio", "Docker", "bash", "AWS"].map((tool) => (
                <span
                  key={tool}
                  className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-3 py-1 rounded-md text-sm font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-full flex md:justify-center">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3 text-left md:text-center">
                Libraries
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 justify-items-start md:justify-items-center">
                {["Pandas", "NumPy", "Matplotlib", "Seaborn", "Geopandas", "TensorFlow", "SciKitLearn", "Tidyverse"].map((lib) => (
                  <span
                    key={lib}
                    className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-3 py-1 rounded-md text-sm font-mono"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>
      <section id="#projects" className="mb-4">
        <h1 id="skills-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Projects
        </h1>
      </section>
      <section id="#resume" className="mb-4">
        <h1 id="skills-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Resume
        </h1>
      </section>

    </SiteLayout>
  );
}
