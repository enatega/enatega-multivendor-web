"use client";

import { IProtectedHomeLayoutComponent } from "@/lib/utils/interfaces";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: IProtectedHomeLayoutComponent) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-screen">
      <div className="flex flex-col justify-center items-center space-x-4 p-4">
        <div>Profile Header</div>
        <div>Proilfe Tabs</div>
      </div>
      {children}
    </div>
  );
}
