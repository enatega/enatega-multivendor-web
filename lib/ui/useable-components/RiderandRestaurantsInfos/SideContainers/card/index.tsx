import React,{ReactNode} from 'react'
import Image from 'next/image'
import { sideCardProps } from '@/lib/utils/interfaces/Rider-restaurant.interface'

const SideCard:React.FC<sideCardProps> = ({image,heading,subHeading}) => {
  return (
    <div className='grid grid-cols-2'>
      <div>
        <h1>{heading}</h1>
        <p>{subHeading} </p>
      </div>
      <div>
          <Image src={"https://images.ctfassets.net/23u853certza/7c45kGPBSsstXHRYsdqakJ/41fb160caae9c9c8122ea06efbf41f27/Feature_6.jpeg?w=1920&q=75&fm=webp"} alt={"adasd"} width={100} height={100}/>
      </div>
    </div>
  )
}

export default SideCard
