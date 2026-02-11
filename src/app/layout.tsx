import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kliqnet Digital | Building Digital Products & Growth Systems",
  description: "Full-service digital agency building scalable, future-proof software and marketing systems.",
  metadataBase: new URL("https://kliqnetdigital.com"), // Placeholder domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "antialiased bg-background text-foreground min-h-screen font-sans selection:bg-accent selection:text-white flex flex-col")}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
