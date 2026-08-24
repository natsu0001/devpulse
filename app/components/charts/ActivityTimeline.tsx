import type { GitHubActivity } from "@/types/github";

type ActivityTimelineProps = {
  activity?: GitHubActivity;
};

const ActivityTimeline = ({
  activity,
}: ActivityTimelineProps) => {
  const days =
    activity?.days
      ?.filter((day) => day.count > 0)
      .slice(-10)
      .reverse() ?? [];

  if (days.length === 0) {
    return (
      <div className="border border-border bg-surface p-6">
        <p className="text-sm font-medium">
          No recent activity
        </p>

        <p className="mt-2 text-sm text-text-muted">
          GitHub hasn't returned any recent
          public activity for this user.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-surface">
      <div className="border-b border-border p-6">
        <p className="text-sm text-text-muted">
          Activity
        </p>

        <h2
          data-ascii-text
          className="mt-1 text-xl font-semibold"
        >
          Recent activity
        </h2>
      </div>

      <div className="divide-y divide-border">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-5 transition-colors hover:bg-surface-hover"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center border border-border-strong text-xs">
                ●
              </div>

              <div>
                <p className="text-sm font-medium">
                  {day.count}{" "}
                  {day.count === 1
                    ? "event"
                    : "events"}
                </p>

                <p className="mt-1 text-xs text-text-muted">
                  {new Date(
                    day.date
                  ).toLocaleDateString(
                    undefined,
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="text-xs text-text-muted">
              GitHub activity
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;