"use client";

import ErrorState from "@/app/components/ui/ErrorState";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

const ErrorPage = ({
  error,
  reset,
}: ErrorPageProps) => {
  return (
    <ErrorState
      title="Unable to load profile"
      message={
        error.message ||
        "We couldn't load the GitHub profile. Please try again."
      }
      onRetry={reset}
    />
  );
};

export default ErrorPage;