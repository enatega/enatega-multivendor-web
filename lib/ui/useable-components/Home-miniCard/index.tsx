import React from 'react'
import Image from 'next/image'

const HomeMiniCard = () => {
  return (
    <div className='h-[400px] flex justify-center items-center flex-col bg-green-100 rounded-3xl '>
      <div className='w-[300px] mx-auto flex flex-col items-center justify-between'>
      <Image
      src={'https://images.ctfassets.net/23u853certza/2alPBNdBAcXwckvXjbjWvH/542aac95909dbaa25b9774eb0e092860/3DLivingroom.png?w=960&q=90&fm=webp'}
      width={200}
      height={200}
      alt="Image"
      />
      <div className='text-center w-[80%] my-[30px] '>
        <h1 className='font-extrabold text-[#ce636e] text-[25px] my-2  '>Boost your sales</h1>
        <p className='font-light'>91% of Enatega orders are extra sales you wouldn;t otherwise get</p>
      </div>
      </div>
    </div>
  )
}

export default HomeMiniCard
