import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <div className="w-full h-15 sticky top-0" style={{ backgroundColor: "#52AB98" }}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p>Projects</p>
                </Link>
              </li>
              <li>
                <Link href="/Resume_Navneeth.pdf" target="_blank">
                  <p>Resume</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
