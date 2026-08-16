"use client";

const activity = [
  2, 5, 1, 8, 12, 6, 3,
  10, 14, 4, 7, 16, 11,
  5, 2, 9, 13, 18, 12,
  6, 4, 15, 10, 8, 17,
  20, 14, 9, 5, 11, 16,
  7, 12, 18, 14, 9, 21,
  17, 13, 6, 10, 15, 19,
  11, 8, 14, 17, 22, 16,
  12, 7, 5, 13, 18, 20,
  15, 9, 11, 16, 19, 14,
];

const getOpacity = (value: number) => {
  if (value === 0) return "bg-border";

  if (value < 5) return "bg-white/20";

  if (value < 10) return "bg-white/35";

  if (value < 15) return "bg-white/50";

  if (value < 20) return "bg-white/70";

  return "bg-white";
};

const ActivityChart = () => {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-text-muted">
          Activity
        </p>

        <p
          data-ascii-text
          className="mt-1 text-2xl font-semibold"
        >
          Contributions
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="grid grid-cols-12 gap-1">
          {activity.map((value, index) => (
            <div
              key={index}
              className={`aspect-square ${getOpacity(value)}`}
              title={`${value} contributions`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-text-muted">
        <span>Less</span>

        <div className="flex gap-1">
          <span className="h-3 w-3 bg-border" />
          <span className="h-3 w-3 bg-white/20" />
          <span className="h-3 w-3 bg-white/35" />
          <span className="h-3 w-3 bg-white/50" />
          <span className="h-3 w-3 bg-white/70" />
          <span className="h-3 w-3 bg-white" />
        </div>

        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityChart;