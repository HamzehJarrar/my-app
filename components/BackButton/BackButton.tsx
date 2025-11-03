"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 cursor-pointer text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg transition"
    >
      <IoArrowBack className="text-xl" />
      Back
    </button>
  );
}
