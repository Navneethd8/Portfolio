"use client";

import { memo, useEffect, useState } from "react";

const defaultTitles = [
  "Software Engineer",
  "Data Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
];

type Phase = "typing" | "holding" | "deleting";

const TypewriterText = memo(
  ({ titles = defaultTitles }: { titles?: string[] }) => {
    const [titleIndex, setTitleIndex] = useState(0);
    const [characterCount, setCharacterCount] = useState(titles[0].length);
    const [phase, setPhase] = useState<Phase>("holding");

    useEffect(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const currentTitle = titles[titleIndex];
      const delay =
        phase === "holding" ? 1800 : phase === "deleting" ? 45 : 85;

      const timeout = window.setTimeout(() => {
        if (phase === "typing") {
          if (characterCount < currentTitle.length) {
            setCharacterCount((count) => count + 1);
          } else {
            setPhase("holding");
          }
          return;
        }

        if (phase === "holding") {
          setPhase("deleting");
          return;
        }

        if (characterCount > 0) {
          setCharacterCount((count) => count - 1);
        } else {
          setTitleIndex((index) => (index + 1) % titles.length);
          setPhase("typing");
        }
      }, delay);

      return () => window.clearTimeout(timeout);
    }, [characterCount, phase, titleIndex, titles]);

    const displayText = titles[titleIndex].slice(0, characterCount);

    return (
      <>
        <span className="sr-only">{titles.join(", ")}</span>
        <span aria-hidden className="inline-flex min-h-[1.5em] max-w-full items-center">
          {displayText}
          <span className="ml-1 h-[1.05em] border-r-2 border-current motion-safe:animate-pulse" />
        </span>
      </>
    );
  },
);

TypewriterText.displayName = "TypewriterText";

export default TypewriterText;
