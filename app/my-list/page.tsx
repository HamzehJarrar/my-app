"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton/BackButton";
import Header from "@/components/header/header";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

export default function MyListPage() {
  const [myList, setMyList] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("myList");
    if (stored) setMyList(JSON.parse(stored));
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

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black ">
      <Header />
      <div className="top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <BackButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500 shadow-lg shadow-red-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              My List
            </h1>
            <p className="text-slate-400 mt-1">
              {myList.length} {myList.length === 1 ? "movie" : "movies"} saved
            </p>
          </div>
        </div>

        {myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 blur-3xl rounded-full" />
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-slate-300 mb-3">
              Your list is empty
            </h2>
            <p className="text-slate-500 text-center max-w-md mb-8">
              Start adding movies to your list by clicking the heart icon on any
              movie poster
            </p>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-red-500 hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {myList.map((movie) => (
              <div
                key={movie.id}
                className="group relative animate-in fade-in duration-500"
              >
                <Link href={`/movie/${movie.id}`}>
                  <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 hover:border-red-500">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMyList(movie);
                      }}
                      className="absolute top-3 right-3 z-20 cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-900/90 transition-all duration-200 hover:scale-110">
                        {myList.some((m) => m.id === movie.id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-red-500 animate-in zoom-in duration-200"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-slate-400 hover:text-red-400 transition-colors duration-200"
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
                    </div>

                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110 hover:brightness-50"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-sm font-semibold text-white line-clamp-2 drop-shadow-lg">
                        {movie.title}
                      </h3>
                      {movie.vote_average > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium text-slate-300">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
