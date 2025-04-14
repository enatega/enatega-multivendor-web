import MoveableCard from "@/lib/ui/useable-components/Moveable-Card";
import TinyTiles from "@/lib/ui/useable-components/tinyTiles";
import React from "react";
import TranparentButton from "@/lib/ui/useable-components/Home-Buttons/TranparentButton";

const Couriers:React.FC = () => {
  const EarningButton = <TranparentButton text={"Learn More"} />;
  const FLexiblegButton = <TranparentButton text={"Learn More"} />;
  const EarnWhereButton = <TranparentButton text={"Get started"} />;
  return (
    <div className="my-[60px]">
      <MoveableCard
        image={
          "https://images.ctfassets.net/23u853certza/52xdHKNnGODHWovJvhwvYb/b1a71a75301e7e8fe1266660869c3358/subhero_courier_v2.jpg?w=1920&q=90&fm=webp"
        }
        heading={"For Couriers"}
        subText={"EARN WHEN AND WHERE YOU WANT"}
        button={EarnWhereButton}
        middle={true}
      />
      <div className="grid gird-cols-1 md:grid-cols-2 my-[30px] gap-8">
        <MoveableCard
          image="https://images.ctfassets.net/23u853certza/1CTswohkY0RySIw1tV30wt/26823bac3c49bd1a31a503eabccb00fe/5ef9f6cb20e0ac7e92b8dd720fb0fb7f.png?w=1600&q=90&fm=webp"
          heading={"Competitive earnings"}
          subText={
            "The more you deliver, the more money you can earn. Get paid per delivery and for distance covered."
          }
          button={EarningButton}
        />
        <MoveableCard
          image="https://images.ctfassets.net/23u853certza/14E5PXvsGT5GDxRarQIItq/ad42c51662ddae52e44d93a7f9dbafe2/photocard_courier_flexible_hours.jpg?w=1600&q=90&fm=webp"
          heading={"Flexible hours"}
          subText={
            "Choose your own hours and set your own schedule. Plus, no delivery experience required."
          }
          button={FLexiblegButton}
        />
      </div>

      <TinyTiles
        image={
          "https://images.ctfassets.net/23u853certza/QScF4OasY8MBTmzrKJfv1/9afd4f8a826825cc097fb36606a81963/3DCourier.webp?w=200&q=90&fm=webp"
        }
        heading={"Become a Enatega rider"}
        buttonText={"For riders"}
        backColor={"#eaf7fc"}
      />
    </div>
  );
};

export default Couriers;
