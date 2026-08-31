import type { Repository } from "@/types/github";

type RepositoryCardProps = {
  repository: Repository;
};

const RepositoryCard = ({
  repository,
}: RepositoryCardProps) => {
  const updatedDate = new Date(
    repository.updatedAt
  ).toLocaleDateString();

  const githubUrl = `https://github.com/${repository.owner.username}/${repository.name}`;

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-surface p-6 transition-colors hover:bg-surface-hover"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h3
              data-ascii-text
              className="truncate font-medium"
            >
              {repository.name}
            </h3>

            <span className="shrink-0 text-xs text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
              ↗
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
            {repository.description}
          </p>
        </div>

        <span className="shrink-0 border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-text-muted">
          {repository.isPrivate
            ? "Private"
            : "Public"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-text-muted">
        {repository.language && (
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-white/70" />
            {repository.language}
          </span>
        )}

        <span>
          ★ {repository.stars.toLocaleString()}
        </span>

        <span>
          Forks {repository.forks.toLocaleString()}
        </span>

        <span className="ml-auto">
          Updated {updatedDate}
        </span>
      </div>
    </a>
  );
};

export default RepositoryCard;