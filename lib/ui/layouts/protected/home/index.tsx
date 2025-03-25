"use client";

import { IProtectedHomeLayoutComponent } from "@/lib/utils/interfaces";
import { usePathname, useRouter } from "next/navigation";

// Svg
import { CutlerySvg, HomeSvg, StoreSvg } from "@/lib/utils/assets/svg";

export default function ProtectedHomeLayout({
  children,
}: IProtectedHomeLayoutComponent) {
  const router = useRouter();
  const pathname = usePathname();

  console.log({ pathname });

  // Handler

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
    <div className="w-screen">
      <div className="flex justify-center items-center space-x-4 p-4">
        <div
          className="flex items-center gap-x-1 pt-2 pb-2 pl-4 pr-4 text-gray-500 rounded-full cursor-pointer"
          style={{
            backgroundColor: isDiscovery ? "#0EA5E9" : "white",
            color: isDiscovery ? "#FFFFFF" : "#6B7280",
          }}
          onClick={() => onChangeScreen("Discovery")}
        >
          <HomeSvg color={isDiscovery ? "#FFFFFF" : "#6B7280"} />
          <span className="font-inter font-medium text-[14px]  align-middle">
            Discovery
          </span>
        </div>

        <div
          className="flex items-center pt-2 pb-2 pl-4 pr-4 text-gray-500 rounded-full cursor-pointer"
          style={{
            backgroundColor: isRestaurants ? "#0EA5E9" : "white",
            color: isRestaurants ? "#FFFFFF" : "#6B7280",
          }}
          onClick={() => onChangeScreen("Restaurants")}
        >
          <CutlerySvg color={isRestaurants ? "#FFFFFF" : "#6B7280"} />
          <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[0px] align-middle">
            Restaurants
          </span>
        </div>

        <div
          className="flex items-center pt-2 pb-2 pl-4 pr-4 text-gray-500 rounded-full cursor-pointer"
          style={{
            backgroundColor: isStore ? "#0EA5E9" : "white",
            color: isStore ? "#FFFFFF" : "#6B7280",
          }}
          onClick={() => onChangeScreen("Store")}
        >
          <StoreSvg color={isStore ? "#FFFFFF" : "#6B7280"} />
          <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[0px] align-middle">
            Store
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
