import { dummyUser } from "@/data/dummy";

const ProfileHeader = () => {
  return (
    <section className="border border-border bg-surface p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-border-strong bg-surface-hover text-2xl font-semibold">
          {dummyUser.name.charAt(0)}
        </div>

        <div>
          <p className="text-sm text-text-muted">
            @{dummyUser.username}
          </p>

          <h2
            data-ascii-text
            className="mt-1 text-2xl font-semibold"
          >
            {dummyUser.name}
          </h2>

          <p
            data-ascii-text
            className="mt-2 max-w-xl text-sm leading-6 text-text-secondary"
          >
            {dummyUser.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
            <span>
              {dummyUser.location}
            </span>

            <span>
              {dummyUser.company || "Independent"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;