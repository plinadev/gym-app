import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stay Fit Gym",
  description: "A gym and fitness website",
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
