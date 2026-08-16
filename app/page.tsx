import Navbar from "@/app/components/navbar/Navbar";
import SearchBar from "@/app/components/search/SearchBar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          GitHub Dashboard
        </h1>

        <p className="mt-3 text-center text-sm text-white/50">
          Search a GitHub user and explore their developer profile.
        </p>

        <div className="mt-8 w-full flex justify-center">
          <SearchBar />
        </div>
      </section>
    </main>
  );
}