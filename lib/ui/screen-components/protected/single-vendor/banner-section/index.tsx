'use client';

import { Carousel } from "primereact/carousel";
import { useQuery } from "@apollo/client";
import DiscoveryBannerSkeleton from "@/lib/ui/useable-components/custom-skeletons/banner.skeleton";
import BannerRestaurantCard from "./bannerRestaurantCard";
import useSingleRestaurant from "@/lib/hooks/useSingleRestaurant";
import { GET_BANNER_RESTAURANTS } from "@/lib/api/graphql/queries/BannerRestaurant";
import useUser from "@/lib/hooks/useUser";
import { useEffect } from "react";
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";

// Updated interface to match the banner restaurant response
export interface IBannerRestaurantResponse {
  __typename?: string;
  _id: string;
  title: string;
  description: string;
  file: string;
  foodId: string;
  restaurant: string;
  foodImage?: string;
  foodTitle?: string;
  displayImage?: string;
  isActive: boolean;
}

export interface IGetBannerRestaurantsResponse {
  bannerRestaurants: IBannerRestaurantResponse[];
}

interface SingleVendorBannerSectionProps {
  onFoodClick?: (food: any) => void;
}

export default function SingleVendorBannerSection({ onFoodClick }: SingleVendorBannerSectionProps) {
  const { restaurantId } = useSingleRestaurant();
  const { restaurant } = useSingleRestaurantFoodData();
  
  // Get user context to transform cart items
  const { cart, transformCartWithFoodInfo, updateCart } = useUser();
  
  // Transform cart items when restaurant data is loaded
  useEffect(() => {
    if (restaurant && cart.length > 0) {
      const transformedCart = transformCartWithFoodInfo(cart, restaurant);
      if (JSON.stringify(transformedCart) !== JSON.stringify(cart)) {
        updateCart(transformedCart);
      }
    }
  }, [restaurant, cart.length, transformCartWithFoodInfo, updateCart]);

  const { data, loading, error } = useQuery<IGetBannerRestaurantsResponse>(
    GET_BANNER_RESTAURANTS, 
    {
      variables: { restaurantId },
      fetchPolicy: "cache-and-network",
      skip: !restaurantId
    }
  );

  // Early return for loading state
  if (loading) {
    return <DiscoveryBannerSkeleton />;
  }

  // Early return for error state
  if (error || !data?.bannerRestaurants?.length) {
    return null;
  }

  // Only show carousel if we have banners
  return (
    <Carousel
      className="discovery-carousel flex justify-center items-center mb-[3%] md:mb-[2]"
      value={data.bannerRestaurants}
      numVisible={2}
      numScroll={1}
      circular
      style={{ width: "100%" }}
      showNavigators
      showIndicators={false}
      itemTemplate={(item) => (
        <BannerRestaurantCard 
          item={item} 
          onFoodClick={onFoodClick}
        />
      )}
      autoplayInterval={5000}
      responsiveOptions={[
        { breakpoint: "768px", numVisible: 1, numScroll: 1 }, // Mobile
        { breakpoint: "1024px", numVisible: 2, numScroll: 1 }, // Tablets
      ]}
    />
  );
}