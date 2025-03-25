import Image from "next/image";

import { Carousel } from "primereact/carousel";

// DUmmy Data
import { DUMMY_BANNER_IMAGES_URL } from "@/lib/utils/dummy";

// Interface
import { IBannerItem } from "@/lib/utils/interfaces";

export default function DiscoveryBannerSection() {
  // Tempaltes
  const itemTemplate = (item: IBannerItem) => {
    return (
      <div className="carousel-item md:mr-[12px]">
        <Image
          src={item.url}
          width={890}
          height={300}
          alt={item.alt}
          objectFit="contain"
          style={{ borderRadius: 12 }}
          className="carousel-image"
        />
      </div>
    );
  };

  return (
    <Carousel
      className="discovery-carousel"
      value={DUMMY_BANNER_IMAGES_URL}
      numVisible={2}
      numScroll={1}
      circular
      style={{ width: "100%" }}
      showNavigators
      itemTemplate={itemTemplate}
      autoplayInterval={5000}
      responsiveOptions={[
        { breakpoint: "768px", numVisible: 1, numScroll: 1 }, // Mobile
        { breakpoint: "1024px", numVisible: 2, numScroll: 1 }, // Tablets
      ]}
    />
  );
}
