// src/features/public-pages/blog/components/BlogPostSkeleton.tsx
export default function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 animate-pulse">
      {/* Skeleton del Header */}
      <div className="h-[60vh] bg-slate-200 w-full" />

      <div className="container max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-xl">
          {/* Excerpt Skeleton */}
          <div className="h-20 w-full bg-slate-100 rounded-lg mb-12 border-l-4 border-slate-200" />

          {/* Body Content Skeleton */}
          <div className="space-y-6">
            <div className="h-6 w-full bg-slate-100 rounded" />
            <div className="h-6 w-5/6 bg-slate-100 rounded" />
            <div className="h-6 w-full bg-slate-100 rounded" />
            <div className="h-75 w-full bg-slate-100 rounded-4xl my-8" />
            <div className="h-6 w-4/6 bg-slate-100 rounded" />
          </div>

          {/* Navigation Skeleton */}
          <div className="mt-12 flex gap-4">
            <div className="h-20 flex-1 bg-slate-50 rounded-2xl" />
            <div className="h-20 flex-1 bg-slate-50 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
