import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
};

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      username: string;
    }>;
  }
) {
  const { username } = await context.params;

  if (!username) {
    return NextResponse.json(
      {
        message: "Username is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // -------------------------
    // Get user
    // -------------------------

    const userResponse = await fetch(
      `${GITHUB_API}/users/${encodeURIComponent(username)}`,
      {
        headers,
        next: {
          revalidate: 60,
        },
      }
    );

    if (userResponse.status === 404) {
      return NextResponse.json(
        {
          message: "GitHub user not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!userResponse.ok) {
      return NextResponse.json(
        {
          message: "GitHub API request failed",
        },
        {
          status: userResponse.status,
        }
      );
    }

    const user = await userResponse.json();

    // -------------------------
    // Get repositories
    // -------------------------

    const repositoriesResponse =
      await fetch(
        `${GITHUB_API}/users/${encodeURIComponent(
          username
        )}/repos?per_page=10&sort=updated`,
        {
          headers,
          next: {
            revalidate: 60,
          },
        }
      );

    if (!repositoriesResponse.ok) {
      return NextResponse.json(
        {
          message:
            "Could not load repositories",
        },
        {
          status:
            repositoriesResponse.status,
        }
      );
    }

    const repositories =
      await repositoriesResponse.json();

    // -------------------------
    // Normalize user
    // -------------------------

    const normalizedUser = {
      username: user.login,
      name: user.name ?? user.login,
      bio: user.bio ?? "",
      avatar: user.avatar_url,
      location: user.location ?? "",
      company: user.company ?? "",
      repositories: user.public_repos,
      followers: user.followers,
      following: user.following,
      contributions: 0,
    };

    // -------------------------
    // Normalize repositories
    // -------------------------

    const normalizedRepositories =
      repositories.map(
        (repository: any) => ({
          id: repository.id,
          name: repository.name,
          description:
            repository.description ??
            "No description provided.",
          language:
            repository.language ??
            "Unknown",
          stars:
            repository.stargazers_count,
          forks:
            repository.forks_count,
          updatedAt:
            repository.updated_at,
          isPrivate:
            repository.private,
        })
      );

    return NextResponse.json({
      user: normalizedUser,
      repositories:
        normalizedRepositories,
    });
  } catch (error) {
    console.error(
      "GitHub API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to connect to GitHub",
      },
      {
        status: 500,
      }
    );
  }
}