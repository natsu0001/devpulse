"use client";

import type {
  LanguageStat,
} from "@/types/github";

type LanguageChartProps = {
  languages: LanguageStat[];
};

const LanguageChart = ({
  languages,
}: LanguageChartProps) => {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-text-muted">
          Languages
        </p>

        <p
          data-ascii-text
          className="mt-1 text-2xl font-semibold"
        >
          Code distribution
        </p>
      </div>

      {languages.length === 0 ? (
        <p className="text-sm text-text-muted">
          No language data available.
        </p>
      ) : (
        <div className="space-y-5">
          {languages
            .slice(0, 5)
            .map((language) => (
              <div key={language.name}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-text-secondary">
                    {language.name}
                  </span>

                  <span className="text-text-muted">
                    {language.percentage}%
                  </span>
                </div>

                <div className="h-1 w-full bg-border">
                  <div
                    className="h-full bg-white"
                    style={{
                      width: `${language.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageChart;