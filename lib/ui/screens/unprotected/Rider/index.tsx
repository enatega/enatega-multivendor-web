import Heading from '@/lib/ui/useable-components/RiderandRestaurantsInfos/Heading/Heading'
import WhyCardsList from '@/lib/ui/useable-components/RiderandRestaurantsInfos/WhyCards/WhyCardsList'
import WhyChoose from '@/lib/ui/useable-components/RiderandRestaurantsInfos/WhyChoose'
import React from 'react'

const cards=[
    {heading:"Grow with Enatega",text:"Access our active customer base by offering pickup and delivery on the Enatega app.",image:"https://images.ctfassets.net/23u853certza/39tOr0Eo5wC7bi08vO3GwT/fd51c96879ad6340fd0e8190b6cddfd1/5083447083_Merchant_Landing_Page_AccessCustomerBase.png?w=1080&q=75&fm=webp"},
    {heading:"Get more orders",text:"With Enatega, you can increase your orders by reaching our active customers. Joining is free and pricing is commission based.",image:"https://images.ctfassets.net/23u853certza/39tOr0Eo5wC7bi08vO3GwT/fd51c96879ad6340fd0e8190b6cddfd1/5083447083_Merchant_Landing_Page_AccessCustomerBase.png?w=1080&q=75&fm=webp"},
    {heading:"Deliver to more customers",text:"After an order is placed, Wolt courier partners deliver to your customers in about 30 minutes. ",image:"https://images.ctfassets.net/23u853certza/39tOr0Eo5wC7bi08vO3GwT/fd51c96879ad6340fd0e8190b6cddfd1/5083447083_Merchant_Landing_Page_AccessCustomerBase.png?w=1080&q=75&fm=webp"}
    ]
    

const Rider = () => {
  return (
    <div className='w-screen  h-auto'>
      <Heading heading={"Become an Enatega Rider"} />
      <WhyChoose heading='Why Deliver with Enatgea' subHeading="As an Enatega Rider Partner, you can earn money by delivering orders to local customers. You can have a flexible schedule, so you deliver in the place or at the time that suits you the most. It's easy to start earning - no previous delivery experience is required!" />
      <WhyCardsList cards={cards}/>
    
    </div>
  )
}

export default Rider
