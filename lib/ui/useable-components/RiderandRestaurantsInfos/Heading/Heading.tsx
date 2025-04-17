import React from 'react'

interface HeadingProps{
heading:string,
subHeading?:string,
}

const Heading:React.FC<HeadingProps> = ({heading,subHeading}) => {
  return (
    <div className='flex justify-center items-center p-5 w-full flex-col my-[30px] '>
      <h1 className='text-[48px] font-extrabold text-center text-[#94e469] leading-tight md:w-[60%] w-[100%] mx-auto'>{heading}</h1>
      <h3 className='text-[#556273] my-3'>{subHeading}</h3>
    </div>
  )
}

export default Heading
