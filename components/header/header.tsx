"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NetFlix from "@/public/netFlix.svg";

function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/articles" },
    { name: "My List", path: "/my-list" },
  ];

  return (
    <header className="w-full px-10 py-4 bg-[#141414] flex justify-between items-center border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src={NetFlix} alt="Netflix Logo" width={120} height={40} />
      </div>

      {/* Navigation */}
      <nav className="flex gap-8 text-lg">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-all duration-300 hover:text-red-500 ${
              pathname === item.path
                ? "font-semibold text-red-500"
                : "text-gray-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
