import { notFound } from "next/navigation";

import Dashboard from "@/app/components/dashboard/Dashboard";
import type { GitHubDashboardData } from "@/types/github";

type GitHubPageProps = {
  params: Promise<{
    username: string;
  }>;
};

type GitHubApiError = {
  error?: string;
  message?: string;
};

async function getGitHubData(
  username: string
): Promise<GitHubDashboardData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/github/${encodeURIComponent(username)}`,
    {
      cache: "no-store",
    }
  );

  const body =
    (await response.json()) as
      | GitHubDashboardData
      | GitHubApiError;

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    const errorBody =
      body as GitHubApiError;

    throw new Error(
      errorBody.message ??
        "GitHub API request failed."
    );
  }

  return body as GitHubDashboardData;
}

const GitHubProfilePage = async ({
  params,
}: GitHubPageProps) => {
  const { username } = await params;

  if (!username.trim()) {
    notFound();
  }

  const data =
    await getGitHubData(username);

  return <Dashboard data={data} />;
};

export default GitHubProfilePage;