"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value =
      username.trim();

    if (!value) return;

    router.push(
      `/github/${encodeURIComponent(value)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full border border-border bg-surface"
    >
      <input
        value={username}
        onChange={(event) =>
          setUsername(
            event.target.value
          )
        }
        placeholder="Search GitHub username..."
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-text-muted"
      />

      <button
        type="submit"
        className="diagonal-bg-subtle border-1 border-border px-5 text-xs font-medium text-text-muted transition-colors hover:bg-white hover:text-black"
      >
        SEARCH
      </button>
    </form>
  );
};

export default SearchBar;