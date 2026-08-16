const ProfileHeader = () => {
  return (
    <section className="border border-border bg-surface p-6">
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-border-strong bg-surface-hover text-2xl font-semibold">
          T
        </div>

        {/* Profile information */}
        <div>
          <p className="text-sm text-text-muted">
            GitHub Profile
          </p>

          <h2
            data-ascii-text
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            torvalds
          </h2>

          <p
            data-ascii-text
            className="mt-1 text-sm text-text-secondary"
          >
            Linus Torvalds
          </p>

          <p
            data-ascii-text
            className="mt-3 max-w-xl text-sm leading-6 text-text-muted"
          >
            Creator of Linux and Git. Software engineer
            and open source developer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;