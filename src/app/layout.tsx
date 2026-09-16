import { MotionStudio } from "@/components/cinematic/MotionStudio";
import { SiteMeasurement } from "@/components/site-measurement";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kliqnet Digital | Websites, Products & Business Systems",
  description:
    "Independent digital agency and product studio. Websites, SaaS and automation, built by people who understand what it takes to run them.",
  metadataBase: new URL("https://www.kliqnetdigital.com"),
  openGraph: { type: "website", siteName: "Kliqnet Digital", locale: "en_GB" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.className,
          "antialiased bg-background text-foreground min-h-screen font-sans selection:bg-accent selection:text-white flex flex-col",
        )}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": site.url + "/#organization",
            name: site.name,
            url: site.url,
            email: site.email,
            founder: { "@type": "Person", name: site.founder },
            logo: site.url + "/brand/avatar.png",
          }}
        />
        <MotionStudio>
        <SiteMeasurement />
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        </MotionStudio>
      </body>
    </html>
  );
}
