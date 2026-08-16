import type { GitHubUser } from "@/types/github";

type ProfileHeaderProps = {
  user: GitHubUser;
};

const ProfileHeader = ({
  user,
}: ProfileHeaderProps) => {
  return (
    <section className="border border-border bg-surface p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-20 w-20 shrink-0 border border-border object-cover"
        />

        <div>
          <p className="text-sm text-text-muted">
            @{user.username}
          </p>

          <h2
            data-ascii-text
            className="mt-1 text-2xl font-semibold"
          >
            {user.name}
          </h2>

          <p
            data-ascii-text
            className="mt-2 max-w-xl text-sm leading-6 text-text-secondary"
          >
            {user.bio ||
              "No bio provided."}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
            {user.location && (
              <span>
                {user.location}
              </span>
            )}

            {user.company && (
              <span>
                {user.company}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;