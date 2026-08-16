"use client";

import { useState } from "react";

const SearchBar = () => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", username);
  };

  return (
    <div className="flex w-full max-w-2xl gap-3">
      <input
      data-ascii-text
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Search GitHub username..."
        className="h-11 flex-1  border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
      />

      <button
        onClick={handleSearch}
        className="h-11  bg-white px-5 text-sm font-medium text-black transition-opacity hover:opacity-80"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;