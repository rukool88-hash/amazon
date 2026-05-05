import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HKShot Clone",
  description: "AI 电商素材平台骨架",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
