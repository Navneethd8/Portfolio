"use client";

import React from "react";
import Image from "next/image";

interface ExperienceTimelineItemProps {
    role: string;
    company: string;
    location?: string;
    date: string;
    logoSrc?: string;
    summary: string;
    bullets?: string[];
    links?: React.ReactNode;
    isLast?: boolean;
}

export function ExperienceTimelineItem({
    role,
    company,
    location,
    date,
    logoSrc,
    summary,
    bullets,
    links,
    isLast = false,
}: ExperienceTimelineItemProps) {
    return (
        <div className="relative flex gap-4 pb-8 last:pb-0">
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-[23px] top-[48px] bottom-0 w-[2px] bg-[var(--card-bg)]" />
            )}

            {/* Logo / dot */}
            <div className="relative z-10 shrink-0">
                {logoSrc ? (
                    <Image
                        src={logoSrc}
                        alt={`${company} Logo`}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-xl border border-[var(--border)] bg-white object-contain p-1"
                    />
                ) : (
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--card-bg)] text-sm font-bold text-[var(--foreground)]"
                        aria-hidden
                    >
                        {company
                            .split(/\s+/)
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[var(--foreground)] leading-tight">{role}</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                            <span className="text-base font-medium opacity-90">{company}</span>
                            {location ? (
                                <span className="text-sm opacity-70">{location}</span>
                            ) : null}
                            {links ? (
                                <div className="flex items-center gap-2 text-base">
                                    {links}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <span className="whitespace-nowrap text-sm font-medium opacity-60 sm:pt-1">{date}</span>
                </div>
                <p className="mt-1.5 max-w-3xl text-[0.95rem] leading-relaxed text-[var(--paragraph)]">{summary}</p>
                {bullets && bullets.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--paragraph)]">
                        {bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </div>
    );
}

interface ExperienceTimelineProps {
    children: React.ReactNode;
}

export default function ExperienceTimeline({ children }: ExperienceTimelineProps) {
    return (
        <div className="relative">
            {children}
        </div>
    );
}
