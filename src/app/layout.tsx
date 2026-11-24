import type { Metadata } from "next";
import { EVENT_CONFIG } from "@/config/event";
import "./globals.css";

export const metadata: Metadata = {
  title: `Farewell Party ${EVENT_CONFIG.internGroup.name} | Undangan Resmi`,
  description: EVENT_CONFIG.event.subtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-[#A855F7] selection:text-white">
        {children}
      </body>
    </html>
  );
}
