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
import { pageMetadata } from "@/lib/page-metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...pageMetadata({ path: "/" }),
  metadataBase: new URL(site.url),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/kliqnet-20260916.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icons/kliqnet-32-20260916.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/kliqnet-48-20260916.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/kliqnet-20260916.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/icons/kliqnet-20260916.ico",
    apple: [{ url: "/icons/kliqnet-180-20260916.png", sizes: "180x180", type: "image/png" }],
  },
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
