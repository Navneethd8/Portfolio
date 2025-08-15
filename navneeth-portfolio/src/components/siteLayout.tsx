"use client";

import React from "react";

interface SiteLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ sidebar, children }) => {
  return (
<div className="flex flex-col min-h-screen lg:grid lg:grid-cols-[minmax(280px,0.5fr)_minmax(0,3fr)]">
  <aside
          className="
            p-4
            flex
            overflow-x-auto
            whitespace-nowrap
            h-auto
            border-b border-gray-200 dark:border-gray-400

            lg:block
            lg:sticky
            lg:top-0
            lg:h-screen
            // lg:overflow-y-auto
            lg:whitespace-normal
            lg:border-b-0
            lg:border-r

            bg-[var(--sidebar)]
          "
        
    >
      {sidebar}
    </aside>
  <main className="p-8 mx-auto w-full max-w-8xl">
    {children}
  </main>
</div>
  );
};

export default SiteLayout;
