import Image from "next/image";
import React from "react";
import styles from './Movable.module.css'; // Ensure this path is correct

interface MoveableProps{
heading:string,
subtext:string,
button:React.ReactNode,
image:string
}

const MoveableCard: React.FC<MoveableProps> = ({heading,subText,button,image}) => {
  return (
    <div className={`${styles.cardContainer} bg-green-300 rounded-3xl`}>
      {/* Image container */}
        <Image
          src={image || "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=1200&q=90&fm=webp"}
          alt="Main Image"
          layout="fill"
          className={`${styles.imageContainer} c`}
        />
      
      {/* Text container */}
      <div className={`absolute inset-0 flex items-start justify-between  flex-col p-5  ${styles.textContainer}`}>
        <div>
        <h1 className="text-white text-4xl font-extrabold mb-3">Become a Courier Partner</h1>
        <p className="text-white text-md text-lg ">Earn by delieviring to local customers. Set your own schedule,deliver when and where you want</p>
        </div>
        <div>
          {button && button}
        </div>
      </div>
    </div>
  );
};

export default MoveableCard;
