type StatsCardProps = {
  label: string;
  value: string | number;
  description?: string;
};

const StatsCard = ({
  label,
  value,
  description,
}: StatsCardProps) => {
  return (
    <article className="border border-border bg-surface p-5">
      <p className="text-sm text-text-muted">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold tracking-tight">
        {value}
      </p>

      {description && (
        <p className="mt-2 text-xs text-text-secondary">
          {description}
        </p>
      )}
    </article>
  );
};

export default StatsCard;