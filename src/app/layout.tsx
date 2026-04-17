import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  weight: ["300", "400", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "Lanna Calendar | ปฏิทินล้านนา",
  description: "ปฏิทินล้านนา 3 มิติ เช็ควันดี วันเสีย และเก้ากอง",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={sarabun.variable}>
      <body>{children}</body>
    </html>
  );
}
