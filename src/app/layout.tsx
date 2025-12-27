import type { Metadata } from "next";
import "./globals.css";
import { BackgroundTexture } from "@/components/ui/BackgroundTexture";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import { Analytics } from "@vercel/analytics/next";
import Preloader from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: "ELITE Club | Where Leaders are Forged",
  description: "Entrepreneurship, Leadership, Innovation, Training, Exposure. Join the community where future leaders are forged.",
  keywords: ["ELITE", "leadership", "entrepreneurship", "innovation", "technology", "club"],
  openGraph: {
    title: "ELITE Club",
    description: "Where Leaders are Forged",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-foreground antialiased font-satoshi relative">
        <BackgroundTexture />
        <NoiseOverlay />
        <Preloader />
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}