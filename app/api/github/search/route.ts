import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const query =
    searchParams.get("q")?.trim();

  const sort =
    searchParams.get("sort") ?? "stars";

  const page = Math.max(
    Number(searchParams.get("page") ?? "1"),
    1
  );

  if (!query) {
    return NextResponse.json(
      {
        error: "INVALID_QUERY",
        message:
          "A search query is required.",
      },
      { status: 400 }
    );
  }

  try {
    const githubUrl =
      new URL(
        `${GITHUB_API}/search/repositories`
      );

    githubUrl.searchParams.set(
      "q",
      query
    );

    githubUrl.searchParams.set(
      "sort",
      sort
    );

    githubUrl.searchParams.set(
      "order",
      "desc"
    );

    githubUrl.searchParams.set(
      "per_page",
      "20"
    );

    githubUrl.searchParams.set(
      "page",
      String(page)
    );

    const response =
      await fetch(githubUrl, {
        headers,
        next: {
          revalidate: 60,
        },
      });

    if (response.status === 403) {
      return NextResponse.json(
        {
          error: "RATE_LIMIT",
          message:
            "GitHub API rate limit reached. Please try again later.",
        },
        { status: 429 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "GITHUB_ERROR",
          message:
            "GitHub repository search failed.",
        },
        {
          status: response.status,
        }
      );
    }

    const data =
      await response.json();

    const repositories =
      data.items.map(
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
          owner: {
            username:
              repository.owner.login,
            avatar:
              repository.owner.avatar_url,
          },
        })
      );

    return NextResponse.json({
      total: data.total_count,
      repositories,
    });
  } catch (error) {
    console.error(
      "GitHub repository search error:",
      error
    );

    return NextResponse.json(
      {
        error: "NETWORK_ERROR",
        message:
          "Unable to connect to GitHub.",
      },
      { status: 500 }
    );
  }
}