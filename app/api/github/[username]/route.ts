import { NextResponse } from "next/server";

import { calculateAnalytics } from "@/lib/analytics";

import { calculateActivity } from "@/lib/activity";

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
  const trimmedUsername =
  username.trim();

if (!trimmedUsername) {
  return NextResponse.json(
    {
      error: "INVALID_USERNAME",
      message:
        "A GitHub username is required.",
    },
    { status: 400 }
  );
}

if (
  !/^[a-zA-Z0-9-]+$/.test(
    trimmedUsername
  )
) {
  return NextResponse.json(
    {
      error: "INVALID_USERNAME",
      message:
        "The GitHub username contains invalid characters.",
    },
    { status: 400 }
  );
}

  if (!username) {
    return NextResponse.json(
      {
        message: "Username is required",
      },
      { status: 400 }
    );
  }

  try {
    // -------------------------
    // USER
    // -------------------------

    const userResponse = await fetch(
      `${GITHUB_API}/users/${encodeURIComponent(
        username
      )}`,
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
    error: "USER_NOT_FOUND",
    message:
      `GitHub user "${username}" was not found.`,
  },
  {
    status: 404,
  }
      );
    }

    if (!userResponse.ok) {
      return NextResponse.json(
        {
          message:
            "GitHub API request failed",
        },
        {
          status:
            userResponse.status,
        }
      );
    }

    const user = await userResponse.json();

    // -------------------------
    // REPOSITORIES
    // -------------------------

    const repositories = [];

    const perPage = 100;

    let page = 1;

    while (true) {
      const repositoriesResponse =
        await fetch(
          `${GITHUB_API}/users/${encodeURIComponent(
            username
          )}/repos?per_page=${perPage}&page=${page}&sort=updated`,
          {
            headers,
            next: {
              revalidate: 60,
            },
          }
        );

     if (
  repositoriesResponse.status === 403 ||
  repositoriesResponse.status === 429
) {
  return NextResponse.json(
    {
      error: "RATE_LIMIT",
      message:
        "GitHub API rate limit has been reached. Please try again later.",
    },
    {
      status: repositoriesResponse.status,
    }
  );
}

if (!repositoriesResponse.ok) {
  return NextResponse.json(
    {
      error: "REPOSITORIES_ERROR",
      message:
        "Could not load GitHub repositories.",
    },
    {
      status: repositoriesResponse.status,
    }
  );
}

      const pageRepositories =
        await repositoriesResponse.json();

      repositories.push(
        ...pageRepositories
      );

      // No more pages
      if (
        pageRepositories.length <
        perPage
      ) {
        break;
      }

      page++;
    }


    // -------------------------
    // ACTIVITY 
    // -------------------------

    const eventsResponse = await fetch(
  `${GITHUB_API}/users/${encodeURIComponent(
    username
  )}/events/public?per_page=100`,
  {
    headers,
    next: {
      revalidate: 60,
    },
  }
);

if (
  eventsResponse.status === 403 ||
  eventsResponse.status === 429
) {
  return NextResponse.json(
    {
      error: "RATE_LIMIT",
      message:
        "GitHub API rate limit has been reached. Please try again later.",
    },
    {
      status: eventsResponse.status,
    }
  );
}

if (!eventsResponse.ok) {
  return NextResponse.json(
    {
      error: "ACTIVITY_ERROR",
      message:
        "Could not load GitHub activity.",
    },
    {
      status: eventsResponse.status,
    }
  );
}

const events =
  await eventsResponse.json();

  const activity = calculateActivity(events);

    // -------------------------
    // NORMALIZE USER
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
      createdAt: user.created_at,
    
    };

    // -------------------------
    // NORMALIZE REPOSITORIES
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
            repository.language ?? "",
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

    // -------------------------
    // ANALYTICS
    // -------------------------

    const analytics =
      calculateAnalytics(
        normalizedRepositories
      );

    return NextResponse.json({
      user: normalizedUser,
      repositories:
        normalizedRepositories,
      analytics,
      activity,
    });
  } catch (error) {
    console.error(
      "GitHub API error:",
      error
    );

    return NextResponse.json(
      {
        error: "GITHUB_ERROR",
        message:
          "GitHub could not process the request.",
      },
      {
        status: 500,
      }
    );
  }
}