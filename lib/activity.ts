import type {
  ActivityDay,
  GitHubActivity,
} from "@/types/github";

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
};

export function calculateActivity(
  events: GitHubEvent[]
): GitHubActivity {
  const counts: Record<
    string,
    number
  > = {};

  events.forEach((event) => {
    const date =
      event.created_at.split("T")[0];

    counts[date] =
      (counts[date] ?? 0) + 1;
  });

  const days: ActivityDay[] =
    Object.entries(counts)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort(
        (a, b) =>
          a.date.localeCompare(b.date)
      );

  return {
    totalEvents: events.length,
    days,
  };
}