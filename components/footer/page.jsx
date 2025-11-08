"use client";
import React from "react";
import Link from "next/link";

function Footer() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movie" },
    { name: "My List", path: "/my-list" },
  ];

  return (
    <footer className="bg-[#0F0F0F] text-gray-300 py-6 border-t border-white/10 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        
        <nav>
          <ul className="flex space-x-6 text-sm md:text-base">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-full h-[1px] bg-white/10 my-2" />
        <p className="text-xs md:text-sm text-gray-400 select-none">
          © {new Date().getFullYear()} HamzehFlix 🎬 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
