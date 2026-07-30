import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Nepembe Cleaning Service | Professional Cleaning in Walvis Bay",
  description:
    "Professional cleaning services in Walvis Bay, Namibia. Sofa, upholstery, residential, office, commercial, deep cleaning and more.",
  openGraph: {
    title: "Nepembe Cleaning Service",
    description:
      "Modern, reliable cleaning services in Walvis Bay, Namibia.",
    type: "website",
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
