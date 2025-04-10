import React from 'react'
import MoveableCard from '../Moveable-Card'

interface HomeCardProps{
image:string,
heading:string,
subText:string
}


const HomeCard:React.FC<HomeCardProps> = ({image}) => {
  return (
    <div>
      <MoveableCard image={image} height={"320px"}/>
      <div className='my-4'>
        <h1 className='font-extrabold text-[22px]'>Fresh Groceries ,delievered</h1>
        <button className='text-[#03c3e8]'>Chech out Enatega Restaurant</button>
      </div>
    </div>
  )
}

export default HomeCard
