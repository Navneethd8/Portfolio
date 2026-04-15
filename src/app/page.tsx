import SiteLayout from "@/components/siteLayout"
import { FaGithub } from 'react-icons/fa6';
import { CgWebsite } from "react-icons/cg";
import ExperienceTimeline, { ExperienceTimelineItem } from "@/components/ExperienceTimeline";
import ProjectList from "@/components/ProjectList";
import portfolioData from "@/data/portfolio.json";
import Image from "next/image";

const sectionHeadingClass =
  "relative mb-6 text-2xl font-bold tracking-tight text-[var(--foreground)] after:mt-2.5 after:block after:h-0.5 after:w-14 after:bg-[var(--foreground)] after:content-['']";

const sectionEyebrowClass =
  "mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--paragraph)]";

const proseStackClass =
  "space-y-4 text-base leading-relaxed text-[var(--paragraph)] max-w-prose";

export default function Home() {
  return (
    <SiteLayout>
      <div className="flex flex-col gap-16 pb-10 sm:gap-20 sm:pb-14">
        <section id="about" className="scroll-mt-28">
          <h2 id="about-subheading" className={sectionHeadingClass}>
            About Me
          </h2>
          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10">
            <Image
              src="/images/navneeth.jpeg"
              alt="Navneeth Dhamotharan"
              width={160}
              height={160}
              className="mx-auto h-40 w-40 flex-shrink-0 rounded-lg object-cover md:mx-0"
            />

            <div className="min-w-0 flex-1">
              <h3 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
                Hi! I&apos;m Navneeth
              </h3>
              <div className={proseStackClass}>
                <p>
                  I&apos;m currently a Bachelor&apos;s student at the University of Washington,
                  specializing in Data Science under the iSchool, with a second degree in
                  Economics. My primary interests lie in Software and Data Engineering,
                  with a growing focus on the intersection of Machine Learning and
                  economic applications.
                </p>
                <p>
                  Outside the classroom, I&apos;m the incoming director at <a href="https://eat-together.org/">Eat Together</a>, a platform
                  helping students connect over shared meals. I also contribute to the
                  Software Engineering Career Club, building tools and community through an in house
                  Resume Review platform, <a href="https://labs.swecc.org/" className="text-[var(--link)]">SWECC Labs</a> and other projects to support students in becoming better
                  engineers.
                </p>
                <p>
                  I&apos;m currently developing a stock market prediction platform that brings
                  together software, data pipelines, and ML modeling—culminating in an
                  interactive dashboard to visualize forecasts and trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="scroll-mt-28">
          <h2 id="education-subheading" className={sectionHeadingClass}>
            Education
          </h2>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              University of Washington, Seattle
            </h3>
            <div className="flex flex-col gap-1 text-base text-[var(--paragraph)] sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
              <span>B.S. Informatics: Data Science + B.A. Economics (GPA: 3.54)</span>
              <span className="shrink-0 text-sm italic sm:text-base">
                Expected Graduation: Jun 2027
              </span>
            </div>
            <p className="max-w-prose pt-1 text-base leading-relaxed text-[var(--paragraph)]">
              <span className="font-semibold text-[var(--foreground)]">Relevant Coursework:</span>{" "}
              Data Structures and Algorithms,
              Introduction to Data Science,
              Statistical Analysis in R,
              Databases and Data Modelling,
              Econometrics,
              Object Oriented Programming,
              Intermediate Data Programming,
              Core Methods in Data Science
            </p>
          </div>
        </section>

        <section id="experience" className="scroll-mt-28">
          <h2 id="experience-subheading" className={sectionHeadingClass}>
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

        <section id="skills" className="scroll-mt-28">
          <h2 id="skills-subheading" className={sectionHeadingClass}>
            Skills
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--foreground)]">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "SQL(Postgres)", "JavaScript", "HTML", "CSS", "R", "React", "Node.js"].map((lang) => (
                  <span
                    key={lang}
                    className="rounded-md bg-[var(--tag-bg)] px-3 py-1 font-mono text-sm text-[var(--tag-text)]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--foreground)]">Tools &amp; Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Google Cloud Platform(GCP)", "Homebrew", "Firebase", "RStudio", "Docker", "bash", "AWS"].map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-[var(--tag-bg)] px-3 py-1 font-mono text-sm text-[var(--tag-text)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex md:col-span-full md:justify-center">
              <div>
                <h3 className="mb-3 text-left text-sm font-bold uppercase tracking-wide text-[var(--foreground)] md:text-center">
                  Libraries
                </h3>
                <div className="grid grid-cols-2 justify-items-start gap-2 sm:grid-cols-3 md:grid-cols-4 md:justify-items-center">
                  {["Pandas", "NumPy", "Matplotlib", "Seaborn", "Geopandas", "TensorFlow", "SciKitLearn", "Tidyverse"].map((lib) => (
                    <span
                      key={lib}
                      className="rounded-md bg-[var(--tag-bg)] px-3 py-1 font-mono text-sm text-[var(--tag-text)]"
                    >
                      {lib}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects-data" className="scroll-mt-28">
          <p className={sectionEyebrowClass}>
            Selected work
          </p>
          <h2 id="sprojects-subheading" className={sectionHeadingClass}>
            Data Projects
          </h2>

          <ProjectList projects={portfolioData.dataProjects} />
        </section>

        <section id="projects-swe" className="scroll-mt-28">
          <p className={sectionEyebrowClass}>
            Engineering work
          </p>
          <h2 id="swe-projects-subheading" className={sectionHeadingClass}>
            Software Engineering Projects
          </h2>

          <ProjectList projects={portfolioData.sweProjects} />
        </section>

        <section id="resume" className="scroll-mt-28">
          <h2 id="resume-subheading" className={sectionHeadingClass}>
            Resume
          </h2>
          <h3 className="mb-8 text-center text-lg font-semibold text-[var(--foreground)]">
            Download my resume below!
          </h3>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
            <a
              href="/Navneeth_Dhamotharan_Resume.pdf"
              target="_blank"
              className="resume-link rounded-md px-6 py-3 text-center font-mono text-base sm:text-lg"
            >
              Software Engineering Resume
            </a>
            <a
              href="/Dhamotharan_Navneeth_Resume.pdf"
              target="_blank"
              className="resume-link rounded-md px-6 py-3 text-center font-mono text-base sm:text-lg"
            >
              Data Science Resume
            </a>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
