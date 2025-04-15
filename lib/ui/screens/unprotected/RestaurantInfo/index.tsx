// import MyForm from '@/lib/ui/useable-components/RiderandRestaurantsInfos/Form'
import Heading from '@/lib/ui/useable-components/RiderandRestaurantsInfos/Heading/Heading'
import SideContainers from '@/lib/ui/useable-components/RiderandRestaurantsInfos/SideContainers/SideCard'
import WhyCardsList from '@/lib/ui/useable-components/RiderandRestaurantsInfos/WhyCards/WhyCardsList'
import WhyChoose from '@/lib/ui/useable-components/RiderandRestaurantsInfos/WhyChoose'
import React from 'react'

const cards=[
    {heading:"Grow with Enatega",text:"Access our active customer base by offering pickup and delivery on the Enatega app.",image:"https://images.ctfassets.net/23u853certza/39tOr0Eo5wC7bi08vO3GwT/fd51c96879ad6340fd0e8190b6cddfd1/5083447083_Merchant_Landing_Page_AccessCustomerBase.png?w=1080&q=75&fm=webp",color:"#f7fbfe"},
    {heading:"Get more orders",text:"With Enatega, you can increase your orders by reaching our active customers. Joining is free and pricing is commission based.",image:"https://images.ctfassets.net/23u853certza/39tOr0Eo5wC7bi08vO3GwT/fd51c96879ad6340fd0e8190b6cddfd1/5083447083_Merchant_Landing_Page_AccessCustomerBase.png?w=1080&q=75&fm=webp",color:"#faf7fc"},
    {heading:"Deliver to more customers",text:"After an order is placed, Wolt courier partners deliver to your customers in about 30 minutes. ",image:"https://images.ctfassets.net/23u853certza/39tOr0Eo5wC7bi08vO3GwT/fd51c96879ad6340fd0e8190b6cddfd1/5083447083_Merchant_Landing_Page_AccessCustomerBase.png?w=1080&q=75&fm=webp",color:"#fbfbfb"}
    ]

const sideCards=[
{image:"",heading:"How Enatega works",subHeading:"A customer browses the Wolt app and places an order from your store. The order appears in the Merchant App for you to complete. Once packed and ready, a courier partner will arrive to pick up the order and deliver the goods to the customer. In total, it takes about 30 minutes for the customer to receive and enjoy their order."},
{image:"",heading:"World-class Customer Support for your success",subHeading:"Our 24/7 Customer Support replies in your local language in a matter of minutes. We’re available to you and your customers until the last order of the day is delivered. "}
]
const RestInfo = () => {
  return (
    <div className='w-screen  h-auto'>
    <Heading heading={"Reach more customers and grow your business with Wolt"} subHeading={"Partner with Enatega to create more sales on the app and through your own website"}/>
    <WhyChoose heading='Why Deliver with Enatgea' subHeading="As an Enatega Rider Partner, you can earn money by delivering orders to local customers. You can have a flexible schedule, so you deliver in the place or at the time that suits you the most. It's easy to start earning - no previous delivery experience is required!" />
    <WhyCardsList cards={cards}/>
    {/* <MyForm/> */}
    <SideContainers sideCards={sideCards} />
    
  
  </div>
  )
}

export default RestInfo