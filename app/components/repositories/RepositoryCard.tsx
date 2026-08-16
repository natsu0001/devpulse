import type { Repository } from "@/types/github";

type RepositoryCardProps = {
  repository: Repository;
};

const RepositoryCard = ({
  repository,
}: RepositoryCardProps) => {
  const updatedDate =
    new Date(
      repository.updatedAt
    ).toLocaleDateString();

  return (
    <article className="group bg-surface p-6 transition-colors hover:bg-surface-hover">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            data-ascii-text
            className="font-medium"
          >
            {repository.name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-text-muted">
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
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 bg-white/70" />
          {repository.language}
        </span>

        <span>
          ★{" "}
          {repository.stars.toLocaleString()}
        </span>

        <span>
          Forks{" "}
          {repository.forks.toLocaleString()}
        </span>

        <span className="ml-auto">
          Updated {updatedDate}
        </span>
      </div>
    </article>
  );
};

export default RepositoryCard;