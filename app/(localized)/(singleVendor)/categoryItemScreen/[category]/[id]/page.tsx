// File: app/(localized)/(singleVendor)/categoryItemScreen/[category]/[id]/page.tsx
"use client";

import CategoryItemScreen from "@/lib/ui/screens/protected/singleVendor/categoryFoodItem";
import { useParams } from "next/navigation";

export default function CategoryItemPage() {
  const params = useParams();
  // const router = useRouter();
  const categoryId = params.category as string;
  const restaurantId = params.id as string;

  // Debug logs to track page rendering and parameters
  // useEffect(() => {
  //   console.log("Category page loaded with params:", { categoryId, restaurantId });
    
  //   // Simple validation to ensure we have required params
  //   // if (!categoryId || !restaurantId) {
  //   //   console.error("Missing required parameters:", { categoryId, restaurantId });
  //   //   router.push("/"); // Redirect to home if we're missing required params
  //   // }
  // }, [categoryId, restaurantId, router]);

  // Only render the component if we have valid params
  if (!categoryId || !restaurantId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Invalid category parameters. Redirecting...</p>
      </div>
    );
  }

  return <CategoryItemScreen />;
}