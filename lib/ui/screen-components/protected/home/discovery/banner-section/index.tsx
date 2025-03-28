import { Carousel } from "primereact/carousel";
// query
import { GET_BANNERS } from "@/lib/api/graphql/queries";
// gql
import { useQuery } from "@apollo/client";
// loading skeleton
import DiscoveryBannerSkeleton from "./banner-loading-skeleton";
// Interface
import { IGetBannersResponse } from "@/lib/utils/interfaces";
// banner card
import BannerCard from "./banner-card";

export default function DiscoveryBannerSection() {
  const { data, loading, error } = useQuery<IGetBannersResponse>(GET_BANNERS);

  if (loading) {
    return <DiscoveryBannerSkeleton />;
  }
  if (error) {
    return;
  }

  return (
    <Carousel
      className="discovery-carousel"
      value={data?.banners}
      numVisible={2}
      numScroll={1}
      circular
      style={{ width: "100%" }}
      showNavigators
      itemTemplate={(item) => <BannerCard item={item} />}
      autoplayInterval={5000}
      responsiveOptions={[
        { breakpoint: "768px", numVisible: 1, numScroll: 1 }, // Mobile
        { breakpoint: "1024px", numVisible: 2, numScroll: 1 }, // Tablets
      ]}
    />
  );
}
