"use client";

import React from "react";
import Link from "next/link";

function Error({ error, reset }) {
    return (
        <div className="p-6 bg-red-100 rounded-lg flex flex-col items-start">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
            <p className="text-red-600 mb-4">
                {error?.message || "Something went wrong while fetching articles."}
            </p>

            <Link
                href="/"
                className="text-blue-500 cursor-pointer hover:underline mb-4"
            >
                Go back to home
            </Link>

            <button
                onClick={() => reset()}
                className="cursor-pointer mt-2 w-32 bg-blue-500 h-10 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                Try Again
            </button>
        </div>
    );
}

export default Error;
