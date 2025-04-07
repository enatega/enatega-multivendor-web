import React from 'react'
import Image from 'next/image'

const TinyTiles = () => {
  return (
    <div className='p-4 bg-blue-100 flex justify-between items-center rounded-3xl'>
      <div className='flex items-center'>
        <Image src={'https://images.ctfassets.net/23u853certza/6kRVPn5kxEnlkgCYUTozhL/7846cf51b410e633a8c30a021ec00bde/Restaurant.png?w=200&q=90&fm=webp'} width={100} height={100} alt={"Image"}/>
        <h1 className='text-blue-400 font-semibold text-[20px] mx-4'>Reach new customers and get more orders</h1>
        </div>
        <button className='text-blue-400'>
            For restaurants Icon
        </button>
    </div>
  )
}

export default TinyTiles
