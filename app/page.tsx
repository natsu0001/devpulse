"use client";
import { useState } from "react";
import Background from "@/app/components/background/Background";
import Navbar from "@/app/components/navbar/Navbar";
import SearchBar from "@/app/components/search/SearchBar";
import Dashboard from "@/app/components/dashboard/Dashboard";
import LoadingSkeleton from "@/app/components/ui/LoadingSkeleton";
import ErrorState from "@/app/components/ui/ErrorState";

import { getGitHubUser } from "@/lib/github";

import type {
  GitHubDashboardData,
} from "@/types/github";

export default function Home() {
  const [data, setData] =
    useState<GitHubDashboardData | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSearch = async (
    username: string
  ) => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result =
        await getGitHubUser(
          username.trim()
        );

      setData(result);
    } catch (error) {
      setData(null);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative z-10">
        <Navbar />

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
              Search for a GitHub user and
              explore their repositories,
              activity, languages, and
              developer statistics.
            </p>
          </div>

          <div className="mt-8 w-full max-w-xl">
            <SearchBar
              onSearch={handleSearch}
              loading={loading}
            />
          </div>
        </section>

        {loading && (
          <LoadingSkeleton />
        )}

        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={() => {
              setError(null);
            }}
          />
        )}

        {!loading &&
          !error &&
          data && (
            <Dashboard data={data} />
          )}
      </div>
    </main>
  );
}