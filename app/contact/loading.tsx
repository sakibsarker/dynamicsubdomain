import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSkeleton />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-1 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
              <ul className="space-y-3">
                {[...Array(7)].map((_, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <FooterSkeleton />
    </div>
  );
}
