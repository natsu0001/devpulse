import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <nav className="diagonal-bg border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <h1 data-ascii-text className="text-lg font-semibold tracking-tight">
          GitScope
        </h1>

        <div data-ascii-text className="flex items-center gap-8">
          <NavLink href="#" active>
            Dashboard
          </NavLink>

          <NavLink href="#">
            Repositories
          </NavLink>

          <NavLink href="#">
            Analytics
          </NavLink>
        </div>

        <button data-ascii-text className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10">
          GitHub
        </button>

      </div>
    </nav>
  );
};

export default Navbar;