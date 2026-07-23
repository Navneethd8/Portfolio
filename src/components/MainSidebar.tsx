"use client";

import React from 'react';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import TypewriterText from "./TypewriterText";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MainSidebar: React.FC = () => {
    const pathname = usePathname();
    const isNotesPage = pathname.startsWith('/notes');

    const navLinks = [
        { name: 'About', href: '/#about' },
        { name: 'Education', href: '/#education' },
        { name: 'Experience', href: '/#experience' },
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

    return (
        <div className="flex h-full min-h-0 min-w-0 w-full flex-col">
            <div className="mb-6 min-w-0 shrink-0 pt-1 text-center sm:mb-8 sm:pt-2 lg:mb-4 lg:pt-0 lg:text-left">
                <h1 className="mb-2 hidden text-2xl font-semibold text-[var(--background)] lg:block">Navneeth Dhamotharan</h1>
                <p className="mx-auto max-w-full min-w-0 text-lg font-medium text-[var(--background)] sm:text-xl lg:mx-0 lg:text-lg">
                    <TypewriterText />
                </p>
            </div>

            {/*
              max-lg: one scroll column (nav + contact) so the drawer isn’t “half scroll / half stuck”.
              lg+: the full navigation stays visible without its own nested scroll area.
            */}
            <div className="custom-scrollbar flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain pr-1 lg:overflow-hidden">
                <nav className="flex shrink-0 flex-col gap-4 text-center sm:gap-5 lg:flex-1 lg:gap-2 lg:text-left">
                    {isNotesPage && (
                        <Link
                            href="/"
                            className="px-3 py-2 text-lg text-[var(--sidebar-link)] transition-colors hover:text-[var(--link-hover)] sm:px-4 sm:text-xl lg:py-1 lg:text-xl"
                        >
                            Home
                        </Link>
                    )}

                    {!isNotesPage && navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-3 py-2 text-lg text-[var(--sidebar-link)] transition-colors hover:text-[var(--link-hover)] sm:px-4 sm:text-xl lg:py-1 lg:text-xl"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        href="/notes"
                        className={`px-3 py-2 text-lg transition-all sm:px-4 sm:text-xl lg:py-1 lg:text-xl ${isNotesPage
                            ? 'font-medium text-[var(--link-hover)]'
                            : 'text-[var(--sidebar-link)] hover:text-[var(--link-hover)]'
                            }`}
                    >
                        Notes
                    </Link>
                </nav>

                <div className="mt-6 flex w-full shrink-0 flex-col border-t border-[var(--background)]/15 pt-6 sm:mt-8 sm:pt-8 lg:mt-4 lg:border-t-0 lg:pt-6">
                    <h3 className="mb-4 text-center text-lg font-medium text-[var(--background)] lg:text-left">
                        Get In Touch
                    </h3>
                    <nav
                        aria-label="Contact and social links"
                        className="flex flex-col gap-2 text-center lg:text-left"
                    >
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.href.startsWith('http') ? "_blank" : undefined}
                                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="flex flex-row items-center justify-center gap-2 px-4 py-1.5 text-base text-[var(--background)] opacity-90 transition-[color,opacity] hover:text-[var(--link-hover)] hover:opacity-100 lg:justify-start lg:px-0"
                            >
                                <span className="flex shrink-0 items-center text-[1.125rem] [&>svg]:block" aria-hidden>
                                    {link.icon}
                                </span>
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="mt-4 w-full">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSidebar;
