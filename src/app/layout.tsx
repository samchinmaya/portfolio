import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ContributionGrid } from "@/components/magicui/contribution-grid";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The site ships its own dark theme; ask dark-mode extensions (e.g. Dark Reader) not to recolour it */}
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-x-0 top-0 h-[260px] overflow-hidden z-0 flex justify-center">
              <ContributionGrid
                className="h-full w-full opacity-70 dark:opacity-80"
                style={{
                  maskImage: "linear-gradient(to bottom, black 30%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 py-12 pb-24 sm:px-10 sm:py-24 lg:px-14">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
