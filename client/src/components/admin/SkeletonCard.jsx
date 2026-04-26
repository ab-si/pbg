export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-soft p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-100 rounded-full" />
          <div>
            <div className="h-4 w-28 bg-gray-100 rounded-full mb-1.5" />
            <div className="h-3 w-16 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="h-3 w-12 bg-gray-100 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="h-3 w-full bg-gray-100 rounded-full" />
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gray-100 rounded-full" />
          <div className="h-6 w-24 bg-gray-100 rounded-full" />
          <div className="h-6 w-16 bg-gray-100 rounded-full" />
        </div>
        <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-gray-100 rounded-2xl" />
          <div className="h-8 w-20 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
