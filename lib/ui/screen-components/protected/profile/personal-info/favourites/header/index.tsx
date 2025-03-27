"use client"

import CustomButton from "@/lib/ui/useable-components/button"
import type React from "react"

interface IHeaderProps {
  title: string
  showSeeAll?: boolean
  onSeeAllClick?: () => void
}

export const HeaderFavourite: React.FC<IHeaderProps> = ({ title, onSeeAllClick }) => {
  return (
    <div className="flex justify-between items-center mb-4 w-full">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">{title}</h2>
        <CustomButton
          label="See all"
          onClick={onSeeAllClick}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-base md:text-lg "
        />  
    </div>
  )
}

export default HeaderFavourite

