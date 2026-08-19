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
  const isRateLimit =
    error.message.toLowerCase().includes("rate limit");

  return (
    <ErrorState
      title={
        isRateLimit
          ? "GitHub rate limit reached"
          : "Unable to load profile"
      }
      message={
        isRateLimit
          ? "GitHub has temporarily limited API requests. Please wait a little while and try again."
          : error.message ||
            "We couldn't load this GitHub profile. Please try again."
      }
      onRetry={reset}
    />
  );
};

export default ErrorPage;