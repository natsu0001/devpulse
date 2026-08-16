import type {
  GitHubDashboardData,
} from "@/types/github";

export async function getGitHubUser(
  username: string
): Promise<GitHubDashboardData> {
  const response = await fetch(
    `/api/github/${encodeURIComponent(
      username
    )}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Failed to load GitHub user"
    );
  }

  return data;
}