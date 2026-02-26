"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface SiteLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ sidebar, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change or when clicked on a link
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col min-h-screen lg:grid lg:grid-cols-[minmax(280px,0.5fr)_minmax(0,3fr)]">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-[var(--sidebar)] text-[var(--background)] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <h1 className="text-xl font-bold truncate">Navneeth Dhamotharan</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl p-2 focus:outline-none"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar - Overlay on mobile, grid column on desktop */}
      <aside
        className={`
          fixed inset-0 z-40 bg-[var(--sidebar)] p-8 overflow-y-auto transition-transform transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:block lg:sticky lg:top-0 lg:h-screen lg:p-4 lg:border-r lg:border-gray-200 lg:dark:border-gray-800 lg:border-b-0
        `}
      >
        <div className="flex flex-col h-full mt-16 md:mt-20 lg:mt-0">
          {sidebar}
        </div>
      </aside>

      <main className="p-8 mx-auto w-full max-w-8xl">{children}</main>
    </div>
  );
};

export default SiteLayout;
