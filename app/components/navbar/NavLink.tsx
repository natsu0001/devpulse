type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
};

const NavLink = ({
  href,
  children,
  active = false,
}: NavLinkProps) => {
  return (
    <a
      href={href}
      className={`text-sm transition-colors ${
        active
          ? "text-white"
          : "text-white/60 hover:text-white"
      }`}
    >
      {children}
    </a>
  );
};

export default NavLink;