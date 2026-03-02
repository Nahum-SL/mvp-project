export const RecentPostSkeleton = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl space-y-4 animate-pulse">
            <div className="h-10 w-64 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-3/4 bg-slate-200 rounded" />
          </div>

          <div className="h-10 w-40 bg-slate-200 rounded-full animate-pulse" />
        </div>

        {/* Blog Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-slate-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 w-24 bg-slate-200 rounded" />
                <div className="h-6 w-full bg-slate-200 rounded" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-8 h-8 bg-slate-200 rounded-full" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
