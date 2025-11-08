import Image from "next/image";
import Header from "@/components/header/header";
import BackButton from "@/components/BackButton/BackButton";
import GenreMoviesClient from "@/app/GenreMoviesClient/[id]/GenreMoviesClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />

      <div className="px-6 py-6">
        <BackButton />
      </div>

      <div className="relative h-40 mb-8 mx-6 rounded-xl overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Banner"
          fill
          className="object-cover opacity-80 filter blur-sm"
          priority
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-3xl font-bold">Your Ads Here</h1>
        </div>
      </div>

      <GenreMoviesClient id={id} />
    </div>
  );
}
