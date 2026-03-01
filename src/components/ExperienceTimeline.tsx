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
    links?: React.ReactNode;
    isLast?: boolean;
}

export function ExperienceTimelineItem({
    role,
    company,
    date,
    logoSrc,
    summary,
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
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-base font-medium opacity-90">{company}</span>
                            {links && (
                                <div className="flex items-center gap-2 text-base">
                                    {links}
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="text-sm font-medium opacity-60 whitespace-nowrap pt-1">{date}</span>
                </div>
                <p className="text-base italic opacity-70 mt-1.5 line-clamp-2">{summary}</p>
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
