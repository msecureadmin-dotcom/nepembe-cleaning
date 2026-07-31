import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://nepembe-cleaning-production.up.railway.app"
  ),
  title: "Nepembe Cleaning Service | Professional Cleaning in Walvis Bay",
  description:
    "Professional cleaning services in Walvis Bay, Namibia. Sofa, upholstery, residential, office, commercial, deep cleaning and more.",
  openGraph: {
    title: "Nepembe Cleaning Service | Professional Cleaning in Walvis Bay",
    description:
      "Modern, reliable cleaning services in Walvis Bay, Namibia. Sofa, upholstery, residential, office, commercial and deep cleaning.",
    type: "website",
    url: process.env.NEXT_PUBLIC_URL || "https://nepembe-cleaning-production.up.railway.app",
    siteName: "Nepembe Cleaning Service",
    locale: "en_NA",
    images: [
      {
        url: "/assets/nepembe-logo-mark.svg",
        width: 512,
        height: 512,
        alt: "Nepembe Cleaning Service logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/nepembe-logo-mark.svg" />
      </head>
      <body>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
