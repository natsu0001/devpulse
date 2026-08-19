import type {
  GitHubDashboardData,
} from "@/types/github";

import ProfileHeader from "./ProfileHeader";
import StatsCard from "./StatsCard";

import RepositoryCard from "@/app/components/repositories/RepositoryCard";
import LanguageChart from "@/app/components/charts/LanguageChart";
import ActivityChart from "@/app/components/charts/ActivityChart";
type DashboardProps = {
  data: GitHubDashboardData;
};

const Dashboard = ({
  data,
}: DashboardProps) => {
  const {
    user,
    analytics,
    activity,
  } = data;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">

      {/* Header */}

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

      <ProfileHeader user={user} />

      {/* Stats */}

      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">

        <StatsCard
          label="Repositories"
          value={user.repositories.toLocaleString()}
          description="Public repositories"
        />

        <StatsCard
          label="Total Stars"
          value={analytics.totalStars.toLocaleString()}
          description="Across repositories"
        />

        <StatsCard
          label="Total Forks"
          value={analytics.totalForks.toLocaleString()}
          description="Across repositories"
        />

        <StatsCard
          label="Avg. Stars"
          value={analytics.averageStars.toLocaleString()}
          description="Per repository"
        />

      </div>

      {/* Charts */}

      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-2">

        <div className="min-h-80 bg-surface p-6">
          <LanguageChart
            languages={analytics.languages}
          />
        </div>

        <div className="min-h-80 bg-surface p-6">
          <ActivityChart
             activity={activity}
           />
        </div>

      </div>

      {/* Popular repositories */}

      <div className="mt-10">

        <div className="mb-5 flex items-end justify-between">

          <div>
            <p className="text-sm text-text-muted">
              Analytics
            </p>

            <h2
              data-ascii-text
              className="mt-1 text-xl font-semibold"
            >
              Most Popular
            </h2>
          </div>

          <span className="text-xs text-text-muted">
            By stars
          </span>

        </div>

       <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
  {analytics.popularRepositories.length > 0 ? (
    analytics.popularRepositories.map(
      (repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
        />
      )
    )
  ) : (
    <div className="bg-surface p-8 md:col-span-2">
      <p className="text-sm font-medium">
        No public repositories
      </p>

      <p className="mt-2 text-sm text-text-muted">
        This developer doesn't have any
        public repositories to analyze.
      </p>
    </div>
  )}
</div>

      </div>

    </section>
  );
};

export default Dashboard;