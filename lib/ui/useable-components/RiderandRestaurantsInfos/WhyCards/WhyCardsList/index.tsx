import React from 'react'
import Card from '../Card'
import { Cards,WhyCardsListProps } from '@/lib/utils/interfaces/Rider-restaurant.interface'



const WhyCardsList:React.FC<WhyCardsListProps> = ({cards}) => {
  return (
    <>
    <h1>Why Patner with Us</h1>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-[90%] mx-auto my-1 gap-6 '>
      {cards.map((item:Cards)=>
      {
      return <Card key={item.heading} image={item.image} heading={item.heading} text={item.text} color={item.color}/>
      })}
    </div>
    </>
  )
}

export default WhyCardsList
