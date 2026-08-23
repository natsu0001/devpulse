"use client";

import { useState } from "react";

import type {
  GitHubDashboardData,
} from "@/types/github";

type ComparisonUser = GitHubDashboardData;

const ComparePage = () => {
  const [usernameA, setUsernameA] =
    useState("torvalds");

  const [usernameB, setUsernameB] =
    useState("gaearon");

  const [userA, setUserA] =
    useState<ComparisonUser | null>(null);

  const [userB, setUserB] =
    useState<ComparisonUser | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const compareUsers = async () => {
    const first =
      usernameA.trim();

    const second =
      usernameB.trim();

    if (!first || !second) {
      setError(
        "Enter two GitHub usernames."
      );

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [
        responseA,
        responseB,
      ] = await Promise.all([
        fetch(
          `/api/github/${encodeURIComponent(
            first
          )}`
        ),

        fetch(
          `/api/github/${encodeURIComponent(
            second
          )}`
        ),
      ]);

      const dataA =
        await responseA.json();

      const dataB =
        await responseB.json();

      if (!responseA.ok) {
        throw new Error(
          dataA.message ??
            `Could not load ${first}.`
        );
      }

      if (!responseB.ok) {
        throw new Error(
          dataB.message ??
            `Could not load ${second}.`
        );
      }

      setUserA(dataA);
      setUserB(dataB);
    } catch (error) {
      setUserA(null);
      setUserB(null);

      setError(
        error instanceof Error
          ? error.message
          : "Comparison failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10">
      {/* Header */}

      <div className="mb-8">
        <p className="text-sm text-text-muted">
          Developer Analytics
        </p>

        <h1
          data-ascii-text
          className="mt-2 text-3xl font-semibold tracking-tight"
        >
          Compare Developers
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
          Compare GitHub developers,
          repositories, stars, forks, and
          followers.
        </p>
      </div>

      {/* Inputs */}

      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        <div className="bg-surface p-5">
          <label className="text-xs text-text-muted">
            Developer 01
          </label>

          <input
            type="text"
            value={usernameA}
            onChange={(event) =>
              setUsernameA(
                event.target.value
              )
            }
            placeholder="GitHub username"
            className="mt-3 min-h-12 w-full border border-border bg-transparent px-4 text-sm text-white outline-none placeholder:text-text-muted focus:border-border-strong"
          />
        </div>

        <div className="bg-surface p-5">
          <label className="text-xs text-text-muted">
            Developer 02
          </label>

          <input
            type="text"
            value={usernameB}
            onChange={(event) =>
              setUsernameB(
                event.target.value
              )
            }
            placeholder="GitHub username"
            className="mt-3 min-h-12 w-full border border-border bg-transparent px-4 text-sm text-white outline-none placeholder:text-text-muted focus:border-border-strong"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={compareUsers}
        disabled={loading}
        className="mt-4 border border-border-strong px-6 py-3 text-sm transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Comparing..."
          : "Compare developers"}
      </button>

      {/* Error */}

      {error && (
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="text-sm font-medium">
            Comparison failed
          </p>

          <p className="mt-2 text-sm text-text-muted">
            {error}
          </p>
        </div>
      )}

      {/* Comparison */}

      {userA && userB && (
        <ComparisonResults
          userA={userA}
          userB={userB}
        />
      )}
    </main>
  );
};

type ComparisonResultsProps = {
  userA: ComparisonUser;
  userB: ComparisonUser;
};

const ComparisonResults = ({
  userA,
  userB,
}: ComparisonResultsProps) => {
  const languages = Array.from(
    new Set([
      ...userA.analytics.languages.map(
        (language) => language.name
      ),
      ...userB.analytics.languages.map(
        (language) => language.name
      ),
    ])
  );

  return (
    <section className="mt-10">
      {/* Profiles */}

      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        <DeveloperCard data={userA} />

        <DeveloperCard data={userB} />
      </div>

      {/* Performance */}

      <div className="mt-6 border border-border bg-surface p-6">
        <div className="mb-6">
          <p className="text-sm text-text-muted">
            Performance
          </p>

          <h3
            data-ascii-text
            className="mt-1 text-lg font-semibold"
          >
            Developer Comparison
          </h3>
        </div>

        <div className="space-y-6">
          <ComparisonBar
            label="Stars"
            valueA={userA.analytics.totalStars}
            valueB={userB.analytics.totalStars}
          />

          <ComparisonBar
            label="Forks"
            valueA={userA.analytics.totalForks}
            valueB={userB.analytics.totalForks}
          />

          <ComparisonBar
            label="Followers"
            valueA={userA.user.followers}
            valueB={userB.user.followers}
          />

          <ComparisonBar
            label="Repositories"
            valueA={userA.user.repositories}
            valueB={userB.user.repositories}
          />
        </div>
      </div>

      {/* Stats */}

      <div className="mt-6 border border-border">
        <ComparisonRow
          label="Repositories"
          valueA={userA.user.repositories}
          valueB={userB.user.repositories}
        />

        <ComparisonRow
          label="Followers"
          valueA={userA.user.followers}
          valueB={userB.user.followers}
        />

        <ComparisonRow
          label="Following"
          valueA={userA.user.following}
          valueB={userB.user.following}
        />

        <ComparisonRow
          label="Total Stars"
          valueA={userA.analytics.totalStars}
          valueB={userB.analytics.totalStars}
        />

        <ComparisonRow
          label="Total Forks"
          valueA={userA.analytics.totalForks}
          valueB={userB.analytics.totalForks}
        />

        <ComparisonRow
          label="Average Stars"
          valueA={userA.analytics.averageStars}
          valueB={userB.analytics.averageStars}
        />
      </div>

      {/* Languages */}

      <div className="mt-6 border border-border bg-surface">
        <div className="border-b border-border p-5">
          <p className="text-sm text-text-muted">
            Languages
          </p>

          <h3
            data-ascii-text
            className="mt-1 text-lg font-semibold"
          >
            Language Distribution
          </h3>
        </div>

        <div className="divide-y divide-border">
          {languages.map((language) => {
            const languageA =
              userA.analytics.languages.find(
                (item) =>
                  item.name === language
              );

            const languageB =
              userB.analytics.languages.find(
                (item) =>
                  item.name === language
              );

            return (
              <div
                key={language}
                className="grid grid-cols-3 gap-4 p-5"
              >
                {/* Developer A */}

                <div>
                  <p className="text-sm">
                    {languageA
                      ? `${languageA.percentage}%`
                      : "—"}
                  </p>

                  <div className="mt-2 h-1 bg-border">
                    <div
                      className="h-full bg-white"
                      style={{
                        width: `${languageA?.percentage ?? 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Language */}

                <div className="flex items-center justify-center text-xs uppercase tracking-wider text-text-muted">
                  {language}
                </div>

                {/* Developer B */}

                <div className="text-right">
                  <p className="text-sm">
                    {languageB
                      ? `${languageB.percentage}%`
                      : "—"}
                  </p>

                  <div className="mt-2 ml-auto h-1 bg-border">
                    <div
                      className="ml-auto h-full bg-white"
                      style={{
                        width: `${languageB?.percentage ?? 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

type DeveloperCardProps = {
  data: ComparisonUser;
};

const DeveloperCard = ({
  data,
}: DeveloperCardProps) => {
  const { user } = data;

  return (
    <div className="bg-surface p-6">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.username}
          className="h-16 w-16 border border-border object-cover"
        />

        <div>
          <p className="text-xs text-text-muted">
            @{user.username}
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            {user.name}
          </h2>
        </div>
      </div>

      {user.bio && (
        <p className="mt-5 text-sm leading-6 text-text-muted">
          {user.bio}
        </p>
      )}
    </div>
  );
};

type ComparisonRowProps = {
  label: string;
  valueA: number;
  valueB: number;
};

const ComparisonRow = ({
  label,
  valueA,
  valueB,
}: ComparisonRowProps) => {
  const winner =
    valueA > valueB
      ? "a"
      : valueB > valueA
        ? "b"
        : "tie";

  return (
    <div className="grid grid-cols-3 border-b border-border last:border-b-0">
      <div
        className={`bg-surface p-4 text-sm ${
          winner === "a"
            ? "font-semibold text-white"
            : "text-text-muted"
        }`}
      >
        {valueA.toLocaleString()}

        {winner === "a" && (
          <span className="ml-2 text-xs text-text-muted">
            WIN
          </span>
        )}
      </div>

      <div className="flex items-center justify-center bg-surface p-4 text-xs font-medium uppercase tracking-wider text-text-muted">
        {label}
      </div>

      <div
        className={`bg-surface p-4 text-right text-sm ${
          winner === "b"
            ? "font-semibold text-white"
            : "text-text-muted"
        }`}
      >
        {winner === "b" && (
          <span className="mr-2 text-xs text-text-muted">
            WIN
          </span>
        )}

        {valueB.toLocaleString()}
      </div>
    </div>
  );
};
type ComparisonBarProps = {
  label: string;
  valueA: number;
  valueB: number;
};

const ComparisonBar = ({
  label,
  valueA,
  valueB,
}: ComparisonBarProps) => {
  const total = valueA + valueB;

  const percentageA =
    total === 0
      ? 50
      : (valueA / total) * 100;

  const percentageB =
    total === 0
      ? 50
      : (valueB / total) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-text-muted">
          {valueA.toLocaleString()}
        </span>

        <span className="uppercase tracking-wider text-text-muted">
          {label}
        </span>

        <span className="text-text-muted">
          {valueB.toLocaleString()}
        </span>
      </div>

      <div className="flex h-2 w-full bg-border">
        <div
          className="bg-white"
          style={{
            width: `${percentageA}%`,
          }}
        />

        <div
          className="bg-text-muted"
          style={{
            width: `${percentageB}%`,
          }}
        />
      </div>
    </div>
  );
};
export default ComparePage;