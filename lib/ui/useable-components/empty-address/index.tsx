"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"


export default function EmptyAddress() {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg my-4 bg-gray-50">
      <div className="text-gray-400 mb-3 text-5xl">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </div>
      <p className="text-gray-500 text-sm md:text-base text-center mb-4">No addresses found. Please add an address.</p>
    </div>
  )
}

