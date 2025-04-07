import HomeMiniCard from '@/lib/ui/useable-components/Home-miniCard'
import React from 'react'

const MiniCards = () => {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-sols-4 gap-8 mt-[30px] mb-[30px]'>
        <HomeMiniCard/>
        <HomeMiniCard/>
        <HomeMiniCard/>
        <HomeMiniCard/>
      </div>
    </div>
  )
}

export default MiniCards
