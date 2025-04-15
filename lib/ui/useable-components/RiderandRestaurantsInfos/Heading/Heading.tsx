import React from 'react'

interface HeadingProps{
heading:string,
subHeading?:string,
}

const Heading:React.FC<HeadingProps> = ({heading,subHeading}) => {
  return (
    <div className='flex justify-center items-center p-5 w-full h-[420px]  flex-col my-5 '>
      <h1 className='text-[48px] font-extrabold text-center text-[#94e469] leading-tight w-[60%] mx-auto'>{heading}</h1>
      <h3 className='text-[#556273] my-3'>{subHeading}</h3>
    </div>
  )
}

export default Heading
