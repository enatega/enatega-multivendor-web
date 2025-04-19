

import { StaticImageData } from 'next/image'
import React from 'react'
interface StratingImageProps {
image:string | StaticImageData
}

import  Image  from 'next/image'

const StartingImage:React.FC<StratingImageProps> = ({image}) => {
  return (
    <div className='w-full h-auto'>
      <Image src={image} alt={"banner Image"}  />
    </div>
  )
}

export default StartingImage
