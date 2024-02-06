import { ThemeProvider } from "@/components/ui/theme-provider";
import { ClerkProvider, auth } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book My Box",
  description: "Booking management for box cricket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              {userId && <Header />}
              {children}
            </main>
          </ThemeProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
