// libraries
import React from 'react'

// component
import MoveableCard from '@/lib/ui/useable-components/Moveable-Card'
import TranparentButton from '@/lib/ui/useable-components/Home-Buttons/TranparentButton'

const GrowBussiness:React.FC = () => {
  const growButon=<TranparentButton text={"Get Started"}/>

  return (
    <div className='w-full'>
        <MoveableCard 
        image={"https://images.ctfassets.net/23u853certza/6Cv99BeTRgtrg88Ateht1U/3ea23a65fc86d6e5b7e606a58cf2b063/subhero_merchant.jpg?w=1920&q=90&fm=webp"}
        heading={"For restaurants and stores"}
        subText={"Let's grow your business together"}
        middle={true}
        button={growButon}
        />
    </div>
  )
}

export default GrowBussiness
