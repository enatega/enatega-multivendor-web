import type { FC } from "react"
import { Button } from "primereact/button"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"

interface EmptyStateProps {
  title: string
  message: string
  actionLabel?: string
  actionLink?: string
}

const EmptyState: FC<EmptyStateProps> = ({ title, message, actionLabel, actionLink }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
      <FontAwesomeIcon icon={faFaceFrown} className="text-4xl" />
      
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {actionLabel && actionLink && (
        <Link href={actionLink}>
          <Button label={actionLabel} icon="fa-solid fa-arrow-right" />
        </Link>
      )}
    </div>
  )
}

export default EmptyState

