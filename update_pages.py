#!/usr/bin/env python3
"""Replace app page files with server component wrappers"""
import os

base = '/Users/sakibsarker/Desktop/dev/eligant/dynamicsubdomain'

pages = {}

pages['app/page.tsx'] = """import { headers } from "next/headers";
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
"""

pages['app/about/page.tsx'] = """import { headers } from "next/headers";
import { getWebsiteByUrl } from "@/lib/api";
import AboutContent from "@/components/pages/AboutContent";

export default async function AboutPage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");
  if (!subdomain) return null;

  const data = await getWebsiteByUrl(subdomain);
  if (!data) return null;

  return <AboutContent data={data} />;
}
"""

pages['app/contact/page.tsx'] = """import { headers } from "next/headers";
import { getWebsiteByUrl } from "@/lib/api";
import ContactContent from "@/components/pages/ContactContent";

export default async function ContactPage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");
  if (!subdomain) return null;

  const data = await getWebsiteByUrl(subdomain);
  if (!data) return null;

  return <ContactContent data={data} />;
}
"""

pages['app/services/page.tsx'] = """import { headers } from "next/headers";
import { getWebsiteByUrl } from "@/lib/api";
import ServicesContent from "@/components/pages/ServicesContent";

export default async function ServicesPage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");
  if (!subdomain) return null;

  const data = await getWebsiteByUrl(subdomain);
  if (!data) return null;

  return <ServicesContent data={data} />;
}
"""

for path, content in pages.items():
    full_path = os.path.join(base, path)
    with open(full_path, 'w') as f:
        f.write(content)
    print(f'Written: {path}')

print('All pages updated.')
