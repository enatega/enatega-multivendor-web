import React from "react";
import Start from "../../screen-components/un-protected/Home/Start";
import Cities from "../../screen-components/un-protected/Home/Cities";
import Info from "../../screen-components/un-protected/Home/Info";
import EnategaInfo from "../../screen-components/un-protected/Home/LifeWithEnatega";
import GrowBussiness from "../../screen-components/un-protected/Home/GrowBussiness";
import MiniCards from "../../screen-components/un-protected/Home/MiniCards";
import TinyTiles from "../../useable-components/tinyTiles";
import Couriers from "../../screen-components/un-protected/Home/ForCouriers";

const Main = () => {
  return (
    <div>
      <Start />

      <div className="w-[95%] mx-auto">
        <Cities />
        <Info />
        <EnategaInfo />
        <GrowBussiness
          image={
            "https://images.ctfassets.net/23u853certza/6Cv99BeTRgtrg88Ateht1U/3ea23a65fc86d6e5b7e606a58cf2b063/subhero_merchant.jpg?w=1920&q=90&fm=webp"
          }
        />
        <MiniCards />

        <div className="grid grid-cols-1 md:grid-cols-2 my-[40px] gap-8">
          <TinyTiles />
          <TinyTiles />
        </div>

        <Couriers />
      </div>
    </div>
  );
};

export default Main;
