"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import RenderStepTwo from "../step-two";
import RenderStepOne from "../step-one";
import RenderStepThree from "../step-three";
import { IRatingModalProps } from "@/lib/utils/interfaces/ratings.interface";

export default function RatingModal({
  visible,
  onHide,
  order,
  onSubmitRating,
}: IRatingModalProps) {
  // State management
  const [step, setStep] = useState<1 | 2 | 3>(1); // Current step in the rating flow (1=rating, 2=aspects, 3=comment)
  const [rating, setRating] = useState<number | null>(null); // Selected rating value
  const [comment, setComment] = useState<string>(""); // User's comment
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]); // Selected aspects of the order

  // Debounced submit function to prevent multiple submissions
  const handleSubmitDebounced = useDebounceFunction(
    () => {
      if (order && rating !== null) {
        onSubmitRating(order._id, rating, comment, selectedAspects);
        onHide(); // Close the modal after submission
      }
    },
    500 // Debounce time in milliseconds
  );

  // Reset all states when modal is opened or closed
  useEffect(() => {
    if (visible) {
      setStep(1);
      setRating(null);
      setComment("");
      setSelectedAspects([]);
    }
  }, [visible]);

  // Handle rating selection
  const handleRatingSelect = (value: number) => {
    setRating(value);
  };

  // Handle aspect selection/deselection (toggle behavior)
  const handleAspectToggle = (aspect: string) => {
    setSelectedAspects((prev) =>
      prev.includes(aspect)
        ? prev.filter((a) => a !== aspect)
        : [...prev, aspect]
    );
  };

  // Handle navigation to next step
  const handleNext = () => {
    if (step === 1 && rating !== null) {
      setStep(2); // Move to aspects selection
    } else if (step === 2) {
      setStep(3); // Move to comment input
    }
  };

  // Main render function for the modal
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      dismissableMask // Allows clicking outside to dismiss
      showHeader={false} // Hide default header
      className="w-full max-w-md mx-auto "
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
                src="https://placehold.co/600x400"
                alt="Restaurant"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Restaurant Name */}
        <p className="text-gray-600 mb-2">
          {order?.restaurant?.name || "Restaurant name"}
        </p>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">How was the delivery?</h2>

        {/* Subheading */}
        <p className="text-gray-600 mb-6 text-center">
          Whether it&apos;s good or bad, let&apos;s talk about it
        </p>

        {/* Render appropriate step based on current state */}
        {step === 1 && (
          <RenderStepOne
            rating={rating}
            handleRatingSelect={handleRatingSelect}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <RenderStepTwo
            selectedAspects={selectedAspects}
            handleAspectToggle={handleAspectToggle}
            handleNext={handleNext}
            handleSubmitDebounced={handleSubmitDebounced}
          />
        )}
        {step === 3 && (
          <RenderStepThree
            selectedAspects={selectedAspects}
            handleAspectToggle={handleAspectToggle}
            handleSubmitDebounced={handleSubmitDebounced}
            comment={comment}
            setComment={setComment}
          />
        )}
      </div>
    </Dialog>
  );
}
