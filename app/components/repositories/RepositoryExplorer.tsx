"use client";

import { useMemo, useState } from "react";

import RepositoryCard from "./RepositoryCard";

import type { Repository } from "@/types/github";

type RepositoryExplorerProps = {
  repositories: Repository[];
};

type SortOption =
  | "stars"
  | "forks"
  | "updated"
  | "name";

const RepositoryExplorer = ({
  repositories,
}: RepositoryExplorerProps) => {
  const [search, setSearch] =
    useState("");

  const [language, setLanguage] =
    useState("all");

  const [sort, setSort] =
    useState<SortOption>("stars");

  /*
   * Get unique languages.
   */
  const languages = useMemo(() => {
    const values = repositories
      .map(
        (repository) =>
          repository.language
      )
      .filter(Boolean);

    return Array.from(
      new Set(values)
    ).sort();
  }, [repositories]);

  /*
   * Search + filter + sort.
   */
  const filteredRepositories =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      const filtered =
        repositories.filter(
          (repository) => {
            const matchesSearch =
              repository.name
                .toLowerCase()
                .includes(query);

            const matchesLanguage =
              language === "all" ||
              repository.language ===
                language;

            return (
              matchesSearch &&
              matchesLanguage
            );
          }
        );

      return [...filtered].sort(
        (a, b) => {
          switch (sort) {
            case "stars":
              return b.stars - a.stars;

            case "forks":
              return b.forks - a.forks;

            case "updated":
              return (
                new Date(
                  b.updatedAt
                ).getTime() -
                new Date(
                  a.updatedAt
                ).getTime()
              );

            case "name":
              return a.name.localeCompare(
                b.name
              );

            default:
              return 0;
          }
        }
      );
    },
    [
      repositories,
      search,
      language,
      sort,
    ]
  );

  return (
    <section>
      {/* Header */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-text-muted">
            Repositories
          </p>

          <h2
            data-ascii-text
            className="mt-1 text-xl font-semibold"
          >
            Repository Explorer
          </h2>
        </div>

        <p className="text-xs text-text-muted">
          {filteredRepositories.length}{" "}
          of {repositories.length}
        </p>
      </div>

      {/* Controls */}

      <div className="mb-5 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-[1fr_auto_auto]">
        {/* Search */}

<input
  type="search"
  value={search}
  onChange={(event) =>
    setSearch(event.target.value)
  }
  placeholder="Search repositories..."
  className="min-h-12 bg-surface px-4 text-sm text-white outline-none placeholder:text-text-muted"
/>

        {/* Language */}

        <select
          value={language}
          onChange={(event) =>
            setLanguage(
              event.target.value
            )
          }
          className="border-t border-border bg-surface px-4 py-3 text-sm text-white outline-none sm:border-l sm:border-t-0"
        >
          <option value="all">
            All languages
          </option>

          {languages.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(event) =>
            setSort(
              event.target.value as SortOption
            )
          }
          className="border-t border-border bg-surface px-4 py-3 text-sm text-white outline-none sm:border-l sm:border-t-0"
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

          <option value="name">
            Name A-Z
          </option>
        </select>
      </div>

      {/* Results */}

      {filteredRepositories.length >
      0 ? (
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {filteredRepositories.map(
            (repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
              />
            )
          )}
        </div>
      ) : (
        <div className="border border-border bg-surface p-8">
          <p className="text-sm font-medium">
            No repositories found
          </p>

          <p className="mt-2 text-sm text-text-muted">
            Try a different search or
            language filter.
          </p>
        </div>
      )}
    </section>
  );
};

export default RepositoryExplorer;