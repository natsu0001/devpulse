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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/github/${encodeURIComponent(username)}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(
      "Failed to fetch GitHub data"
    );
  }

  return response.json();
}

const GitHubProfilePage = async ({
  params,
}: GitHubPageProps) => {
  const { username } = await params;

  const data = await getGitHubData(username);

  return <Dashboard data={data} />;
};

export default GitHubProfilePage;