"use client";

import { useState } from "react";

const RepositoriesPage = () => {
  const [query, setQuery] = useState("");

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
            className="min-h-12 border border-border-strong px-6 text-sm transition-colors hover:bg-surface-hover"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
        <select
          defaultValue="stars"
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
        {query ? (
          <p className="text-sm text-text-muted">
            Searching for{" "}
            <span className="text-white">
              "{query}"
            </span>
          </p>
        ) : (
          <div className="border border-border bg-surface p-8">
            <p className="text-sm font-medium">
              Search GitHub
            </p>

            <p className="mt-2 text-sm text-text-muted">
              Enter a repository name,
              technology, or topic above.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default RepositoriesPage;