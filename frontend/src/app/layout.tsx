import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSV Uploader",
  description: "Upload and process CSV files easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
