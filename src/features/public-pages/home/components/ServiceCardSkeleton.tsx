// src/features/public-pages/home/components/ServiceCardSkeleton.tsx
export const ServiceCardSkeleton = () => {
  return (
    <div className="h-112 p-8 rounded-[2.5rem] bg-slate-50 border-b-8 border-slate-100 flex flex-col justify-between animate-pulse">
      {/* Icon Placeholder */}
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-200" />
      </div>

      {/* Text Content Placeholder */}
      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
          <div className="h-6 bg-slate-200 rounded-lg w-1/2" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded-md w-full" />
          <div className="h-3 bg-slate-200 rounded-md w-full" />
          <div className="h-3 bg-slate-200 rounded-md w-2/3" />
        </div>

        {/* Action Link Placeholder */}
        <div className="pt-4">
          <div className="h-3 bg-slate-100 rounded-md w-24" />
        </div>
      </div>
    </div>
  );
};
