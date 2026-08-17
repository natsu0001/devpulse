import type { Repository } from "@/types/github";

export type LanguageStat = {
  name: string;
  count: number;
  percentage: number;
};

export type GitHubAnalytics = {
  totalStars: number;
  totalForks: number;
  averageStars: number;
  popularRepositories: Repository[];
  languages: LanguageStat[];
};

export function calculateAnalytics(
  repositories: Repository[]
): GitHubAnalytics {
  // -------------------------
  // Total stars
  // -------------------------

  const totalStars = repositories.reduce(
    (total, repository) =>
      total + repository.stars,
    0
  );

  // -------------------------
  // Total forks
  // -------------------------

  const totalForks = repositories.reduce(
    (total, repository) =>
      total + repository.forks,
    0
  );

  // -------------------------
  // Average stars
  // -------------------------

  const averageStars =
    repositories.length > 0
      ? Math.round(
          totalStars /
            repositories.length
        )
      : 0;

  // -------------------------
  // Most popular repositories
  // -------------------------

  const popularRepositories =
    [...repositories]
      .sort(
        (a, b) =>
          b.stars - a.stars
      )
      .slice(0, 5);

  // -------------------------
  // Language counts
  // -------------------------

  const languageCounts: Record<
    string,
    number
  > = {};

  repositories.forEach(
    (repository) => {
      if (!repository.language) {
        return;
      }

      languageCounts[
        repository.language
      ] =
        (languageCounts[
          repository.language
        ] ?? 0) + 1;
    }
  );

  const totalLanguageRepositories =
    Object.values(languageCounts).reduce(
      (total, count) =>
        total + count,
      0
    );

  const languages: LanguageStat[] =
    Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage:
          totalLanguageRepositories >
          0
            ? Math.round(
                (count /
                  totalLanguageRepositories) *
                  100
              )
            : 0,
      }))
      .sort(
        (a, b) =>
          b.count - a.count
      );

  return {
    totalStars,
    totalForks,
    averageStars,
    popularRepositories,
    languages,
  };
}