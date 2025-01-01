import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Daily Act of Kindness",
  description:
    "A simple and easy web app to generate daily acts of kindness and make people aware of the importance of kindness.",
  openGraph: {
    title: "Daily Act of Kindness",
    description:
      "A simple and easy web app to generate daily acts of kindness and make people aware of the importance of kindness.",
    siteName: "Frento",
  },
  twitter: {
    title: "Daily Act of Kindness",
    description:
      "A simple and easy web app to generate daily acts of kindness and make people aware of the importance of kindness.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
  );
}
