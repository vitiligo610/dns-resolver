
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import SplashPage from "@/components/splash-page"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SplashScreen from "@/components/ui/splash-ui";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background h-screen flex flex-col`}>
        <SplashPage/>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}