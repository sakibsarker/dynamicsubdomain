import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSkeleton />
      <main className="flex-1">
        <div className="bg-gray-800 py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          </div>
        </div>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </section>
      </main>
      <FooterSkeleton />
    </div>
  );
}
