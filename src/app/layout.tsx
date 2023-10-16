import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/shadcn-ui/ui/toaster";
import { ProModal } from "@/components/proModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Companion",
  description: "AI Companion webapp created by Chandrabhan Singh Rathore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="shortcut icon"
            href={"./favicon.ico"}
            type="image/x-icon"
          />
        </head>
        <body className={cn("", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
          >
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
