import React from 'react'

interface WhyChooseProps{
    heading:string,
    subHeading:string,
}

const WhyChoose:React.FC<WhyChooseProps> = ({heading,subHeading}) => {
  return (
    <div className='flex justify-center items-center flex-col w-[70%] mx-auto my-12'>
      <h1 className='text-[42px] font-extrabold my-6 '>{heading}</h1>
      <h2 className='text-[20px] text-[#717173] font-serif font-semibold '>{subHeading}</h2>
    </div>
  )
}

export default WhyChoose
