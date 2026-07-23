import type { ProjectItem } from "@/components/ProjectList";

/** One inline piece of about copy; optional `link` wraps text in an anchor */
export type AboutSegment = {
  text: string;
  link?: string;
};

/** Rich paragraph built from segments (plain text and optional links) */
export type AboutRichParagraph = {
  segments: AboutSegment[];
};

export type AboutParagraph = string | AboutRichParagraph;

export type PortfolioAbout = {
  greeting: string;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  paragraphs: AboutParagraph[];
};

export type PortfolioEducation = {
  institution: string;
  degree: string;
  graduation: string;
};

export type PortfolioSkills = {
  groupLabels: {
    languages: string;
    tools: string;
    libraries: string;
  };
  languages: string[];
  tools: string[];
  libraries: string[];
};

export type PortfolioResumeLink = {
  label: string;
  href: string;
};

/** Section titles and short labels (home page) */
export type PortfolioHeadings = {
  about: string;
  education: string;
  experience: string;
  clubsLeadership: string;
  skills: string;
  projects: string;
  resume: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  date: string;
  logoSrc?: string;
  summary: string;
  github?: string;
  link?: string;
  bullets?: string[];
};

export type PortfolioData = {
  headings: PortfolioHeadings;
  about: PortfolioAbout;
  education: PortfolioEducation;
  skills: PortfolioSkills;
  resumes: PortfolioResumeLink[];
  /** Line shown above the resume download buttons */
  resumeDownloadMessage: string;
  experience: ExperienceEntry[];
  leadership: ExperienceEntry[];
  projects: ProjectItem[];
};
