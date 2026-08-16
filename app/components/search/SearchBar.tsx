"use client";

import { FormEvent, useState } from "react";

type SearchBarProps = {
  onSearch: (
    username: string
  ) => void;

  loading?: boolean;
};

const SearchBar = ({
  onSearch,
  loading = false,
}: SearchBarProps) => {
  const [username, setUsername] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onSearch(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full"
    >
      <input
      data-ascii-text
        value={username}
        onChange={(event) =>
          setUsername(
            event.target.value
          )
        }
        placeholder="Enter GitHub username..."
        disabled={loading}
        className="h-12 min-w-0 flex-1 border border-border bg-surface px-4 text-sm outline-none placeholder:text-text-muted focus:border-border-strong disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={
          loading ||
          !username.trim()
        }
        className="h-12 border-y border-r border-border bg-surface px-6 text-sm transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Searching..."
          : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;