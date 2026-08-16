import { dummyRepositories, dummyUser } from "@/data/dummy";

import ProfileHeader from "./ProfileHeader";
import StatsCard from "./StatsCard";

import RepositoryCard from "@/app/components/repositories/RepositoryCard";
import LanguageChart from "@/app/components/charts/LanguageChart";
import ActivityChart from "@/app/components/charts/ActivityChart";

const Dashboard = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">
      {/* Dashboard heading */}

      <div className="mb-8">
        <p className="text-sm text-text-muted">
          Developer Analytics
        </p>

        <h2
          data-ascii-text
          className="mt-2 text-3xl font-semibold tracking-tight"
        >
          Overview
        </h2>
      </div>

      {/* Profile */}

      <ProfileHeader />

      {/* Stats */}

      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Repositories"
          value={dummyUser.repositories}
          description="Public repositories"
        />

        <StatsCard
          label="Followers"
          value={dummyUser.followers.toLocaleString()}
          description="People following"
        />

        <StatsCard
          label="Following"
          value={dummyUser.following}
          description="Accounts following"
        />

        <StatsCard
          label="Contributions"
          value={dummyUser.contributions.toLocaleString()}
          description="Last 12 months"
        />
      </div>

      {/* Charts */}
<div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-2">
  <div className="min-h-80 bg-surface p-6">
    <LanguageChart />
  </div>

  <div className="min-h-80 bg-surface p-6">
    <ActivityChart />
  </div>
</div>

      {/* Repositories */}

      <div className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
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

          <span className="text-xs text-text-muted">
            {dummyRepositories.length} shown
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {dummyRepositories.map(
            (repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;