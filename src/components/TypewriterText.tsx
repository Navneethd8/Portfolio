"use client";

import React, { useState, useEffect, memo } from "react";

const defaultTitles = [
    "Software Engineer",
    "Data Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
];

const TypewriterText = memo(({ titles = defaultTitles }: { titles?: string[] }) => {
    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentTitle = titles[titleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (charIndex < currentTitle.length) {
                    setCharIndex(charIndex + 1);
                } else {
                    // Pause at end before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (charIndex > 0) {
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTitleIndex((titleIndex + 1) % titles.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, titleIndex, titles]);

    const displayText = titles[titleIndex].slice(0, charIndex);

    return (
        <span className="inline-block max-w-full min-w-0 align-middle">
            {displayText}
            <span className="ml-0.5 inline-block animate-pulse border-r-2 border-[var(--background)]">&nbsp;</span>
        </span>
    );
});

TypewriterText.displayName = "TypewriterText";
export default TypewriterText;
