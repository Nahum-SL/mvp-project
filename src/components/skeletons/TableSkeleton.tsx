// src/components/skeletons/TableSkeleton.tsx
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 bg-slate-100 rounded-xl mb-6 w-full" />
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-12 bg-slate-50 rounded-2xl flex-1" />
            <div className="h-12 bg-slate-50 rounded-2xl flex-1" />
            <div className="h-12 bg-slate-50 rounded-2xl w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};
