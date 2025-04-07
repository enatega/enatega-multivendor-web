import React from 'react'
import { InputText } from 'primereact/inputtext';

const HomeSearch = () => {
  return (
    <div>
        <div className='bg-white flex p-2 rounded'>
           <div className='me-2'>Icon</div>
           <InputText placeholder='Enter Delivery Address' className='w-full'/>
        </div>
    </div>
  )
}

export default HomeSearch
