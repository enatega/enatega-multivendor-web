import React from 'react'
import Image from 'next/image'


interface TilesData{
image:string,
heading:string,
buttonText:string,
backColor:string

}


const TinyTiles:React.FC<TilesData> = ({image,heading,buttonText,backColor}) => {
  return (
    <div className='p-4 w-[95%] mx-auto flex justify-between items-center rounded-3xl transform hover:scale-105 cursor-pointer transition duration-300'
    style={{backgroundColor:backColor}}>
      <div className='flex items-center'>
        <Image src={image} width={100} height={100} alt={"Image"}/>
        </div>
        <div className='w-full justify-between items-center flex flex-col sm:flex-row gap-2'>
        <h1 className='text-[#009de0] font-semibold text-[18px] mx-4'>{heading}</h1>
        <div className='flex gap-2 items-center '>
        <button className='text-[#009de0] font-medium text-[16px]'>
            {buttonText}
        </button>
        <i className="pi pi-arrow-right" style={{ fontSize: "0.8rem",backgroundColor:"#009de0" , padding:"4px",color:"white",borderRadius:"50%" }}></i>
        </div>
        </div>
    </div>
  )
}

export default TinyTiles
