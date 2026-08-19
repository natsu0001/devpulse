import type {
  Repository,
  GitHubAnalytics,
  LanguageStat,
} from "@/types/github";

export function calculateAnalytics(
  repositories: Repository[]
): GitHubAnalytics {
  const totalStars = repositories.reduce(
    (total, repository) =>
      total + repository.stars,
    0
  );

  const totalForks = repositories.reduce(
    (total, repository) =>
      total + repository.forks,
    0
  );

 const averageStars =
  repositories.length === 0
    ? 0
    : Math.round(
        totalStars /
          repositories.length
      );

  const popularRepositories =
    [...repositories]
      .sort(
        (a, b) =>
          b.stars - a.stars
      )
      .slice(0, 6);

  const languageCounts: Record<
    string,
    number
  > = {};

  repositories.forEach(
    (repository) => {
      if (!repository.language) return;

      languageCounts[
        repository.language
      ] =
        (languageCounts[
          repository.language
        ] ?? 0) + 1;
    }
  );

  const totalLanguages =
    Object.values(
      languageCounts
    ).reduce(
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
          totalLanguages > 0
            ? Math.round(
                (count /
                  totalLanguages) *
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