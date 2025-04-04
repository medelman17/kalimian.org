import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { keywords, url } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(url),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  keywords: keywords,
  title:
    "When David Takes On Goliath | Kalimian and the Inequities (Unofficial Bootleg)",
  description:
    "A legally complicated concept album chronicling tenant resistance, procedural rage, and emotional decibels at 10 Ocean Blvd. The first and final release by a band now bankrupt in spirit—and in court.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title:
      "When David Takes On Goliath | Kalimian and the Inequities (Unofficial Bootleg)",
    description:
      "A concept album forged in housing hell. From false promises to legal brinkmanship at 10 Ocean Blvd. Filed under: Limited Liability Rock.",
    images: [
      {
        url: "/images/album-cover.png",
        width: 1200,
        height: 1200,
        alt: "When David Takes On Goliath album cover",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName:
      "When David Takes On Goliath | Kalimian and the Inequities (Unofficial Bootleg)",
  },
  twitter: {
    card: "summary_large_image",
    title: "When David Takes On Goliath",
    description:
      "From lease to lawsuit in ten brutal acts. The Kalimian Organization presents: its greatest hit—and final release.",
    images: ["/images/album-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
