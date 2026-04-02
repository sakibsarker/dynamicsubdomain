import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSkeleton />
      <main className="flex-1">
        <div className="bg-gray-800 py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse mx-auto mb-6"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </section>
      </main>
      <FooterSkeleton />
    </div>
  );
}
