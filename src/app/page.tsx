import SiteLayout from "@/components/siteLayout"
import { FaGithub } from 'react-icons/fa6';
import { CgWebsite } from "react-icons/cg";
import ExperienceTimeline, { ExperienceTimelineItem } from "@/components/ExperienceTimeline";
import ProjectCarousel, { ProjectCard } from "@/components/ProjectCarousel";
import portfolioData from "@/data/portfolio.json";

export default function Home() {
  return (
    <SiteLayout>
      <section id="about" className="mb-4">
        <h2 id="about-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[2px] after:w-12 after:bg-[var(--foreground)] after:mt-2">
          About Me !
        </h2>
        <div className="flex flex-col md:flex-row items-start gap-6 md:items-center">
          <img
            src="images/navneeth.jpeg"
            alt="Navneeth Dhamotharan"
            className="w-40 h-40 rounded-lg object-cover flex-shrink-0 mx-auto md:mx-0"
          />

          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">
              Hi! I&apos;m Navneeth
            </h3>
            <p className="text-l mb-4">
              I&apos;m currently a Bachelor&apos;s student at the University of Washington,
              specializing in Data Science under the iSchool, with a second degree in
              Economics. My primary interests lie in Software and Data Engineering,
              with a growing focus on the intersection of Machine Learning and
              economic applications.
            </p>
            <p className="text-l mb-4">
              Outside the classroom, I&apos;m the incoming director at <a href="https://eat-together.org/">Eat Together</a>, a platform
              helping students connect over shared meals. I also contribute to the
              Software Engineering Career Club, building tools and community through an in house
              Resume Review platform, <a href="https://labs.swecc.org/" className="text-[var(--link)]">SWECC Labs</a> and other projects to support students in becoming better
              engineers.
            </p>
            <p className="text-l mb-4">
              I&apos;m currently developing a stock market prediction platform that brings
              together software, data pipelines, and ML modeling—culminating in an
              interactive dashboard to visualize forecasts and trends.
            </p>
          </div>
        </div>
      </section>

      <section id="education" className="mb-4">
        <h2 id="education-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Education
        </h2>
        <h3 className="text-xl font-semibold mb-1">
          University of Washington, Seattle
        </h3>
        <div className="flex flex-wrap justify-between items-center text-lg text-[var(--sidebar)] mb-2">
          <span>B.S. Informatics: Data Science &nbsp; + &nbsp; B.A. Economics (GPA: 3.54)</span>
          <span className="text-lg italic text-[var(--sidebar)]">
            Expected Graduation: Jun 2027
          </span>
        </div>
        <p className="leading-relaxed">
          <span className="font-semibold">Relevant Coursework:</span>
          Data Structures and Algorithms,
          Introduction to Data Science,
          Statistical Analysis in R,
          Databases and Data Modelling,
          Econometrics,
          Object Oriented Programming,
          Intermediate Data Programming,
          Core Methods in Data Science
        </p>
      </section>

      <section id="experience" className="mb-4">
        <h2 id="experience-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Experience
        </h2>

        <ExperienceTimeline>
          {portfolioData.experience.map((exp: { role: string, company: string, location: string, date: string, logoSrc: string, summary: string, github?: string, link?: string }, idx: number) => (
            <ExperienceTimelineItem
              key={idx}
              role={exp.role}
              company={exp.company}
              location={exp.location}
              date={exp.date}
              logoSrc={exp.logoSrc}
              summary={exp.summary}
              isLast={idx === portfolioData.experience.length - 1}
              links={
                <>
                  {exp.github && (
                    <a
                      className="flex items-center gap-1 hover:text-[var(--link-hover)]"
                      href={exp.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${exp.company} GitHub`}
                    >
                      <FaGithub />
                    </a>
                  )}
                  {exp.link && (
                    <a
                      className="flex items-center gap-1 hover:text-[var(--link-hover)]"
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${exp.company} Website`}
                    >
                      <CgWebsite />
                    </a>
                  )}
                </>
              }
            />
          ))}
        </ExperienceTimeline>
      </section>

      <section id="skills" className="mb-4">
        <h2 id="skills-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {["Java", "Python", "SQL(Postgres)", "JavaScript", "HTML", "CSS", "R", "React", "Node.js"].map((lang) => (
                <span
                  key={lang}
                  className="bg-[var(--tag-bg)] text-[var(--tag-text)] px-3 py-1 rounded-md text-sm font-mono"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3"> Tools & Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {["Git", "Google Cloud Platform(GCP)", "Homebrew", "Firebase", "RStudio", "Docker", "bash", "AWS"].map((tool) => (
                <span
                  key={tool}
                  className="bg-[var(--tag-bg)] text-[var(--tag-text)] px-3 py-1 rounded-md text-sm font-mono"
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
                    className="bg-[var(--tag-bg)] text-[var(--tag-text)] px-3 py-1 rounded-md text-sm font-mono"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects-data" className="mb-4">
        <h2 id="sprojects-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Data Projects
        </h2>

        <ProjectCarousel>
          {portfolioData.dataProjects.map((project: { title: string, date: string, tags: string[], summary: string, link?: string, github?: string }, idx: number) => (
            <ProjectCard
              key={idx}
              title={project.title}
              date={project.date}
              tags={project.tags}
              summary={project.summary}
              links={
                (project.link || project.github) ? (
                  <>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Website`}
                        className="hover:text-[var(--link-hover)]"
                      >
                        <CgWebsite />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="hover:text-[var(--link-hover)]"
                      >
                        <FaGithub />
                      </a>
                    )}
                  </>
                ) : undefined
              }
            />
          ))}
        </ProjectCarousel>
      </section>

      <section id="projects-swe" className="mb-4">
        <h2 id="swe-projects-subheading" className="relative text-2xl font-bold mb-6 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Software Engineering Projects
        </h2>

        <ProjectCarousel>
          {portfolioData.sweProjects.map((project: { title: string, date: string, tags: string[], summary: string, link?: string, github?: string }, idx: number) => (
            <ProjectCard
              key={idx}
              title={project.title}
              date={project.date}
              tags={project.tags}
              summary={project.summary}
              links={
                <>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} Website`}
                      className="hover:text-[var(--link-hover)]"
                    >
                      <CgWebsite />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="hover:text-[var(--link-hover)]"
                    >
                      <FaGithub />
                    </a>
                  )}
                </>
              }
            />
          ))}
        </ProjectCarousel>
      </section>

      <section id="resume" className="mb-4">
        <h2 id="resume-subheading" className="relative text-2xl font-bold mb-6 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Resume
        </h2>
        <h3 className="text-xl font-semibold mb-6 text-center">
          Download my resume below!
        </h3>
        <div className="flex justify-center gap-5">
          <a
            href="Navneeth_Dhamotharan_Resume.pdf"
            target="_blank"
            className="resume-link px-6 py-2 rounded-md text-lg font-mono text-center"
          >
            Software Engineering Resume
          </a>
          <a
            href="Dhamotharan_Navneeth_Resume.pdf"
            target="_blank"
            className=" resume-link px-6 py-2 rounded-md text-lg font-mono text-center"
          >
            Data Science Resume
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
