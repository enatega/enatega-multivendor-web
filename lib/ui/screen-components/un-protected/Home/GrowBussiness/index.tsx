import MoveableCard from '@/lib/ui/useable-components/Moveable-Card'
import React from 'react'

const GrowBussiness = ({image}) => {
  return (
    <div className='w-full'>
        <MoveableCard 
        image={image}
        heading={"For restaurants and stores"}
        subText={"Let's grow your business together"}
        middle={true}
        />
    </div>
  )
}

export default GrowBussiness
