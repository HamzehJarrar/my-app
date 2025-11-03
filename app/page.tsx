"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/page";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import Link from "next/link";

const HomePage = () => {
  const apiKey = "0fc676e7190331fa5aaae2651a56bf20";
  const apiUrl = "https://api.themoviedb.org/3";

  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    release_date: string;
  }

  const [movieOfYear, setMovieOfYear] = useState<Movie | null>(null);
  const [genreMovies, setGenreMovies] = useState<{ [key: string]: Movie[] }>(
    {}
  );

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 16, name: "Animation" },
  ];

  useEffect(() => {
    const fetchMovieOfTheYear = async () => {
      const year = new Date().getFullYear();
      const res = await fetch(
        `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=2000&primary_release_year=${year}`
      );
      const data = await res.json();
      setMovieOfYear(data.results[0]);
    };

    const fetchGenres = async () => {
      const results: { [key: string]: Movie[] } = {};

      for (const g of genres) {
        const res = await fetch(
          `${apiUrl}/discover/movie?api_key=${apiKey}&language=ar-SA&with_genres=${g.id}&sort_by=popularity.desc&page=1`
        );
        const data = await res.json();
        results[g.name] = data.results.slice(0, 10);
      }

      setGenreMovies(results);
    };

    fetchMovieOfTheYear();
    fetchGenres();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white">
      <Header />

      <div
        className="h-[70vh] bg-center bg-cover bg-no-repeat brightness-110 relative"
        style={{
          backgroundImage: movieOfYear
            ? `url(https://image.tmdb.org/t/p/original${movieOfYear.backdrop_path})`
            : "url('/images/hero.png')",
          filter: "brightness(0.75)",
        }}
      >
        {movieOfYear && (
          <div className="absolute bottom-0 left-0 p-10 w-full bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-sm">
                <MdOutlineStar className="text-yellow-300 text-lg" />
                <p className=" text-lg text-white">
                  {movieOfYear.vote_average.toFixed(1)}
                </p>
              </div>

              <span className="text-white/70 text-sm">
                {new Date(movieOfYear.release_date).getFullYear()}
              </span>
            </div>

            <h1 className="text-4xl font-bold drop-shadow-lg">
              {movieOfYear.title}
            </h1>

            <p className="max-w-xl opacity-90 mt-2">{movieOfYear.overview}</p>
          </div>
        )}
      </div>

      <div className="flex gap-6 px-6 py-10">
        <div className="flex-1 space-y-8">
          {genres.map((g) => (
            <div key={g.id} className="space-y-3 max-w-6xl mx-auto">
              <h2 className="text-xl font-bold">{g.name}</h2>

              <div
                className="flex gap-5 overflow-x-auto scroll-smooth pb-3"
                style={{ scrollbarColor: "#c53030 #111" }}
              >
                {genreMovies[g.name]?.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <div
                      key={movie.id}
                      className="relative shrink-0 w-[150px] h-[220px] rounded-xl overflow-hidden
                    transition-all duration-300 transform 
                    hover:shadow-[0_0_20px_rgba(255,0,0,0.55)] hover:scale-[1.05]"
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />

                      <div className="flex items-center gap-1 absolute top-2 left-2 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                        <MdOutlineStar className="text-white text-base" />
                        <span className="text-white text-sm font-medium">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>

                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/20 to-transparent p-2 text-sm">
                        <p className="line-clamp-1 font-medium drop-shadow">
                          {movie.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
