"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  LanguageStat,
} from "@/types/github";

type LanguageChartProps = {
  languages: LanguageStat[];
};

const LanguageChart = ({
  languages,
}: LanguageChartProps) => {
  const data = languages.slice(0, 6);

  return (
    <div className="h-full">
      <div className="mb-8">
        <p className="text-sm text-text-muted">
          Languages
        </p>

        <h3
          data-ascii-text
          className="mt-1 text-xl font-semibold"
        >
          Repository distribution
        </h3>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center border border-dashed border-border text-sm text-text-muted">
          No language data available.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 0,
                right: 20,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.08)"
                horizontal={false}
              />

              <XAxis
                type="number"
                stroke="rgba(255,255,255,0.4)"
                tick={{
                  fill: "rgba(255,255,255,0.5)",
                  fontSize: 11,
                }}
                allowDecimals={false}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={80}
                stroke="rgba(255,255,255,0.4)"
                tick={{
                  fill: "rgba(255,255,255,0.7)",
                  fontSize: 11,
                }}
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
                  color: "#fff",
                }}
                formatter={(
                  value,
                  name
                ) => [
                  `${value} repositories`,
                  "Count",
                ]}
              />

              <Bar
                dataKey="count"
                fill="#ffffff"
                radius={0}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default LanguageChart;