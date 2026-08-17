"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import type {
  GitHubActivity,
} from "@/types/github";

type ActivityChartProps = {
  activity?: GitHubActivity;
};

const ActivityChart = ({
  activity,
}: ActivityChartProps) => {
  const data =
    activity?.days?.slice(-30) ?? [];

  const totalEvents =
    activity?.totalEvents ?? 0;

  return (
    <div className="h-full">

      <div className="mb-8 flex items-end justify-between">

        <div>
          <p className="text-sm text-text-muted">
            Activity
          </p>

          <h3
            data-ascii-text
            className="mt-1 text-xl font-semibold"
          >
            Recent activity
          </h3>
        </div>

        <span className="text-xs text-text-muted">
          {totalEvents} events
        </span>

      </div>

      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center border border-dashed border-border text-sm text-text-muted">
          No recent activity found.
        </div>
      ) : (
        <div className="h-64 w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >

              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.35)"
                tick={{
                  fill: "rgba(255,255,255,0.45)",
                  fontSize: 10,
                }}
                tickFormatter={(date) =>
                  date.slice(5)
                }
              />

              <Tooltip
                cursor={{
                  fill: "rgba(255,255,255,0.04)",
                }}
                contentStyle={{
                  background: "#0a0a0a",
                  border:
                    "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 0,
                }}
                labelStyle={{
                  color: "#ffffff",
                }}
              />

              <Bar
                dataKey="count"
                fill="#ffffff"
                radius={0}
                barSize={8}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
};

export default ActivityChart;