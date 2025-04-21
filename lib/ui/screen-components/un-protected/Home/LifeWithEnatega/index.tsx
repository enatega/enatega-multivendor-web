// libraries
import React from "react";

// Components
import HomeCard from "@/lib/ui/useable-components/Home-Card";
import MoveableCard from "@/lib/ui/useable-components/Moveable-Card";

// images
import deliveryFee from "@/public/assets/images/png/deliveryFee.webp";
import ZeroDelivery from "@/public/assets/images/png/0delivery.webp";
import RiderSection from "@/public/assets/images/svgs/RiderSection.svg";
import RestaurantSection from "@/public/assets/images/svgs/RestuarantSection.svg";


const EnategaInfo: React.FC = () => {
  return (
    <div className="mt-[80px] mb-[80px]">
      <div className="flex flex-col justify-center items-center my-[20px]">
        <h1 className="text-[40px] md:[text-60px] font-extrabold m-4">
          LIFE TASTES BETTER WITH ENATEGA
        </h1>
        <p className="m-4 text-[28px]">
          Almost everything delivered to you – quickly, reliably, and affordably
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
        <MoveableCard
          image={deliveryFee}
          heading={"Real support from real people"}
          subText={
            "Our world-class support team has your back, with friendly assistance and fast response times. "
          }
        />
        <MoveableCard
          image={ZeroDelivery}
          heading={"0 € delivery fees with Enatega"}
          subText={
            "Enjoy zero delivery fees from the best restaurants and stores in your city."
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[30px] mb-[30px]">
        <HomeCard image={'https://enatega.com/wp-content/uploads/2025/01/enatega-customer-app.webp'} heading={"Fresh Groceries Delivered"} subText={"Go to Enatega App"} link={""}/>
        <HomeCard image={RiderSection} heading={"Restaurants Earn More"} subText={"Go to Enatega Restaurant App"} link={""} />
        <HomeCard image={RestaurantSection} heading={"Riders Reaches Fast"} subText={"Go to Enatega Rider App"} link={""}/>
      </div>
    </div>
  );
};

export default EnategaInfo;
