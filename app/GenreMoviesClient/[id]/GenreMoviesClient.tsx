"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStar } from "react-icons/md";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function GenreMoviesClient({ id }: { id: string }) {
  const apiKey = "0fc676e7190331fa5aaae2651a56bf20";
  const apiUrl = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreName, setGenreName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [year, setYear] = useState("all");
  const [certification, setCertification] = useState("all");

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 16, name: "Animation" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      const url = new URL(`${apiUrl}/discover/movie`);
      url.searchParams.set("api_key", apiKey);
      url.searchParams.set("with_genres", id);
      url.searchParams.set("language", "ar-SA");
      url.searchParams.set("sort_by", "popularity.desc");
      url.searchParams.set("page", String(page));

      if (year !== "all") {
        url.searchParams.set("primary_release_year", year);
      }

      if (certification !== "all") {
        url.searchParams.set("certification_country", "US");
        url.searchParams.set("certification", certification);
      }

      const res = await fetch(url.toString());
      const data = await res.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);

      const g = genres.find((x) => x.id.toString() === id);
      if (g) setGenreName(g.name);
    };

    fetchMovies();
  }, [id, page, year, certification]);

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">{genreName} Movies</h1>

      {/* Filter UI */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        {/* Year Filter */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Release Year
          </label>
          <select
            className="bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm"
            value={year}
            onChange={(e) => {
              setPage(1);
              setYear(e.target.value);
            }}
          >
            <option value="all">All</option>
            {Array.from({ length: 15 }).map((_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div>

        {/* Certification Filter */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Viewing category
          </label>
          <select
            className="bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-sm"
            value={certification}
            onChange={(e) => {
              setPage(1);
              setCertification(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R (Adults)</option>
            <option value="NC-17">+18</option>
          </select>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="group relative w-full h-[250px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              {/* Movie Poster */}
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />

              {/* Rating */}
              <div className="flex items-center gap-1 absolute top-2 left-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs">
                <MdOutlineStar className="text-yellow-300" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>

              {/* Play Overlay */}
              <div
                className="absolute inset-0 bg-red-400/40
          flex items-center justify-center 
          opacity-0 group-hover:opacity-100 
          transition-all duration-300"
              >
                <div
                  className="w-20 h-20 flex items-center justify-center 
            group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="w-10 h-10"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <p className="mt-2 text-sm line-clamp-1 text-center opacity-90 group-hover:opacity-100 transition">
              {movie.title}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          className="px-4 py-2 bg-white/10 cursor-pointer hover:bg-white/20 rounded-lg disabled:opacity-30 transition"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-lg">
          Page <strong>{page}</strong> / {totalPages}
        </span>

        <button
          className="px-4 py-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-30 transition"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
