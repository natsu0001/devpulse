const LoadingSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16">
      {/* Header */}

      <div className="mb-8">
        <div className="h-4 w-32 animate-pulse bg-border" />

        <div className="mt-3 h-9 w-64 animate-pulse bg-border" />

        <div className="mt-3 h-4 w-96 max-w-full animate-pulse bg-border" />
      </div>

      {/* Profile */}

      <div className="border border-border bg-surface p-6">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 animate-pulse bg-border" />

          <div className="flex-1">
            <div className="h-3 w-24 animate-pulse bg-border" />

            <div className="mt-3 h-6 w-48 animate-pulse bg-border" />

            <div className="mt-3 h-4 w-full max-w-xl animate-pulse bg-border" />
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map(
          (_, index) => (
            <div
              key={index}
              className="bg-surface p-5"
            >
              <div className="h-4 w-24 animate-pulse bg-border" />

              <div className="mt-4 h-9 w-20 animate-pulse bg-border" />

              <div className="mt-3 h-3 w-32 animate-pulse bg-border" />
            </div>
          )
        )}
      </div>

      {/* Charts */}

      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-2">
        <div className="min-h-80 bg-surface p-6">
          <div className="h-4 w-24 animate-pulse bg-border" />

          <div className="mt-6 space-y-5">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <div key={index}>
                  <div className="h-3 w-full animate-pulse bg-border" />
                  <div className="mt-2 h-1 w-full animate-pulse bg-border" />
                </div>
              )
            )}
          </div>
        </div>

        <div className="min-h-80 bg-surface p-6">
          <div className="h-4 w-24 animate-pulse bg-border" />

          <div className="mt-6 grid grid-cols-12 gap-1">
            {Array.from({ length: 60 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="aspect-square animate-pulse bg-border"
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Repositories */}

      <div className="mt-10">
        <div className="h-5 w-40 animate-pulse bg-border" />

        <div className="mt-5 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="bg-surface p-6"
              >
                <div className="h-4 w-32 animate-pulse bg-border" />

                <div className="mt-3 h-4 w-full animate-pulse bg-border" />

                <div className="mt-6 h-3 w-48 animate-pulse bg-border" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;