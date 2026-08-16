type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the GitHub profile. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="mx-auto flex min-h-[400px] w-full max-w-7xl items-center justify-center px-6">
      <div className="w-full max-w-md border border-border bg-surface p-8 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center border border-border-strong text-sm">
          !
        </div>

        <h2
          data-ascii-text
          className="mt-5 text-lg font-semibold"
        >
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-text-muted">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 border border-border-strong px-5 py-2.5 text-sm transition-colors hover:bg-surface-hover"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;