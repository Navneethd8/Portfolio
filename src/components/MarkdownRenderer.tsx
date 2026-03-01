"use client";

import React from 'react';

interface MarkdownRendererProps {
    html: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ html }) => {
    return (
        <div
            className="prose prose-slate dark:prose-invert max-w-none 
                prose-headings:font-semibold prose-headings:tracking-tight 
                prose-h1:text-4xl prose-h1:mb-8 prose-h1:border-b prose-h1:pb-4
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-2
                prose-p:text-lg prose-p:leading-relaxed prose-p:text-[var(--paragraph)]
                prose-li:text-lg prose-li:text-[var(--paragraph)]
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-xl prose-pre:shadow-lg
                prose-img:rounded-xl prose-img:shadow-md
                prose-a:text-[var(--link)] prose-a:no-underline hover:prose-a:underline
                "
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default MarkdownRenderer;
