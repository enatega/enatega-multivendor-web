"use client";


export default function ProfileRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
{children}
  </div>;
}
