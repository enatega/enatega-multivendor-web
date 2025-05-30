
// React imports
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Custom hooks
import useSingleRestaurant from "./useSingleRestaurant";

/**
 * Hook to handle redirection based on multi-vendor configuration
 * If single-vendor mode is active, redirects to the single restaurant page
 * If multi-vendor mode is active, redirects to the home page if on a single-vendor path
 */
const useSingleVendorRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Get restaurant data and multi-vendor status
  const { restaurant, restaurantId, restaurantSlug, loading, isMultiVendor } = useSingleRestaurant();

  useEffect(() => {
    // Skip redirection if still loading or on the correct path
    if (loading) return;

    // Get the current path pattern
    const isSingleVendorPath = pathname?.startsWith("/sv/");
    // const isHomePath = pathname === "/" || pathname?.startsWith("/(home)");

    // Handle redirection based on multi-vendor mode
    if (!isMultiVendor) {
      // In single-vendor mode, redirect to single vendor page
      router.push(`/sv/${restaurantId}/${restaurantSlug}`);
    } else if (isMultiVendor && isSingleVendorPath) {
      // In multi-vendor mode, redirect to home if on a single-vendor path
      console.log("Redirecting to home from single vendor path");
      router.push("/(home)");
    }
  }, [loading, isMultiVendor, restaurantId, restaurantSlug, router]);

  return {
    restaurant,
    restaurantId,
    restaurantSlug,
    loading,
    isMultiVendor
  };
};

export default useSingleVendorRedirect;