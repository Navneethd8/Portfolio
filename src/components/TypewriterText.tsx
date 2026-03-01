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
        <span className="inline-block min-w-[200px]">
            {displayText}
            <span className="animate-pulse border-r-2 border-[var(--background)] ml-1">&nbsp;</span>
        </span>
    );
});

TypewriterText.displayName = "TypewriterText";
export default TypewriterText;
