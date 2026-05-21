import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "DesignPrompt - AI Design Analyzer",
  description:
    "Generate, refine, and organize master implementation prompts from design references using AI.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/icons-design.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8fc" },
    
    { media: "(prefers-color-scheme: dark)", color: "#1a1a24" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            theme="system"
            position="bottom-left"
            richColors

            toastOptions={{
              className:
                "border rounded-xl shadow-md font-sans bg-background text-foreground border-border",
              descriptionClassName: "text-muted-foreground text-xs",
            }}
          />
          {/* 👈 Add this right here */}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
