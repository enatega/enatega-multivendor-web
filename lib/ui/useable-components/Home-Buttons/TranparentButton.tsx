import React from 'react'
import { buttonProps } from '@/lib/utils/interfaces/Home-interfaces'

const TranparentButton:React.FC<buttonProps> = ({text}) => {
  return (
    <button className='p-3 bg-white/20 rounded-3xl w-[160px] backdrop-blur-sm hover:bg-white/35 h-[50px] flex gap-2 items-center justify-center'>
      <p className='text-white text-[16px]'> {text}</p>
      <i className="pi pi-angle-right" style={{ fontSize: '1rem',color:"white" }}></i>
     
    </button>
  )
}

export default TranparentButton
