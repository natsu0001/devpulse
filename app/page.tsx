import Background from "@/app/components/background/Background";
import Navbar from "@/app/components/navbar/Navbar";
import SearchBar from "@/app/components/search/SearchBar";
import Dashboard from "@/app/components/dashboard/Dashboard";

export default function Home() {
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
              Search for a GitHub user and explore
              their repositories, activity, languages,
              and developer statistics.
            </p>
          </div>

          <div className="mt-8 w-full flex justify-center">
            <SearchBar data-ascii-text />
          </div>
        </section>

        <Dashboard />
      </div>
    </main>
  );
}