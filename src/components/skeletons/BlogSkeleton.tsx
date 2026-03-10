// src/components/ui/skeletons/BlogSkeleton.tsx
export default function BlogSkeleton() {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Skeleton del Header (Simulando BlogHeader) */}
      <div className="h-[40vh] w-full bg-slate-900 animate-pulse flex items-center justify-center">
        <div className="space-y-4 w-full max-w-2xl px-6 text-center">
          <div className="h-10 w-64 bg-slate-800 mx-auto rounded-2xl" />
          <div className="h-4 w-full bg-slate-800 rounded-lg" />
        </div>
      </div>

      {/* Skeleton del FeaturedPost (El grande) */}
      <div className="container mx-auto px-6 py-12">
        <div className="relative h-125 md:h-150 w-full rounded-[3rem] bg-slate-900 animate-pulse overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 space-y-6">
            <div className="h-8 w-40 bg-slate-800 rounded-full" />
            <div className="h-16 w-3/4 bg-slate-800 rounded-2xl" />
            <div className="h-4 w-1/2 bg-slate-800 rounded-lg" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-800 rounded" />
                <div className="h-3 w-16 bg-slate-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton de la Grilla (BlogCards) */}
      <section className="py-20 container mx-auto px-6">
        <div className="h-8 w-48 bg-slate-900 animate-pulse rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-900 rounded-2xl overflow-hidden p-4 space-y-4"
            >
              <div className="aspect-4/3 w-full bg-slate-800 animate-pulse rounded-2xl" />
              <div className="h-4 w-24 bg-slate-800 rounded" />
              <div className="h-6 w-full bg-slate-800 rounded" />
              <div className="h-4 w-full bg-slate-800 rounded" />
              <div className="h-4 w-20 bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
