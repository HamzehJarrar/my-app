"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/page";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

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
  const [myList, setMyList] = useState<Movie[]>([]);

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

      const stored = localStorage.getItem("myList");
      if (stored) setMyList(JSON.parse(stored));
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

  const toggleMyList = (movie: Movie) => {
    let updated;

    if (myList.some((m) => m.id === movie.id)) {
      updated = myList.filter((m) => m.id !== movie.id);
    } else {
      updated = [...myList, movie];
    }

    setMyList(updated);
    localStorage.setItem("myList", JSON.stringify(updated));
  };

  const arrowVariants = {
    initial: { opacity: 0, x: 12 },
    hover: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white">
      <Header />

      {/* HERO */}
      <div
        className="h-[50vh] md:h-[70vh] bg-center bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: movieOfYear
            ? `url(https://image.tmdb.org/t/p/original${movieOfYear.backdrop_path})`
            : "url('/images/hero.png')",
        }}
      >
        {movieOfYear && (
          <>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-sm">
                  <MdOutlineStar className="text-yellow-300 text-lg" />
                  <p>{movieOfYear.vote_average.toFixed(1)}</p>
                </div>
                <span className="text-white/70 text-sm">
                  {new Date(movieOfYear.release_date).getFullYear()}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold mt-2">
                {movieOfYear.title}
              </h1>

              <p className="max-w-xl opacity-90 mt-2 text-sm md:text-base">
                {movieOfYear.overview}
              </p>
            </div>
          </>
        )}
      </div>

      {/* GENRES */}
      <div className="px-4 md:px-6 py-6 md:py-10">
        {genres.map((g) => (
          <div key={g.id} className="space-y-3 max-w-6xl mx-auto mb-10">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg md:text-xl font-bold">{g.name}</h2>
              <Link href={`/genreMovies/${g.id}`}>
                <button className="flex items-center cursor-pointer gap-2 text-sm text-red-400 hover:text-red-300 transition">
                  View All <FaArrowRight />
                </button>
              </Link>
            </div>

            <div className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth pb-3">
              {genreMovies[g.name]?.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.07,
                      boxShadow: "0 0 25px rgba(255,0,0,0.45)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 15,
                    }}
                    className="relative group shrink-0 w-[120px] h-[180px] md:w-[150px] md:h-[220px] 
  rounded-xl overflow-hidden cursor-pointer"
                  >
                    {/* Save Button */}
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMyList(movie);
                      }}
                      className="absolute top-2 right-2 z-20 cursor-pointer"
                    >
                      {myList.some((m) => m.id === movie.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-red-500 transform scale-110 transition-all duration-200"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white hover:text-red-400 transition-colors duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                          />
                        </svg>
                      )}
                    </div>

                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />

                    {/* Rating */}
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                      <MdOutlineStar className="text-white" />
                      <span className="text-white text-sm">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-2 text-xs md:text-sm">
                      <p className="line-clamp-1">{movie.title}</p>
                    </div>

                    {/* ✅ Arrow Button */}
                    {/* Hover Overlay + Arrow */}
                    <div
                      className="absolute inset-0 bg-red-600/30
                        flex items-center justify-center 
                        opacity-0 group-hover:opacity-100 
                        transition-all duration-300"
                    >
                      <div
                        className="w-24 h-24 flex items-center justify-center 
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
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
