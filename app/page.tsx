import Navbar from "@/app/components/navbar/Navbar";
import SearchBar from "@/app/components/search/SearchBar";
import AsciiBackground from "@/app/components/background/AsciiBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AsciiBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1
            data-ascii-text
            className="text-6xl font-bold"
          >
            GitHub Dashboard
          </h1>

          <p
            data-ascii-text
            className="mt-4 text-white/50"
          >
            Explore GitHub profiles
          </p>
        </div>
      </div>
    </main>
  );
}