"use client";

import React from 'react';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { CgWebsite } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import TypewriterText from "./TypewriterText";
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
        <div className="flex flex-col h-full w-full">
            <div className="flex-shrink-0 mb-8 lg:mb-4 text-center lg:text-left pt-4 lg:pt-0">
                <h1 className="hidden lg:block text-2xl font-semibold mb-2 text-[var(--background)]">Navneeth Dhamotharan</h1>
                <p className="text-[var(--background)] text-xl lg:text-lg font-medium">
                    <TypewriterText />
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <nav className="flex flex-col gap-6 lg:gap-2 text-center lg:text-left lg:pr-2 lg:flex-grow">
                    {isNotesPage && (
                        <Link
                            href="/"
                            className="px-4 py-2 lg:py-1 text-2xl lg:text-xl text-[var(--sidebar-link)] hover:text-[var(--link-hover)] transition-colors"
                        >
                            Home
                        </Link>
                    )}

                    {!isNotesPage && navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-4 py-2 lg:py-1 text-2xl lg:text-xl text-[var(--sidebar-link)] hover:text-[var(--link-hover)] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        href="/notes"
                        className={`px-4 py-2 lg:py-1 text-2xl lg:text-xl transition-all ${isNotesPage
                            ? 'text-[var(--link-hover)] font-medium'
                            : 'text-[var(--sidebar-link)] hover:text-[var(--link-hover)]'
                            }`}
                    >
                        Notes
                    </Link>
                </nav>

                <div className="mt-8 lg:mt-0 text-center lg:text-left">
                    <p className="text-[var(--background)] text-2xl lg:text-xl font-medium">Get In Touch</p>
                </div>
                <nav className="flex flex-col gap-6 lg:gap-2 items-center lg:items-start lg:pr-2 lg:flex-grow">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target={link.href.startsWith('http') ? "_blank" : undefined}
                            rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            className="px-4 py-2 lg:py-1 text-2xl lg:text-xl flex flex-row items-center gap-4 lg:gap-2 text-[var(--background)] hover:text-[var(--link-hover)] transition-colors"
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MainSidebar;
