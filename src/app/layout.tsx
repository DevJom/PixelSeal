import type { Metadata } from "next";
import "./globals.css";

import { unstable_ViewTransition as ViewTransition } from 'react'
import { ThemeProvider } from "@/components/theme-provider";

import { Pixelify_Sans } from "next/font/google";
const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  // weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PixelSeal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <ViewTransition>
      <html lang="en" suppressHydrationWarning>
      <body className={`${pixelifySans.className} antialiased`}>
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
      </ViewTransition>
    </>
  );
}
