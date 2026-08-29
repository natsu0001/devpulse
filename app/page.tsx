"use client";

import Background from "@/app/components/background/Background";
import Navbar from "@/app/components/navbar/Navbar";
import SearchBar from "@/app/components/search/SearchBar";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      
      

      <div className="relative z-10">
        

        <section className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl flex-col items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl text-center">

            <p
              data-ascii-text
              className="text-sm text-text-muted"
            >
              GitHub Analytics
            </p>

            <h1
              data-ascii-text
              className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Explore GitHub profiles.
            </h1>

            <p
              data-ascii-text
              className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-secondary"
            >
              Search for a GitHub user and explore
              their repositories, activity, languages,
              and developer statistics.
            </p>

            <div className="mx-auto mt-8 w-full max-w-xl">
              <SearchBar />
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}