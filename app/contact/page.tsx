import { headers } from "next/headers";
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
