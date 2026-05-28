import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IvyBek — Top University Admissions for Uzbek Students",
  description:
    "IvyBek has helped Uzbek students gain admission to MIT, Harvard, Columbia, and Carnegie Mellon — many with 100% scholarships. Start your journey today.",
  openGraph: {
    title: "IvyBek — Top University Admissions for Uzbek Students",
    description:
      "Proven results: MIT, Harvard, Columbia, Carnegie Mellon. 100% scholarships. Get a free consultation.",
    url: "https://ivybek.com",
    siteName: "IvyBek",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
