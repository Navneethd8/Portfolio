"use client";

import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface ExperienceProps {
    role: string;
    company: string;
    location?: string;
    date: string;
    logoSrc: string;
    links?: React.ReactNode;
    children: React.ReactNode;
}

export default function ExperienceAccordion({
    role,
    company,
    location,
    date,
    logoSrc,
    links,
    children,
}: ExperienceProps) {
    return (
        <div className="mb-6 w-full">
            <Disclosure>
                {({ open }) => (
                    <div className="w-full">
                        <DisclosureButton className="flex w-full items-start md:items-center justify-between rounded-lg bg-[var(--card-bg)] p-4 text-left focus:outline-none focus:ring focus:ring-opacity-75">
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                <div className="w-20 md:w-24 flex-shrink-0">
                                    <img
                                        src={logoSrc}
                                        alt={`${company} Logo`}
                                        className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto md:mx-0 rounded-lg bg-white"
                                    />
                                    {links && (
                                        <div className="mt-2 flex flex-row justify-center md:justify-start gap-1 text-lg">
                                            {links}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between flex-wrap gap-x-4">
                                        <h3 className="text-lg font-semibold text-[var(--foreground)]">{role}</h3>
                                        <span className="text-md text-[var(--foreground)] opacity-80">{date}</span>
                                    </div>

                                    <div className="flex justify-between flex-wrap mt-1">
                                        <span className="text-[var(--h3)] font-medium">{company}</span>
                                        {location && <span className="text-[var(--h3)] opacity-80">{location}</span>}
                                    </div>
                                </div>
                            </div>
                            <ChevronUpIcon
                                className={`${open ? "rotate-180 transform" : ""
                                    } h-8 w-8 text-[var(--foreground)] opacity-70 flex-shrink-0 ml-4`}
                            />
                        </DisclosureButton>

                        <DisclosurePanel className="px-4 pb-4 pt-4 text-[var(--h4)] bg-[var(--background)] rounded-b-lg border border-[var(--card-bg)] border-t-0">
                            <ul className="list-disc pl-5 space-y-1">
                                {children}
                            </ul>
                        </DisclosurePanel>
                    </div>
                )}
            </Disclosure>
        </div>
    );
}
