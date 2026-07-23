"use client";

import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import TypewriterText from "./TypewriterText";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Education', href: '/#education' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Leadership', href: '/#leadership' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Resume', href: '/#resume' },
];

const socialLinks = [
    { name: 'nd17@uw.edu', href: 'mailto:nd17@uw.edu', icon: <MdEmail /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/navneethd', icon: <FaLinkedin /> },
    { name: 'GitHub', href: 'https://github.com/navneethd8', icon: <FaGithub /> },
    { name: 'Twitter / X', href: 'https://x.com/NavneethDG', icon: <FaXTwitter /> },
];

const MainSidebar: React.FC = () => {
    const pathname = usePathname();
    const isNotesPage = pathname.startsWith('/notes');
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        if (isNotesPage) return () => {};

        const sections = navLinks
            .map((link) => document.getElementById(link.href.split('#')[1]))
            .filter((section): section is HTMLElement => Boolean(section));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible[0]) setActiveSection(visible[0].target.id);
            },
            { rootMargin: '-18% 0px -68% 0px' },
        );

        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
            observer.disconnect();
        };
    }, [isNotesPage]);

    return (
        <div className="flex h-full min-h-0 min-w-0 w-full flex-col">
            <div className="mb-6 min-w-0 shrink-0 pt-1 text-center sm:mb-8 sm:pt-2 lg:mb-4 lg:pt-0 lg:text-left">
                <h1 className="mb-2 hidden text-2xl font-semibold text-[var(--sidebar-text)] lg:block">Navneeth Dhamotharan</h1>
                <p className="mx-auto max-w-full min-w-0 text-base font-medium leading-snug text-[var(--sidebar-muted)] lg:mx-0">
                    <TypewriterText />
                </p>
            </div>

            {/*
              max-lg: one scroll column (nav + contact) so the drawer isn’t “half scroll / half stuck”.
              lg+: the full navigation stays visible without its own nested scroll area.
            */}
            <div className="custom-scrollbar flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain pr-1 lg:overflow-hidden">
                <nav
                    aria-label="Primary navigation"
                    className="flex shrink-0 flex-col gap-4 text-center sm:gap-5 lg:flex-1 lg:gap-1 lg:text-left"
                >
                    {isNotesPage && (
                        <Link
                            href="/"
                            className="rounded-sm border-l-2 border-transparent px-3 py-2 text-lg text-[var(--sidebar-link)] transition-colors hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)] sm:px-4 sm:text-xl lg:py-1.5 lg:text-[1.05rem]"
                        >
                            Home
                        </Link>
                    )}

                    {!isNotesPage && navLinks.map((link) => {
                        const sectionId = link.href.split('#')[1];
                        const isActive = activeSection === sectionId;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                aria-current={isActive ? 'location' : undefined}
                                className={`rounded-sm border-l-2 px-3 py-2 text-lg transition-[color,background-color,border-color] sm:px-4 sm:text-xl lg:py-1.5 lg:text-[1.05rem] ${
                                    isActive
                                        ? 'border-[var(--accent)] bg-[var(--sidebar-active)] font-medium text-[var(--sidebar-text)]'
                                        : 'border-transparent text-[var(--sidebar-link)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <Link
                        href="/notes"
                        className={`rounded-sm border-l-2 px-3 py-2 text-lg transition-[color,background-color,border-color] sm:px-4 sm:text-xl lg:py-1.5 lg:text-[1.05rem] ${isNotesPage
                            ? 'border-[var(--accent)] bg-[var(--sidebar-active)] font-medium text-[var(--sidebar-text)]'
                            : 'border-transparent text-[var(--sidebar-link)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]'
                            }`}
                    >
                        Notes
                    </Link>
                </nav>

                <div className="mt-6 flex w-full shrink-0 flex-col border-t border-[var(--sidebar-border)] pt-6 sm:mt-8 sm:pt-8 lg:mt-3 lg:border-t-0 lg:pt-3">
                    <h3 className="mb-4 text-center text-lg font-medium text-[var(--sidebar-text)] lg:mb-2 lg:text-left lg:text-sm lg:uppercase lg:tracking-wider lg:text-[var(--sidebar-muted)]">
                        Get In Touch
                    </h3>
                    <nav
                        aria-label="Contact and social links"
                        className="flex flex-col gap-2 text-center lg:flex-row lg:gap-1 lg:text-left"
                    >
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.href.startsWith('http') ? "_blank" : undefined}
                                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="flex flex-row items-center justify-center gap-2 px-4 py-1.5 text-base text-[var(--sidebar-muted)] transition-[color,background-color] hover:text-[var(--sidebar-text)] lg:h-10 lg:w-10 lg:rounded-sm lg:px-0 lg:hover:bg-[var(--sidebar-hover)]"
                                title={link.name}
                            >
                                <span className="flex shrink-0 items-center text-[1.125rem] [&>svg]:block" aria-hidden>
                                    {link.icon}
                                </span>
                                <span className="lg:sr-only">{link.name}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="mt-4 w-full lg:mt-2">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSidebar;
