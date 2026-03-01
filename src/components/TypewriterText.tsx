"use client";

import React, { useState, useEffect } from "react";

const defaultTitles = [
    "Software Engineer",
    "Data Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
];

export default function TypewriterText({ titles = defaultTitles }: { titles?: string[] }) {
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
                    setTimeout(() => setIsDeleting(true), 1500);
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
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, titleIndex, titles]);

    const displayText = titles[titleIndex].slice(0, charIndex);

    return (
        <span>
            Aspiring {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
}
