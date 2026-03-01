"use client";

import React from "react";

interface ProjectProps {
    title: string;
    date: string;
    tags: string[];
    summary: string;
    links?: React.ReactNode;
}

export function ProjectCard({
    title,
    date,
    tags,
    summary,
    links,
}: ProjectProps) {
    const displayTags = tags.slice(0, 3);

    return (
        <div className="project-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] rounded-xl p-6 flex flex-col justify-between border border-[var(--card-bg)] bg-[var(--card-bg)] hover:border-[var(--link-hover)] transition-colors min-h-[250px] h-full">
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 gap-2">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-[var(--foreground)]">{title}</h3>
                        <div className="text-sm font-medium opacity-80 mt-1">{date}</div>
                    </div>
                    {links && (
                        <div className="flex items-center gap-3 text-xl text-[var(--foreground)] pt-1">
                            {links}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {displayTags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-[var(--tag-bg)] text-[var(--tag-text)] px-2 py-1 rounded-md text-xs font-mono"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="text-[var(--h4)] text-xs flex items-center">+{tags.length - 3}</span>
                    )}
                </div>

                <p className="text-[var(--h4)] pb-4 text-base italic flex-grow line-clamp-3">
                    {summary}
                </p>

            </div>
        </div>
    );
}

interface ProjectCarouselProps {
    children: React.ReactNode;
}

export default function ProjectCarousel({ children }: ProjectCarouselProps) {
    const childrenArray = React.Children.toArray(children);

    return (
        <div className="relative overflow-hidden w-full py-4">
            <div
                className="flex w-max animate-infinite-scroll pause-on-hover"
                style={{ willChange: 'transform' }}
            >
                {/* First set of items */}
                <div className="flex gap-6 pr-6">
                    {childrenArray.map((child, i) => (
                        <React.Fragment key={`set1-${i}`}>
                            {child}
                        </React.Fragment>
                    ))}
                </div>
                {/* Second set of items for seamless looping */}
                <div className="flex gap-6 pr-6" aria-hidden="true">
                    {childrenArray.map((child, i) => (
                        <React.Fragment key={`set2-${i}`}>
                            {child}
                        </React.Fragment>
                    ))}
                </div>
                {/* Third set to ensure coverage on ultra-wide screens if needed */}
                <div className="flex gap-6 pr-6" aria-hidden="true">
                    {childrenArray.map((child, i) => (
                        <React.Fragment key={`set3-${i}`}>
                            {child}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
