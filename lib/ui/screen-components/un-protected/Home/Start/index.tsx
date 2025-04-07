import React from 'react'
import HomeSearch from '@/lib/ui/useable-components/Home-search';
import styles from './Start.module.css'

const Start = () => {

  return (
    <div
    className={`h-screen ps-[60px] w-screen bg-cover bg-center flex items-center `}
    style={{ backgroundImage: "url('/assets/images/png/main-image.svg')" }} 
  >
    <div>
      <div className='h-[70px] overflow-hidden'>
        <h1 className={`font-extrabold text-[50px] w-[70%] h-[100px] ${styles.anim}`}>Time</h1>
        </div>
        <HomeSearch/>
        <div className='my-2'>
            <button className='me-2'>Share Location</button>
            <button>Login for saved address</button>
        </div>
    </div>
  </div>
  )
}

export default Start
