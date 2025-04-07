import MoveableCard from '@/lib/ui/useable-components/Moveable-Card'
import TinyTiles from '@/lib/ui/useable-components/tinyTiles'
import React from 'react'

const Couriers = () => {
  return (
    <div>
      <MoveableCard image={"https://images.ctfassets.net/23u853certza/52xdHKNnGODHWovJvhwvYb/b1a71a75301e7e8fe1266660869c3358/subhero_courier_v2.jpg?w=1920&q=90&fm=webp"}/>
      <div className='grid gird-cols-1 md:grid-cols-2 my-[30px] gap-8'>
        <MoveableCard image="https://images.ctfassets.net/23u853certza/1CTswohkY0RySIw1tV30wt/26823bac3c49bd1a31a503eabccb00fe/5ef9f6cb20e0ac7e92b8dd720fb0fb7f.png?w=1600&q=90&fm=webp"/>
        <MoveableCard image="https://images.ctfassets.net/23u853certza/14E5PXvsGT5GDxRarQIItq/ad42c51662ddae52e44d93a7f9dbafe2/photocard_courier_flexible_hours.jpg?w=1600&q=90&fm=webp"/>
      </div>

      <TinyTiles/>
    </div>
  )
}

export default Couriers
