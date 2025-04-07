"use client";

// import ProfileLayoutScreen from "@/lib/ui/layouts/protected/profile";

export default function ProfileRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // return <ProfileLayoutScreen>{children}</ProfileLayoutScreen>;
  return <div>{children}</div>
}
