"use client"

import type { CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IProfileTabsProps, ITabItem } from "@/lib/utils/interfaces";
import { TabItem } from "@/lib/ui/useable-components/profile-tabs";
import { profileDefaultTabs } from "@/lib/utils/constants";

export default function ProfileTabs({ className, tabs }: IProfileTabsProps & { tabs?: ITabItem[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollableStyles: CSSProperties = {
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
    WebkitOverflowScrolling: "touch", // Smooth scrolling
  };

  return (
    <div className={`w-full md:w-auto max-w-7xl border-b border-gray-200 ${className || ""}`}>
      {/* Mobile View */}
      <div className="flex overflow-x-auto md:hidden justify-between px-1" style={scrollableStyles}>
        {(tabs || profileDefaultTabs).map((tab) => (
          <TabItem
            key={tab.path}
            tab={tab}
            isActive={pathname === tab.path}
            onClick={() => router.push(tab.path)}
            className="py-3 text-sm font-medium"
          />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex space-x-8">
        {(tabs || profileDefaultTabs).map((tab) => (
          <TabItem
            key={tab.path}
            tab={tab}
            isActive={pathname === tab.path}
            onClick={() => router.push(tab.path)}
            className="py-3 px-1 text-lg font-medium"
          />
        ))}
      </div>
    </div>
  );
}
