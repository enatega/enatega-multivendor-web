

import { StaticImageData } from 'next/image'
import React from 'react'
interface StratingImageProps {
image:string | StaticImageData
}

import  Image  from 'next/image'

const StartingImage:React.FC<StratingImageProps> = ({image}) => {
  return (
    <div className='w-full h-[200px] md:h-[500px] flex justify-center'>
    <Image src={image} alt={"banner Image"}  className='md:w-[70%] h-full object-cover object-bottom md:rounded-lg' />
  </div>
  )
}

export default StartingImage
