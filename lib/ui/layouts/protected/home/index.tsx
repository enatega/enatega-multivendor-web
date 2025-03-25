"use client";

import { IProtectedHomeLayoutComponent } from "@/lib/utils/interfaces";
import { usePathname, useRouter } from "next/navigation";

// Svg
import { CutlerySvg, HomeSvg, StoreSvg } from "@/lib/utils/assets/svg";
import PaddingContainer from "@/lib/ui/useable-components/containers/padding";

export default function HomeLayout({
  children,
}: IProtectedHomeLayoutComponent) {
  const router = useRouter();
  const pathname = usePathname();

  const onChangeScreen = (name: "Discovery" | "Restaurants" | "Store") => {
    switch (name) {
      case "Discovery":
        router.push("/discovery");
        break;
      case "Restaurants":
        router.push("/restaurants");
        break;
      case "Store":
        router.push("/store");
        break;
      default:
        router.push("/discovery");
        break;
    }
  };

  const isDiscovery = pathname === "/discovery";
  const isRestaurants = pathname === "/restaurants";
  const isStore = pathname === "/store";

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Sticky Top Tabs */}
      <div className="sticky top-0 left-0 w-full bg-white z-50">
        <div className="flex justify-center items-center space-x-2 md:space-x-4 p-2 md:p-4 overflow-x-auto">
          <div
            className="flex items-center gap-x-1 p-2 md:pt-2 md:pb-2 md:pl-4 md:pr-4 text-gray-500 rounded-full cursor-pointer transition-all duration-300 whitespace-nowrap"
            style={{
              backgroundColor: isDiscovery ? "#0EA5E9" : "white",
              color: isDiscovery ? "#FFFFFF" : "#6B7280",
            }}
            onClick={() => onChangeScreen("Discovery")}
          >
            <HomeSvg color={isDiscovery ? "#FFFFFF" : "#6B7280"} />
            <span className="font-inter font-medium text-sm md:text-[14px] hidden sm:inline">
              Discovery
            </span>
          </div>

          <div
            className="flex items-center gap-x-1 p-2 md:pt-2 md:pb-2 md:pl-4 md:pr-4 text-gray-500 rounded-full cursor-pointer transition-all duration-300 whitespace-nowrap"
            style={{
              backgroundColor: isRestaurants ? "#0EA5E9" : "white",
              color: isRestaurants ? "#FFFFFF" : "#6B7280",
            }}
            onClick={() => onChangeScreen("Restaurants")}
          >
            <CutlerySvg color={isRestaurants ? "#FFFFFF" : "#6B7280"} />
            <span className="font-inter font-medium text-sm md:text-[14px] hidden sm:inline">
              Restaurants
            </span>
          </div>

          <div
            className="flex items-center gap-x-1 p-2 md:pt-2 md:pb-2 md:pl-4 md:pr-4 text-gray-500 rounded-full cursor-pointer transition-all duration-300 whitespace-nowrap"
            style={{
              backgroundColor: isStore ? "#0EA5E9" : "white",
              color: isStore ? "#FFFFFF" : "#6B7280",
            }}
            onClick={() => onChangeScreen("Store")}
          >
            <StoreSvg color={isStore ? "#FFFFFF" : "#6B7280"} />
            <span className="font-inter font-medium text-sm md:text-[14px] hidden sm:inline">
              Store
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <PaddingContainer>{children}</PaddingContainer>
      </div>
    </div>
  );
}
