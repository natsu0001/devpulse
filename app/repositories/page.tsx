"use client";

import { useState } from "react";

import RepositoryCard from "@/app/components/repositories/RepositoryCard";

type SearchRepository = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  isPrivate: boolean;
  owner: {
    username: string;
    avatar: string;
  };
};

type SearchResponse = {
  total: number;
  repositories: SearchRepository[];
};

const RepositoriesPage = () => {
  const [query, setQuery] =
  useState("");

const [results, setResults] =
  useState<SearchRepository[]>([]);

const [loading, setLoading] =
  useState(false);

const [error, setError] =
  useState<string | null>(null);

const [sort, setSort] =
  useState("stars");

const [page, setPage] =
  useState(1);

const [total, setTotal] =
  useState(0);

  const searchRepositories =
  async (
    requestedPage = 1
  ) => {
    const value =
      query.trim();

    if (!value) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response =
        await fetch(
          `/api/github/search?q=${encodeURIComponent(
            value
          )}&sort=${sort}&page=${requestedPage}`
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            "Repository search failed."
        );
      }

      setResults(
        data.repositories
      );

      setTotal(data.total);

      setPage(requestedPage);
    } catch (error) {
      setResults([]);

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
    <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-text-muted">
          GitHub Explorer
        </p>

        <h1
          data-ascii-text
          className="mt-2 text-3xl font-semibold tracking-tight"
        >
          Repository Search
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
          Search and explore public repositories
          across GitHub.
        </p>
      </div>

      {/* Search */}
      <div className="border border-border bg-surface p-2">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search GitHub repositories..."
            className="min-h-12 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-text-muted"
          />

          <button
            type="button"
             onClick={() =>
                       searchRepositories(1)
                    }
            className="min-h-12 border border-border-strong px-6 text-sm transition-colors hover:bg-surface-hover"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
        <select
  value={sort}
  onChange={(event) => {
    setSort(event.target.value);

    if (query.trim()) {
      setTimeout(() => {
        searchRepositories(1);
      }, 0);
    }
  }}
          className="min-h-12 bg-surface px-4 text-sm text-white outline-none"
        >
          <option value="stars">
            Most stars
          </option>

          <option value="forks">
            Most forks
          </option>

          <option value="updated">
            Recently updated
          </option>
        </select>

        <select
          defaultValue="all"
          className="min-h-12 border-t border-border bg-surface px-4 text-sm text-white outline-none sm:border-l sm:border-t-0"
        >
          <option value="all">
            All languages
          </option>

          <option value="typescript">
            TypeScript
          </option>

          <option value="javascript">
            JavaScript
          </option>

          <option value="python">
            Python
          </option>

          <option value="rust">
            Rust
          </option>
        </select>

        <div className="flex items-center bg-surface px-4">
          <span className="text-xs text-text-muted">
            Search public repositories
          </span>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
{loading && (
  <div className="border border-border bg-surface p-8">
    <p className="text-sm text-text-muted">
      Searching GitHub...
    </p>
  </div>
)}

{error && !loading && (
  <div className="border border-border bg-surface p-8">
    <p className="text-sm font-medium">
      Search failed
    </p>

    <p className="mt-2 text-sm text-text-muted">
      {error}
    </p>

    <button
      type="button"
      onClick={() =>
        searchRepositories(page)
      }
      className="mt-5 border border-border-strong px-5 py-2.5 text-sm transition-colors hover:bg-surface-hover"
    >
      Try again
    </button>
  </div>
)}

{!loading &&
  !error &&
  results.length > 0 && (
    <>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-text-muted">
          {total.toLocaleString()}{" "}
          repositories found
        </p>

        <p className="text-xs text-text-muted">
          Page {page}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        {results.map(
          (repository) => (
            <RepositoryCard
              key={repository.id}
              repository={repository}
            />
          )
        )}
      </div>
    </>
  )}

{!loading &&
  !error &&
  query &&
  results.length === 0 && (
    <div className="border border-border bg-surface p-8">
      <p className="text-sm font-medium">
        No repositories found
      </p>

      <p className="mt-2 text-sm text-text-muted">
        Try a different search query.
      </p>
    </div>
  )}
      </div>
    </main>
  );
};

export default RepositoriesPage;