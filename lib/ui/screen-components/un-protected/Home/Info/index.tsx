import { ConfigurationProvider } from '@/lib/context/configuration/configuration.context'
import MoveableCard from '@/lib/ui/useable-components/Moveable-Card'
import React from 'react'

const Info = () => {
  const CourierButton=<button> For Couriers</button>
  const MerchantButton=<button> For Merchants</button>



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <MoveableCard button={CourierButton} image={"https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=1200&q=90&fm=webp"}/>
      <MoveableCard button={MerchantButton} image={"https://images.ctfassets.net/23u853certza/1FZ1mDc4bJVwtMTJz2Wtfa/71060334acbb1bbd9c1f270a94599fc2/photocard_merchant_v2.jpg?w=1600&q=90&fm=webp"}/>
    </div>
  )
}

export default Info
