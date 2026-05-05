import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalBackdrop } from "@/components/GlobalBackdrop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = site.url;

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.author} — ${site.role}`,
    template: `%s — ${site.author}`,
  },
  description: site.intro,
  keywords: [
    "cloud engineer",
    "security engineer",
    "AWS",
    "portfolio",
    "cybersecurity",
  ],
  authors: [{ name: site.author }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: `${site.author} portfolio`,
    title: `${site.author} — ${site.role}`,
    description: site.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.author} — ${site.role}`,
    description: site.intro,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalBackdrop />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
