import { headers } from "next/headers";
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
