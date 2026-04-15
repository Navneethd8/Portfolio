"use client";

import React from 'react';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { CgWebsite } from "react-icons/cg";
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
        { name: 'Skills', href: '/#skills' },
        { name: 'Data Projects', href: '/#projects-data' },
        { name: 'SWE Projects', href: '/#projects-swe' },
        { name: 'Resume', href: '/#resume' },
    ];

    const socialLinks = [
        { name: 'nd17@uw.edu', href: 'mailto:nd17@uw.edu', icon: <MdEmail /> },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/navneethd', icon: <FaLinkedin /> },
        { name: 'GitHub', href: 'https://github.com/navneethd8', icon: <FaGithub /> },
        { name: 'Website', href: 'https://navneethd.me', icon: <CgWebsite /> },
        { name: 'Twitter / X', href: 'https://x.com/NavneethDG', icon: <FaXTwitter /> },
    ];

    return (
        <div className="flex h-full w-full flex-col">
            <div className="mb-8 shrink-0 pt-4 text-center lg:mb-4 lg:pt-0 lg:text-left">
                <h1 className="mb-2 hidden text-2xl font-semibold text-[var(--background)] lg:block">Navneeth Dhamotharan</h1>
                <p className="text-xl font-medium text-[var(--background)] lg:text-lg">
                    <TypewriterText />
                </p>
            </div>

            <nav className="flex min-h-0 flex-1 flex-col gap-6 text-center lg:gap-2 lg:pr-2 lg:text-left">
                {isNotesPage && (
                    <Link
                        href="/"
                        className="px-4 py-2 text-2xl text-[var(--sidebar-link)] transition-colors hover:text-[var(--link-hover)] lg:py-1 lg:text-xl"
                    >
                        Home
                    </Link>
                )}

                {!isNotesPage && navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="px-4 py-2 text-2xl text-[var(--sidebar-link)] transition-colors hover:text-[var(--link-hover)] lg:py-1 lg:text-xl"
                    >
                        {link.name}
                    </Link>
                ))}

                <Link
                    href="/notes"
                    className={`px-4 py-2 text-2xl transition-all lg:py-1 lg:text-xl ${isNotesPage
                        ? 'font-medium text-[var(--link-hover)]'
                        : 'text-[var(--sidebar-link)] hover:text-[var(--link-hover)]'
                        }`}
                >
                    Notes
                </Link>
            </nav>

            <div className="mt-10 flex w-full flex-col pt-2 lg:mt-auto lg:pt-10">
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
    );
};

export default MainSidebar;
