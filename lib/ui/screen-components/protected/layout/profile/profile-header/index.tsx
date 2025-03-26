import CustomButton from '@/lib/ui/useable-components/button'
import TextComponent from '@/lib/ui/useable-components/text-field'
import React from 'react'

export default function ProfileHeader() {
  return (
  <div className='w-full flex justify-between'>
     <TextComponent text="Profile" className='heading-1'/>
     <CustomButton label='Get help' type='button' className='text-lg font-light bg-[#F3FFEE] px-[16px] py-[8px] text-[#63C43B]'/>
  </div>
  )
}
