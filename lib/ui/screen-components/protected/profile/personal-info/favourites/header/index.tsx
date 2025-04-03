"use client"

import CustomButton from "@/lib/ui/useable-components/button"
import TextComponent from "@/lib/ui/useable-components/text-field"
import { IHeaderFavourite } from "@/lib/utils/interfaces/favourite.restaurants.interface"
import type React from "react"


export const HeaderFavourite: React.FC<IHeaderFavourite> = ({ title, onSeeAllClick }) => {
  return (
    <div className="flex justify-between items-center mb-4 w-full">
      <TextComponent text={title} className="text-2xl md:text-3xl xl:text-4xl font-semibold"/>
        <CustomButton
          label="See all"
          onClick={onSeeAllClick}
          className="text-[#0EA5E9] transition-colors duration-200 text-base md:text-lg "
        />  
    </div>
  )
}

export default HeaderFavourite

