import React from 'react'

interface WhyChooseProps{
    heading:string,
    subHeading:string,
}

const WhyChoose:React.FC<WhyChooseProps> = ({heading,subHeading}) => {
  return (
    <div className='flex justify-center items-center flex-col md:w-[70%] w-[80%] mx-auto my-12'>
      <h1 className='text-[36px] font-extrabold my-6 leading-tight '>{heading}</h1>
      <h2 className='text-[20px] text-[#717173] w-[100%] md:w-[80%] font-serif  text-justify'>{subHeading}</h2>
    </div>
  )
}

export default WhyChoose
