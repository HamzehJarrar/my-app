"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/page";
import Image from "next/image";
import { IoTime } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  runtime: number;
}

export default function ArticlesPage() {
  const apiKey = "0fc676e7190331fa5aaae2651a56bf20";
  const apiUrl = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      const res = await fetch(
        `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      const data = await res.json();
      setTotalPages(data.total_pages);

      const moviesWithRuntime = await Promise.all(
        data.results.map(async (movie: Movie) => {
          const detailsRes = await fetch(
            `${apiUrl}/movie/${movie.id}?api_key=${apiKey}&language=en-US`
          );
          const details = await detailsRes.json();
          return { ...movie, runtime: details.runtime };
        })
      );

      setMovies(moviesWithRuntime);
      setLoading(false);
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10 text-white/50 text-xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-[#1A1A1A] border border-[#262626] rounded-xl overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-[260px]"
                />

                {/* Play Hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 group-hover:scale-110 transition duration-300"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Runtime + Views */}
                <div className="flex justify-between px-3 py-2 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <IoTime className="text-[#999]" />
                    <span>{movie.runtime || "N/A"} min</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaEye className="text-[#999]" />
                    <span>
                      {movie.popularity >= 1_000_000
                        ? (movie.popularity / 1_000_000).toFixed(1) + "M"
                        : movie.popularity >= 1_000
                        ? (movie.popularity / 1_000).toFixed(1) + "K"
                        : movie.popularity.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-center items-center gap-5 mt-8">
            <button
              className="px-4 py-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-20"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>

            <p className="text-lg">Page {page} / {totalPages}</p>

            <button
              className="px-4 py-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-20"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
