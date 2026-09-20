import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import InAppBlocker from "@/components/InAppBlocker";
import MobileWrapper from "@/components/MobileWrapper";

import "./globals.css";

export const metadata: Metadata = {
  title: "향연 : 학술대동제",
  description: "2026 순천향대학교 8개 단과대 연합 축제 스탬프 투어",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF5DE",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ko">
      <body className="bg-[url('/image_ef42f7.jpg')] bg-cover bg-center bg-fixed bg-no-repeat">
        <InAppBlocker />
        <MobileWrapper>{children}</MobileWrapper>
      </body>
    </html>
  );
}
