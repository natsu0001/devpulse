"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Compare",
    href: "/compare",
  },
  {
    label: "Repositories",
    href: "/repositories",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border diagonal-bg-subtle backdrop-blur-sm">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-70"
        >
          DEVPULSE
        </Link>

        {/* Navigation */}

        <div className="hidden items-center gap-1 md:flex">

          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  border px-4 py-2 text-sm
                  transition-colors duration-200
                  ${
                    isActive
                      ? "border-border bg-surface text-white"
                      : "border-transparent text-text-muted hover:border-border hover:text-white"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}

        </div>

        {/* Search shortcut */}

        <Link
          href="/"
          className="hidden border border-border bg-background px-3 py-2 text-xs text-text-muted transition-colors hover:border-white/30 hover:text-white sm:block"
        >
          SEARCH
        </Link>

      </nav>
    </header>
  );
};

export default Navbar;