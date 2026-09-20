import type { ReactNode } from "react";

interface MobileWrapperProps {
  children: ReactNode;
}

export default function MobileWrapper({ children }: MobileWrapperProps) {
  return <main className="app-shell">{children}</main>;
}
