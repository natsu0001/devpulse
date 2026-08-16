"use client";
import { useState } from "react";
import Background from "@/app/components/background/Background";
import Navbar from "@/app/components/navbar/Navbar";
import SearchBar from "@/app/components/search/SearchBar";
import Dashboard from "@/app/components/dashboard/Dashboard";
import LoadingSkeleton from "@/app/components/ui/LoadingSkeleton";
import ErrorState from "@/app/components/ui/ErrorState";

export default function Home() {
  const [status, setStatus] = useState<
    "success" | "loading" | "error"
  >("success");

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative z-10">
        <Navbar />

        {/* Search */}

        <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-12">
          <div className="text-center">
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
          </div>

          <div className="mt-8 w-full max-w-xl">
            <SearchBar />
          </div>
        </section>

        {/* Dashboard state */}

        {status === "loading" && (
          <LoadingSkeleton />
        )}

        {status === "error" && (
          <ErrorState
            onRetry={() =>
              setStatus("success")
            }
          />
        )}

        {status === "success" && (
          <Dashboard />
        )}

        {/* TEMP DEV CONTROLS */}

        <div className="fixed bottom-5 left-5 z-50 flex border border-border bg-surface">
          <button
            onClick={() =>
              setStatus("success")
            }
            className="border-r border-border px-3 py-2 text-xs hover:bg-surface-hover"
          >
            Success
          </button>

          <button
            onClick={() =>
              setStatus("loading")
            }
            className="border-r border-border px-3 py-2 text-xs hover:bg-surface-hover"
          >
            Loading
          </button>

          <button
            onClick={() =>
              setStatus("error")
            }
            className="px-3 py-2 text-xs hover:bg-surface-hover"
          >
            Error
          </button>
        </div>
      </div>
    </main>
  );
}