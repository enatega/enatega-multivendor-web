"use client";

import ProtectedHomeLayout from "@/lib/ui/layouts/protected/home";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedHomeLayout>{children}</ProtectedHomeLayout>;
}
