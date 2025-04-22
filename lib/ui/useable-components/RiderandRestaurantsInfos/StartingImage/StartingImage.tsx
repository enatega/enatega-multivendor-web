

import { StaticImageData } from 'next/image'
import React from 'react'
interface StratingImageProps {
image:string | StaticImageData
}

import  Image  from 'next/image'

const StartingImage:React.FC<StratingImageProps> = ({image}) => {
  return (
    <div className='w-full h-[500px]'>
      <Image src={image} alt={"banner Image"}  className='w-full h-full object-cover' />
    </div>
  )
}

export default StartingImage
