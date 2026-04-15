export interface Experience {
    role: string;
    company: string;
    location: string;
    date: string;
    logoSrc: string;
    summary: string;
    bullets?: string[];
    github?: string;
    link?: string;
}

export interface Project {
    title: string;
    date: string;
    tags: string[];
    summary: string;
    link?: string;
    github?: string;
}

export interface About {
    description: string;
    resumeUrl: string;
}

export interface PortfolioData {
    about: About;
    experience: Experience[];
    dataProjects: Project[];
    sweProjects: Project[];
}
