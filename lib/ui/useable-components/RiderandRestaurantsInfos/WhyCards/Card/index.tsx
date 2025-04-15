import React from 'react'
import { Cards } from '@/lib/utils/interfaces/Rider-restaurant.interface'
import Image from 'next/image'

const Card:React.FC<Cards> = ({image,heading,text,color}) => {
  return (
    <div className={`bg-[#f7fbfe] flex items-center justify-center flex-col  rounded-2xl p-4`}
     style={{backgroundColor:color}}
     >
      <Image src={image} width={300} height={300} alt="img"/>
      <div className='flex items-center justify-center flex-col my-6'>
        <h1 className='text-[24px] font-bold my-[30px]'>{heading}</h1>
        <p className='font-light text-[16px] text-[#6d7073] mb-[20px]'>{text}</p>
      </div>
    </div>
  )
}

export default Card
