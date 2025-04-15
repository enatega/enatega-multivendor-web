import React from 'react'
import Card from '../Card'
import { Cards,WhyCardsListProps } from '@/lib/utils/interfaces/Rider-restaurant.interface'



const WhyCardsList:React.FC<WhyCardsListProps> = ({cards}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-[90%] mx-auto my-1 gap-6 '>
      {cards.map((item:Cards)=>
      {
      return <Card image={item.image} heading={item.heading} text={item.text} color={item.color}/>
      })}
    </div>
  )
}

export default WhyCardsList
