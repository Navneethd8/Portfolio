"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import MainSidebar from "./MainSidebar";

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
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
    <div className="site-shell relative z-10 flex min-h-[100dvh] flex-col lg:min-h-screen">
      {/* Mobile: fixed top bar (always above drawer). Spacer keeps document flow aligned. */}
      <header className="fixed left-0 right-0 top-0 z-[60] flex h-[var(--mobile-nav-header-height)] items-center justify-between gap-2 overflow-hidden border-b border-gray-200 bg-[var(--sidebar)] px-3 text-[var(--background)] sm:gap-3 sm:px-4 dark:border-gray-800 lg:hidden">
        <h1 className="min-w-0 flex-1 truncate pr-1 text-left text-base font-bold leading-tight sm:pr-2 sm:text-lg">
          Navneeth Dhamotharan
        </h1>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sidebar-link)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sidebar)] sm:h-12 sm:w-12 sm:text-2xl"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
      <div
        className="shrink-0 lg:hidden h-[var(--mobile-nav-header-height)]"
        aria-hidden
      />

      {/* Sidebar: drawer starts exactly below fixed header; desktop: fixed left column */}
      <aside
        className={`
          fixed bottom-0 left-0 right-0 z-40 flex flex-col bg-[var(--sidebar)] transition-transform duration-300 ease-in-out
          top-[var(--mobile-nav-header-height)] max-lg:overflow-hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none max-lg:invisible"}
          lg:pointer-events-auto lg:visible lg:inset-y-0 lg:right-auto lg:top-0 lg:z-30 lg:h-[100dvh] lg:max-h-[100dvh] lg:w-[var(--sidebar-width)] lg:max-w-[100vw] lg:translate-x-0 lg:overflow-hidden lg:border-r lg:border-gray-200 lg:dark:border-gray-800 lg:transition-none
        `}
      >
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:px-8 sm:py-8 lg:min-h-full lg:overflow-visible lg:px-4 lg:py-4 lg:pb-4">
          <MainSidebar />
        </div>
      </aside>

      {/* Main: width accounts for fixed sidebar so layout does not overflow */}
      <main className="mx-auto w-full max-w-8xl px-5 py-8 sm:px-8 sm:py-10 lg:ml-[var(--sidebar-width)] lg:w-[calc(100%-var(--sidebar-width))] lg:max-w-none lg:px-10 lg:py-12">
        {children}
      </main>
    </div>
  );
};

export default SiteLayout;
