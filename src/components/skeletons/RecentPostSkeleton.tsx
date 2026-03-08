export const RecentPostSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-6">
          <div className="aspect-video bg-slate-100 animate-pulse rounded-[2.5rem]" />
          <div className="space-y-3">
            <div className="h-4 w-24 bg-slate-100 animate-pulse rounded-full" />
            <div className="h-8 w-full bg-slate-100 animate-pulse rounded-xl" />
            <div className="h-16 w-full bg-slate-50 animate-pulse rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
