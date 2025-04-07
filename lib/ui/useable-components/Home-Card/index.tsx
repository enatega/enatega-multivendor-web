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
      <MoveableCard image={image}/>
      <div>
        <h1>Fresh Groceries ,delievered</h1>
        <button>Chech out Enatega Restaurant</button>
      </div>
    </div>
  )
}

export default HomeCard
