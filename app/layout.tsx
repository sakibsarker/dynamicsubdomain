import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { getWebsiteByUrl, getBusinessLogo } from "@/lib/api";
import LayoutClient from "@/components/LayoutClient";
import WebsiteNotFound from "@/components/WebsiteNotFound";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");
  if (!subdomain) return { title: "Website" };

  const data = await getWebsiteByUrl(subdomain);
  if (!data) return { title: "Website Not Found" };

  const logoData = await getBusinessLogo(data.created_by);
  return {
    title: logoData?.business_name || data.website_url,
    description: data.section_title_one || "Welcome",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  // No subdomain — show a simple landing
  if (!subdomain) {
    return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    );
  }

  const data = await getWebsiteByUrl(subdomain);

  if (!data) {
    return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <WebsiteNotFound />
        </body>
      </html>
    );
  }

  const logoData = await getBusinessLogo(data.created_by);
  const themeName = data.theme_name ?? "template_one";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LayoutClient data={data} logoData={logoData} themeName={themeName}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
