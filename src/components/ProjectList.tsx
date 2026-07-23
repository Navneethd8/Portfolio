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
        const displayTags = project.tags.slice(0, 5);
        const extra = project.tags.length > 5 ? project.tags.length - 5 : 0;
        const hasLinks = Boolean(project.link || project.github || project.docs);

        return (
          <li
            key={project.title}
            className="project-row border-b border-[var(--border)] py-6 first:border-t first:border-[var(--border)]"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(9rem,0.75fr)_minmax(0,2fr)] md:gap-8">
              <div className="min-w-0">
                <h3 className="text-[1.05rem] font-semibold text-[var(--foreground)]">{project.title}</h3>
                <p className="mt-0.5 text-sm text-[var(--paragraph)]/70">{project.date}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[0.95rem] leading-relaxed text-[var(--paragraph)]">{project.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {displayTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--card-bg)]/45 px-2.5 py-0.5 font-mono text-[0.72rem] text-[var(--paragraph)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {extra > 0 && (
                    <span className="text-xs opacity-60">+{extra}</span>
                  )}
                  {hasLinks && (
                    <span className="ml-auto flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--foreground)]">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex items-center gap-1.5 hover:text-[var(--link-hover)]"
                          aria-label={`${project.title} website`}
                        >
                          <CgWebsite aria-hidden /> Live
                        </a>
                      ) : null}
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex items-center gap-1.5 hover:text-[var(--link-hover)]"
                          aria-label={`${project.title} GitHub`}
                        >
                          <FaGithub aria-hidden /> Code
                        </a>
                      ) : null}
                      {project.docs ? (
                        <a
                          href={project.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex items-center gap-1.5 hover:text-[var(--link-hover)]"
                          aria-label={`${project.title} write-up`}
                        >
                          <FaBookOpen aria-hidden /> Write-up
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
