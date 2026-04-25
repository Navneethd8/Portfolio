"use client";

import React from "react";
import Image from "next/image";

interface ExperienceTimelineItemProps {
    role: string;
    company: string;
    location?: string;
    date: string;
    logoSrc: string;
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
            <div className="relative z-10 flex-shrink-0">
                <Image
                    src={logoSrc}
                    alt={`${company} Logo`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
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
                    <span className="text-sm font-medium opacity-60 whitespace-nowrap pt-1">{date}</span>
                </div>
                <p className="text-base italic opacity-70 mt-1.5">{summary}</p>
                {bullets && bullets.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--paragraph)]">
                        {bullets.map((b, i) => (
                            <li key={i}>{b}</li>
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
