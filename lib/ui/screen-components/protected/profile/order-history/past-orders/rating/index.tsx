"use client"

import { useState, useEffect } from "react"
import { Dialog } from "primereact/dialog"
import Image from "next/image"
import type { IOrder } from "@/lib/utils/interfaces/orders.interface"
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction"
import { twMerge } from "tailwind-merge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { ratingOptions } from "@/lib/utils/constants"
import CustomButton from "@/lib/ui/useable-components/button"

interface IRatingModalProps {
  visible: boolean
  onHide: () => void
  order: IOrder | null
  onSubmitRating: (orderId: string | undefined, rating: number, comment?: string, aspects?: string[]) => void
}

// Rating option component
const RatingOption = ({ value, emoji, label, selected, onSelect }: {
  value: number
  emoji: string
  label: string
  selected: boolean
  onSelect: (value: number) => void
}) => (
  <button
    onClick={() => onSelect(value)}
    className={twMerge(
      "flex flex-col items-center focus:outline-none transition-all",
      selected ? "transform scale-110" : ""
    )}
  >
    <span className="text-3xl mb-2">{emoji}</span>
    <span className="text-sm text-gray-600">{label}</span>
  </button>
)

// Aspect button component
const AspectButton = ({ aspect, selected, onToggle }: {
  aspect: string
  selected: boolean
  onToggle: (aspect: string) => void
}) => (
  <button
    onClick={() => onToggle(aspect)}
    className={twMerge(
      "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
      selected
        ? "bg-green-500 text-white border-green-500"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    )}
  >
    {aspect}
  </button>
)

// ActionButton component
const ActionButton = ({
  onClick,
  disabled = false,
  primary = false,
  children
}: {
  onClick: () => void
  disabled?: boolean
  primary?: boolean
  children: React.ReactNode
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={twMerge(
      "w-full py-3 rounded-full text-center font-medium transition-colors",
      primary
        ? "bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
        : disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
    )}
  >
    {children}
  </button>
)

export default function RatingModal({ visible, onHide, order, onSubmitRating }: IRatingModalProps) {
  // States
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState<string>("")
  const [selectedAspects, setSelectedAspects] = useState<string[]>([])

  // Debounced submit function
  const handleSubmitDebounced = useDebounceFunction(
    () => {
      if (order && rating !== null) {
        onSubmitRating(order._id, rating, comment, selectedAspects)
        onHide()
      }
    },
    500, // Debounce time in milliseconds
  )

  // Reset states when modal is opened or closed
  useEffect(() => {
    if (visible) {
      setStep(1)
      setRating(null)
      setComment("")
      setSelectedAspects([])
    }
  }, [visible])


  // Delivery aspects for step 2
  const deliveryAspects = ["Courier Professionalism", "Estimate", "Delivery on time"]

  // Handle rating selection
  const handleRatingSelect = (value: number) => {
    setRating(value)
  }

  // Handle aspect selection
  const handleAspectToggle = (aspect: string) => {
    setSelectedAspects((prev) => (prev.includes(aspect) ? prev.filter((a) => a !== aspect) : [...prev, aspect]))
  }

  // Handle next step
  const handleNext = () => {
    if (step === 1 && rating !== null) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  // Step components
  const renderStepOne = () => (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        {ratingOptions.map((option) => (
          <RatingOption
            key={option.value}
            value={option.value}
            emoji={option.emoji}
            label={option.label}
            selected={rating === option.value}
            onSelect={handleRatingSelect}
          />
        ))}
      </div>
      <ActionButton onClick={handleNext} disabled={rating === null}>
        Next
      </ActionButton>
    </div>
  )

  const renderAspects = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {deliveryAspects.map((aspect) => (
        <AspectButton
          key={aspect}
          aspect={aspect}
          selected={selectedAspects.includes(aspect)}
          onToggle={handleAspectToggle}
        />
      ))}
    </div>
  )

  const renderStepTwo = () => (
    <div className="w-full">
      {renderAspects()}
      <button
        onClick={handleNext}
        className="w-full py-2 rounded-full bg-gray-100 text-gray-600 mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
      >
        <span>+</span> Add a comment
      </button>
      <ActionButton onClick={handleSubmitDebounced} primary>
        Submit
      </ActionButton>
    </div>
  )

  const renderStepThree = () => (
    <div className="w-full">
      {renderAspects()}
      <button className="w-full py-2 rounded-full bg-gray-100 text-gray-400 mb-4 text-center">
        + Add a comment
      </button>
      <div className="w-full mb-4 border border-gray-200 rounded-lg">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type here"
          className="w-full p-4 rounded-lg focus:outline-none resize-none"
          maxLength={200}
          rows={4}
        />
        <div className="flex justify-end p-2 text-gray-400 text-sm">{comment.length}/200</div>
      </div>
      <ActionButton onClick={handleSubmitDebounced} primary>
        Submit
      </ActionButton>
    </div>
  )

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      dismissableMask
      showHeader={false}
      className="w-full max-w-md mx-auto"
      contentClassName="p-0 rounded-xl"
      style={{ maxWidth: "450px", borderRadius: "0.75rem" }}
    >
      <div className="flex flex-col items-center p-6 rounded-xl">
        {/* Close button */}
        <span
          onClick={onHide}
          className="absolute cursor-pointer right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </span>

        {/* Restaurant Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          {order?.restaurant?.image ? (
            <Image
              src={order.restaurant.image || "/placeholder.svg"}
              alt={order.restaurant.name || "Restaurant"}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-29%20005618-knHHkMAWFFO5lPyx9cPFz6fTiGT86u.png"
                alt="Restaurant"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Restaurant Name */}
        <p className="text-gray-600 mb-2">{order?.restaurant?.name || "Restaurant name"}</p>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">How was the delivery?</h2>

        {/* Subheading */}
        <p className="text-gray-600 mb-6 text-center">Whether it&apos;s good or bad, let&apos;s talk about it</p>

        {/* Steps */}
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </div>
    </Dialog>
  )
}
