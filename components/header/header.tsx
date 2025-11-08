"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NetFlix from "@/public/netFlix.svg";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movie" },
    { name: "My List", path: "/my-list" },
  ];

  return (
    <header className="w-full px-4 md:px-10 py-3 bg-black flex justify-between items-center border-b border-white/10 relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src={NetFlix} alt="Netflix Logo" width={95} height={35} className="md:w-[120px]" />
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-lg bg-[#0F0F0F] border-2 border-[#1F1F1F] px-6 py-3 rounded-md">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-all duration-300 hover:text-red-500 ${
              pathname === item.path
                ? "font-semibold text-red-500 bg-[#1A1A1A] px-3 py-1 rounded-xl"
                : "text-gray-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search Desktop */}
        <div className="hidden md:flex items-center gap-2 bg-[#1A1A1A] px-3 py-1 rounded-full border border-white/10 focus-within:border-red-500 transition-colors duration-300">
          <CiSearch className="text-2xl text-gray-300" />
          <input
            type="text"
            placeholder="Search"
            className="text-white w-20 focus:w-40 transition-all duration-300 outline-none placeholder-gray-400 bg-transparent"
          />
        </div>

        {/* Search Icon Mobile */}
        <CiSearch className="md:hidden text-3xl text-gray-300 hover:text-red-500 transition" />

        <CiBellOn className="text-3xl text-gray-300 hover:text-red-500 transition" />

        {/* Hamburger Menu (Mobile) */}
        <RxHamburgerMenu
          onClick={() => setOpenMenu(true)}
          className="text-3xl text-white cursor-pointer md:hidden"
        />
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] sm:w-[50%] bg-black border-l border-white/10 z-50 transform transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h2 className="text-xl font-bold">Menu</h2>
          <IoClose
            onClick={() => setOpenMenu(false)}
            className="text-3xl cursor-pointer text-red-500"
          />
        </div>

        <nav className="flex flex-col gap-4 p-6 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpenMenu(false)}
              className={`transition-all duration-300 ${
                pathname === item.path ? "text-red-500 font-semibold" : "text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Search */}
          <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-2 rounded-md border border-white/10 mt-4">
            <CiSearch className="text-2xl text-gray-300" />
            <input
              type="text"
              placeholder="Search"
              className="text-white w-full outline-none placeholder-gray-400 bg-transparent"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
