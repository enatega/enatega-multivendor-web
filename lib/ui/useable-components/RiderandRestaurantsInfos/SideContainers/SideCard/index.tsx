import React,{ReactNode} from 'react'
import Card from '../../../card'
import SideCard from '../card'
import { sideCardList } from '@/lib/utils/interfaces/Rider-restaurant.interface'

const SideContainers:React.FC<sideCardList> = ({sideCards}) => {
  return (
    <div>
      {sideCards?.map((item)=>
      {
       return <SideCard image={item.image} heading={item.heading} subHeading={item.subHeading} />
      })}
      
    </div>
  )
}

export default SideContainers
