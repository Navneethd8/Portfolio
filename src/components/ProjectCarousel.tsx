"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Convert children to an array so we can clone and add unique keys for each duplicated set
    const childrenArray = React.Children.toArray(children);

    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollAmount = direction === "left" ? -400 : 400;

            if (direction === "right" && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                container.scrollTo({ left: 0, behavior: "smooth" });
            } else if (direction === "left" && container.scrollLeft <= 10) {
                container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        if (isHovered) return;

        let animationFrameId: number;

        const animateScroll = () => {
            if (containerRef.current) {
                const container = containerRef.current;

                const firstChild = container.firstElementChild as HTMLElement;
                if (firstChild) {
                    // 24px is for gap-6 between the repeating blocks
                    if (container.scrollLeft >= firstChild.offsetWidth + 24) {
                        container.scrollLeft -= (firstChild.offsetWidth + 24);
                    } else {
                        container.scrollLeft += 1; // Speed of continuous scroll
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animateScroll);
        };

        animationFrameId = requestAnimationFrame(animateScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    return (
        <div
            className="relative group w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Scroll Left Button */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-[var(--foreground)] text-[var(--background)] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg focus:outline-none hidden md:block"
                aria-label="Scroll left"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-6 pb-8 pt-2 hide-scrollbar w-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {/* Render children 4 times to ensure overflow on huge screens, with unique keys for React DevTools */}
                <div className="flex gap-6 shrink-0">
                    {childrenArray.map((child, i) => React.isValidElement(child) ? React.cloneElement(child, { key: `set1-${i}` } as React.Attributes) : child)}
                </div>
                <div className="flex gap-6 shrink-0">
                    {childrenArray.map((child, i) => React.isValidElement(child) ? React.cloneElement(child, { key: `set2-${i}` } as React.Attributes) : child)}
                </div>
                <div className="flex gap-6 shrink-0">
                    {childrenArray.map((child, i) => React.isValidElement(child) ? React.cloneElement(child, { key: `set3-${i}` } as React.Attributes) : child)}
                </div>
                <div className="flex gap-6 shrink-0">
                    {childrenArray.map((child, i) => React.isValidElement(child) ? React.cloneElement(child, { key: `set4-${i}` } as React.Attributes) : child)}
                </div>
            </div>

            {/* Scroll Right Button */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-[var(--foreground)] text-[var(--background)] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg focus:outline-none hidden md:block"
                aria-label="Scroll right"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Internal CSS for hiding scrollbar in webkit browsers */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
        </div>
    );
}
