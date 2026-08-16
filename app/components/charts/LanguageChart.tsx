"use client";

const languages = [
  {
    name: "C",
    percentage: 48,
  },
  {
    name: "C++",
    percentage: 24,
  },
  {
    name: "Python",
    percentage: 14,
  },
  {
    name: "Shell",
    percentage: 8,
  },
  {
    name: "Other",
    percentage: 6,
  },
];

const LanguageChart = () => {
  return (
    <div className="h-full">
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

      <div className="space-y-5">
        {languages.map((language) => (
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
                className="h-full bg-white transition-all"
                style={{
                  width: `${language.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageChart;