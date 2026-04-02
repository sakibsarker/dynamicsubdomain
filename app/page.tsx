import { headers } from "next/headers";
import { getWebsiteByUrl } from "@/lib/api";
import HomeContent from "@/components/pages/HomeContent";

export default async function HomePage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  if (!subdomain) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50">
        <main className="flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            Dynamic Subdomain App
          </h1>
          <p className="text-lg text-zinc-600">
            No subdomain detected. Try accessing via a subdomain like:
          </p>
          <div className="flex flex-col gap-2 text-sm text-zinc-500">
            <code className="bg-zinc-100 px-3 py-1 rounded">example1.localhost:3001</code>
            <code className="bg-zinc-100 px-3 py-1 rounded">sakib.localhost:3001</code>
          </div>
        </main>
      </div>
    );
  }

  const data = await getWebsiteByUrl(subdomain);
  if (!data) return null;

  return <HomeContent data={data} />;
}
