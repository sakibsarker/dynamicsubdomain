import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeaderSkeleton />
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-32 animate-pulse">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="h-14 w-3/4 bg-white/10 rounded-lg mx-auto"></div>
          <div className="h-6 w-2/3 bg-white/10 rounded mx-auto"></div>
          <div className="flex gap-4 justify-center mt-8">
            <div className="h-12 w-40 bg-white/20 rounded-md"></div>
            <div className="h-12 w-40 bg-white/10 rounded-md"></div>
          </div>
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16 animate-pulse">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200/60 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200/40 rounded"></div>
          </div>
          <div className="h-64 w-full bg-gray-200/50 rounded-xl"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
          <div className="h-64 w-full bg-gray-200/50 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200/60 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200/40 rounded"></div>
          </div>
        </div>
      </div>
      <FooterSkeleton />
    </div>
  );
}
