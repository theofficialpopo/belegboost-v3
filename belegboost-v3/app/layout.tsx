import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { ColorThemeProvider } from "../lib/ColorThemeContext";
import { AuthProvider } from "../lib/AuthContext";
import { ToastProvider } from "../lib/ToastContext";
import GlobalToasts from "../components/ui/GlobalToasts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BelegBoost - Digitale Belegverarbeitung für Steuerberater",
  description: "Die moderne Lösung für digitale Belegverarbeitung und Mandantenkommunikation. Automatisieren Sie Ihre Kanzlei-Workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Blocking script for color theme (prevents flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const colorTheme = localStorage.getItem('belegboost-color-theme') || 'emerald';
                document.documentElement.setAttribute('data-theme', colorTheme);
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorThemeProvider>
            <AuthProvider>
              <ToastProvider>
                {children}
                <GlobalToasts />
              </ToastProvider>
            </AuthProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
