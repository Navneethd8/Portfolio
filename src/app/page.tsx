import SiteLayout from "@/components/siteLayout";
import { FaGithub } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import ExperienceTimeline, { ExperienceTimelineItem } from "@/components/ExperienceTimeline";
import ProjectList from "@/components/ProjectList";
import { portfolioData } from "@/data/portfolio";
import type { AboutParagraph } from "@/types/portfolio";
import Image from "next/image";

const sectionHeadingClass =
  "relative mb-6 text-2xl font-bold tracking-tight text-[var(--foreground)] after:mt-2.5 after:block after:h-0.5 after:w-14 after:bg-[var(--foreground)] after:content-['']";

const sectionEyebrowClass =
  "mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--paragraph)]";

const proseStackClass =
  "space-y-4 text-base leading-relaxed text-[var(--paragraph)] max-w-prose";

function AboutParagraphBlock({ paragraph }: { paragraph: AboutParagraph }) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }
  return (
    <p>
      {paragraph.segments.map((s, i) =>
        s.link ? (
          <a key={i} href={s.link} className="text-[var(--link)]">
            {s.text}
          </a>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </p>
  );
}

export default function Home() {
  const { headings, about, education, skills, resumes, resumeDownloadMessage } = portfolioData;
  const imgW = about.image.width ?? 160;
  const imgH = about.image.height ?? 160;

  return (
    <SiteLayout>
      <div className="flex flex-col gap-16 pb-10 sm:gap-20 sm:pb-14">
        <section id="about" className="scroll-mt-28">
          <h2 id="about-subheading" className={sectionHeadingClass}>
            {headings.about}
          </h2>
          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              width={imgW}
              height={imgH}
              className="mx-auto h-40 w-40 flex-shrink-0 rounded-lg object-cover md:mx-0"
            />

            <div className="min-w-0 flex-1">
              <h3 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
                {about.greeting}
              </h3>
              <div className={proseStackClass}>
                {about.paragraphs.map((p, i) => (
                  <AboutParagraphBlock key={i} paragraph={p} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="scroll-mt-28">
          <h2 id="education-subheading" className={sectionHeadingClass}>
            {headings.education}
          </h2>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              {education.institution}
            </h3>
            <div className="flex flex-col gap-1 text-base text-[var(--paragraph)] sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
              <span>{education.degree}</span>
              <span className="shrink-0 text-sm italic sm:text-base">{education.graduation}</span>
            </div>
            <p className="max-w-prose pt-1 text-base leading-relaxed text-[var(--paragraph)]">
              <span className="font-semibold text-[var(--foreground)]">{education.courseworkHeading}</span>{" "}
              {education.coursework.join(", ")}
            </p>
          </div>
        </section>

        <section id="experience" className="scroll-mt-28">
          <h2 id="experience-subheading" className={sectionHeadingClass}>
            {headings.experience}
          </h2>

          <ExperienceTimeline>
            {portfolioData.experience.map((exp, idx) => (
              <ExperienceTimelineItem
                key={`${exp.company}-${exp.role}-${exp.date}`}
                role={exp.role}
                company={exp.company}
                location={exp.location}
                date={exp.date}
                logoSrc={exp.logoSrc}
                summary={exp.summary}
                bullets={exp.bullets}
                isLast={idx === portfolioData.experience.length - 1}
                links={
                  exp.github || exp.link ? (
                    <>
                      {exp.github ? (
                        <a
                          className="flex items-center gap-1 hover:text-[var(--link-hover)]"
                          href={exp.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${exp.company} GitHub`}
                        >
                          <FaGithub />
                        </a>
                      ) : null}
                      {exp.link ? (
                        <a
                          className="flex items-center gap-1 hover:text-[var(--link-hover)]"
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${exp.company} Website`}
                        >
                          <CgWebsite />
                        </a>
                      ) : null}
                    </>
                  ) : undefined
                }
              />
            ))}
          </ExperienceTimeline>
        </section>

        <section id="skills" className="scroll-mt-28">
          <h2 id="skills-subheading" className={sectionHeadingClass}>
            {headings.skills}
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--foreground)]">
                {skills.groupLabels.languages}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang) => (
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
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--foreground)]">
                {skills.groupLabels.tools}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool) => (
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
                  {skills.groupLabels.libraries}
                </h3>
                <div className="grid grid-cols-2 justify-items-start gap-2 sm:grid-cols-3 md:grid-cols-4 md:justify-items-center">
                  {skills.libraries.map((lib) => (
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
          <p className={sectionEyebrowClass}>{headings.dataProjectsEyebrow}</p>
          <h2 id="sprojects-subheading" className={sectionHeadingClass}>
            {headings.dataProjects}
          </h2>

          <ProjectList projects={portfolioData.dataProjects} />
        </section>

        <section id="projects-swe" className="scroll-mt-28">
          <p className={sectionEyebrowClass}>{headings.sweProjectsEyebrow}</p>
          <h2 id="swe-projects-subheading" className={sectionHeadingClass}>
            {headings.sweProjects}
          </h2>

          <ProjectList projects={portfolioData.sweProjects} />
        </section>

        <section id="resume" className="scroll-mt-28">
          <h2 id="resume-subheading" className={sectionHeadingClass}>
            {headings.resume}
          </h2>
          <h3 className="mb-8 text-center text-lg font-semibold text-[var(--foreground)]">
            {resumeDownloadMessage}
          </h3>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
            {resumes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link rounded-md px-6 py-3 text-center font-mono text-base sm:text-lg"
              >
                {r.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
