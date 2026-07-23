import { FaGithub } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export type ProjectItem = {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  link?: string;
  github?: string;
  docs?: string;
};

interface ProjectListProps {
  projects: ProjectItem[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className="project-list flex list-none flex-col p-0" role="list">
      {projects.map((project) => {
        const displayTags = project.tags.slice(0, 3);
        const extra = project.tags.length > 3 ? project.tags.length - 3 : 0;
        const hasLinks = Boolean(project.link || project.github || project.docs);

        return (
          <li
            key={project.title}
            className="project-row border-b border-[var(--border)] py-6 first:border-t first:border-[var(--border)] motion-safe:transition-[padding] motion-safe:hover:pl-2"
            role="listitem"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] md:items-center md:gap-5">
              <div className="min-w-0">
                <h3 className="text-[1.05rem] font-semibold text-[var(--foreground)]">{project.title}</h3>
                <p className="mt-0.5 text-sm opacity-70 md:hidden">{project.date}</p>
              </div>
              <p className="min-w-0 text-[0.9rem] leading-relaxed text-[var(--paragraph)]">{project.summary}</p>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <span className="hidden text-sm opacity-60 md:inline">{project.date}</span>
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  {displayTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] px-2.5 py-0.5 font-mono text-[0.75rem] text-[var(--paragraph)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {extra > 0 && (
                    <span className="text-xs opacity-60">+{extra}</span>
                  )}
                  {hasLinks && (
                    <span className="ml-1 flex items-center gap-2 text-lg text-[var(--foreground)]">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline hover:text-[var(--link-hover)]"
                          aria-label={`${project.title} website`}
                        >
                          <CgWebsite />
                        </a>
                      ) : null}
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline hover:text-[var(--link-hover)]"
                          aria-label={`${project.title} GitHub`}
                        >
                          <FaGithub />
                        </a>
                      ) : null}
                      {project.docs ? (
                        <a
                          href={project.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline hover:text-[var(--link-hover)]"
                          aria-label={`${project.title} write-up`}
                        >
                          <FaBookOpen />
                        </a>
                      ) : null}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
