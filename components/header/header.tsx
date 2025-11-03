"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NetFlix from "@/public/netFlix.svg";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";

function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "My List", path: "/my-list" },
  ];

  return (
    <header className="w-full px-10 py-2 bg-black flex justify-around items-center border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src={NetFlix} alt="Netflix Logo" width={120} height={40} />
      </div>

      {/* Navigation */}
      <nav className="flex gap-8 text-lg bg-[#0F0F0F]  border-4 border-[#1F1F1F] px-6 py-3 rounded-md">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex transition-all duration-300 hover:text-red-500 items-center ${
              pathname === item.path
                ? "font-semibold text-red-500 bg-[#1A1A1A] px-3 py-1 rounded-xl"
                : "text-gray-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      {/* User Profile */}
      <div className="flex items-center">
        <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1 rounded-full border border-white/10 focus-within:border-red-500 transition-colors duration-300">
          <CiSearch className="text-2xl text-gray-300" />
          <input
            type="text"
            placeholder="Search"
            className=" text-white w-20 focus:w-40 transition-all duration-300 outline-none placeholder-gray-400"
          />
        </div>

        <CiBellOn className="ml-6 text-3xl text-gray-300 hover:text-red-500 transition-colors duration-300" />
      </div>
    </header>
  );
}

export default Header;
