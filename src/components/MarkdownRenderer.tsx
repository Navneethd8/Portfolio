"use client";

import React from 'react';

interface MarkdownRendererProps {
    html: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ html }) => {
    return (
        <div
            className="prose prose-invert max-w-none min-w-0
                prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-100
                prose-h1:text-4xl prose-h1:mb-8 prose-h1:border-b prose-h1:pb-4 prose-h1:border-white/10
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-2
                prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-300
                prose-li:text-lg prose-li:text-gray-300 marker:text-green-500
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-code:border prose-code:border-white/10 prose-code:bg-white/[0.06] prose-code:text-slate-200
                prose-pre:border prose-pre:border-[#333] prose-pre:bg-[#121212] prose-pre:text-slate-200
                prose-pre:rounded-xl prose-pre:p-4 prose-pre:shadow-lg
                prose-img:rounded-xl prose-img:shadow-md
                prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-200
                "
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default MarkdownRenderer;
