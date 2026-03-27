// src/components/skeletons/RecentPostGridSkeleton.tsx
export const RecentPostSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-125 w-full rounded-[2.5rem] bg-slate-100 
          animate-pulse flex flex-col justify-between p-10"
        >
          <div className="flex justify-between">
            <div className="h-6 w-24 bg-slate-200 rounded-full" />
            <div className="h-6 w-16 bg-slate-200 rounded-full" />
          </div>
          <div className="space-y-4">
            <div className="h-8 w-full bg-slate-200 rounded-lg" />
            <div className="h-8 w-3/4 bg-slate-200 rounded-lg" />
            <div className="h-4 w-32 bg-slate-200 rounded-md mt-6" />
          </div>
        </div>
      ))}
    </div>
  );
};
