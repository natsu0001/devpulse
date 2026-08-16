import ProfileHeader from "./ProfileHeader";
import StatsCard from "./StatsCard";

const Dashboard = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-text-muted">
          Developer Analytics
        </p>

        <h1
          data-ascii-text
          className="mt-2 text-3xl font-semibold tracking-tight"
        >
          GitHub Dashboard
        </h1>

        <p
          data-ascii-text
          className="mt-2 max-w-xl text-sm leading-6 text-text-secondary"
        >
          Explore repositories, activity, languages,
          and developer statistics.
        </p>
      </div>

      {/* Profile */}
      <ProfileHeader />

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Repositories"
          value={68}
          description="Public repositories"
        />

        <StatsCard
          label="Followers"
          value="235K"
          description="People following"
        />

        <StatsCard
          label="Following"
          value={0}
          description="Accounts following"
        />

        <StatsCard
          label="Contributions"
          value="1.8K"
          description="Last 12 months"
        />
      </div>

      {/* Charts placeholder */}
      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-2">
        <div className="min-h-80 bg-surface p-6">
          <p className="text-sm text-text-muted">
            Languages
          </p>

          <div className="flex h-64 items-center justify-center">
            <span className="text-sm text-text-muted">
              Language chart
            </span>
          </div>
        </div>

        <div className="min-h-80 bg-surface p-6">
          <p className="text-sm text-text-muted">
            Activity
          </p>

          <div className="flex h-64 items-center justify-center">
            <span className="text-sm text-text-muted">
              Activity chart
            </span>
          </div>
        </div>
      </div>

      {/* Repositories placeholder */}
      <div className="mt-10">
        <div className="mb-5">
          <p className="text-sm text-text-muted">
            Projects
          </p>

          <h2
            data-ascii-text
            className="mt-1 text-xl font-semibold"
          >
            Repositories
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-surface p-6">
            <p className="font-medium">
              linux
            </p>

            <p className="mt-2 text-sm text-text-muted">
              Linux kernel source tree
            </p>
          </div>

          <div className="bg-surface p-6">
            <p className="font-medium">
              git
            </p>

            <p className="mt-2 text-sm text-text-muted">
              Git source code
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;