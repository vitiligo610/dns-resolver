"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import SplashUI from "@/components/ui/splash-ui";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>DNS Resolver - Computer Networks OEL</title>
      </head>
      <body
        className={`${inter.className} relative antialiased bg-background h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {showSplash ? (
            <SplashUI />
          ) : (
            <>
              <Navbar />
              <main className="flex-1 container px-8 md:px-16 py-8 mx-auto">
                {children}
              </main>
              <Toaster />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
