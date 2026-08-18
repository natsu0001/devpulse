import { notFound } from "next/navigation";

import Dashboard from "@/app/components/dashboard/Dashboard";
import type { GitHubDashboardData } from "@/types/github";

type GitHubPageProps = {
  params: Promise<{
    username: string;
  }>;
};

async function getGitHubData(
  username: string
): Promise<GitHubDashboardData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/github/${encodeURIComponent(username)}`,
      {
        cache: "no-store",
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(
        body.message ||
          "Failed to load GitHub data."
      );
    }

    return body;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Unable to connect to GitHub."
    );
  }
}

const GitHubProfilePage = async ({
  params,
}: GitHubPageProps) => {
  const { username } = await params;

  const data = await getGitHubData(username);

  return <Dashboard data={data} />;
};

export default GitHubProfilePage;