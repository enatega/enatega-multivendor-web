import HomeCard from "@/lib/ui/useable-components/Home-Card";
import MoveableCard from "@/lib/ui/useable-components/Moveable-Card";
import React from "react";

const EnategaInfo: React.FC = () => {
  return (
    <div className="mt-[40px] mb-[40px]">
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
          image={
            "https://images.ctfassets.net/23u853certza/5926qGJB2hSNE15qHWNLZn/388c6afaf9c273c328d6ec824f10b0e1/photocard_woltplus.jpg?w=1600&q=90&fm=webp"
          }
          heading={"Real support from real people"}
          subText={
            "Our world-class support team has your back, with friendly assistance and fast response times. "
          }
        />
        <MoveableCard
          image={
            "https://images.ctfassets.net/23u853certza/5926qGJB2hSNE15qHWNLZn/388c6afaf9c273c328d6ec824f10b0e1/photocard_woltplus.jpg?w=1600&q=90&fm=webp"
          }
          heading={"0 € delivery fees with Enatega"}
          subText={
            "Enjoy zero delivery fees from the best restaurants and stores in your city."
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[30px] mb-[30px]">
        <HomeCard
          image={
            "https://images.ctfassets.net/23u853certza/471ILgDT92ZOsRUtayO8Gy/3653197562a27c83d18caa3fb4a12256/photocardsmall_wolt_market_v2.jpg?w=960&q=90&fm=webp"
          }
        />
        <HomeCard
          image={
            "https://images.ctfassets.net/23u853certza/2PeZ6DypYynPSCEDHZbh1C/c978e38a82eb3f3331f184e67d2b4e00/photocardsmall_wolt_for_work.jpg?w=960&q=90&fm=webp"
          }
        />
        <HomeCard
          image={
            "https://images.ctfassets.net/23u853certza/51WilVKmJ4MmFg3IBHK2ko/1d8652b44a5f77a8a68c22f1ab28db14/photocardsmall_woltapp.jpg?w=960&q=90&fm=webp"
          }
        />
      </div>
    </div>
  );
};

export default EnategaInfo;
