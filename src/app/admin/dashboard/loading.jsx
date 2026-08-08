export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse ">
      {/* Banner Skeleton */}
      <div className="bg-slate-200 rounded-[32px] h-48 w-full"></div>

      {/* Grid of stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl h-28 flex items-center justify-between shadow-sm">
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-slate-200 rounded w-24"></div>
              <div className="h-8 bg-slate-250 rounded w-12"></div>
              <div className="h-3 bg-slate-100 rounded w-20"></div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-100 shrink-0"></div>
          </div>
        ))}
      </div>

      {/* Bottom Layout Skeletons */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm h-96 space-y-4">
          <div className="h-5 bg-slate-200 rounded w-32"></div>
          <div className="h-3 bg-slate-100 rounded w-24"></div>
          <div className="space-y-3 pt-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-28"></div>
                  <div className="h-3 bg-slate-100 rounded w-16"></div>
                </div>
                <div className="h-5 bg-slate-150 rounded w-16"></div>
                <div className="h-4 bg-slate-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm h-96 space-y-4">
          <div className="h-5 bg-slate-250 rounded w-32"></div>
          <div className="h-3 bg-slate-100 rounded w-full"></div>
          <div className="space-y-3 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-55 rounded-2xl border border-slate-100"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
