"use client";

import ProfileLayoutScreen from "@/lib/ui/layouts/protected/profile";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProfileLayoutScreen>{children}</ProfileLayoutScreen>;
}
