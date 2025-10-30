"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoTime } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

const ArticlesPage = () => {
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    popularity: number;
    runtime: number;
  }

  const apiKey = "0fc676e7190331fa5aaae2651a56bf20";
  const apiUrl = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await res.json();

        // Get runtime for each movie
        const moviesWithRuntime = await Promise.all(
          data.results.map(async (movie: Movie) => {
            const detailsRes = await fetch(
              `${apiUrl}/movie/${movie.id}?api_key=${apiKey}&language=en-US`
            );
            const details = await detailsRes.json();
            console.log(details);

            return { ...movie, runtime: details.runtime };
          })
        );

        setMovies(moviesWithRuntime);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-5 bg-[#262626]">
      <div className="flex flex-wrap gap-3.5 justify-around">
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="relative hover:scale-110 transition-transform duration-300 bg-[#1A1A1A] border border-[#262626] p-4 rounded-lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-fit object-cover rounded-xl "
                width={400}
                height={300}
              />
              <div className="p-2 text-white flex items-center justify-around w-full">
                <div className="flex items-center gap-2">
                  <IoTime className="text-[#999]" />
                  <p>{movie.runtime}min</p>
                </div>

                <div className="flex items-center gap-2">
                  <FaEye className="text-[#999]" />
                  <p>
                    {movie.popularity >= 1_000_000
                      ? (movie.popularity / 1_000_000).toFixed(1) + "M"
                      : movie.popularity >= 1_000
                      ? (movie.popularity / 1_000).toFixed(1) + "K"
                      : movie.popularity.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
