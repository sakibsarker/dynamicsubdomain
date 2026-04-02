import { headers } from "next/headers";
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
