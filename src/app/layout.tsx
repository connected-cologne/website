import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import RevealObserver from "@/components/RevealObserver";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: confirm final production domain before launch — makes OG image URLs absolute
  metadataBase: new URL("https://connected-cologne.de"),
  title: "CONNECTED Cologne | Techno DJ Collective",
  description:
    "CONNECTED is a Cologne-based DJ collective spanning Techno, Trance, Groove, House and Schranz. Discover upcoming events, radio sets, and the 10 artists behind the sound.",
  keywords: [
    "DJ Cologne",
    "Connected Cologne",
    "Techno Cologne",
    "Drum and Bass Cologne",
    "DJ Kollektiv Köln",
    "Techno DJ Köln",
  ],
  openGraph: {
    title: "CONNECTED Cologne | Techno DJ Collective",
    description:
      "CONNECTED is a Cologne-based DJ collective spanning Techno, Trance, Groove, House and Schranz. Discover upcoming events, radio sets, and the 10 artists behind the sound.",
    type: "website",
    locale: "en_US",
    siteName: "CONNECTED Cologne",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CONNECTED Cologne logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <Cursor />
        <Nav />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
