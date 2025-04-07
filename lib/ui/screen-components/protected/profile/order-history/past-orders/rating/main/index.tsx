"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction";
import RenderStepTwo from "../step-two";
import RenderStepOne from "../step-one";
import RenderStepThree from "../step-three";
import { IRatingModalProps } from "@/lib/utils/interfaces/ratings.interface";
import CustomDialog from "@/lib/ui/useable-components/custom-dialog";

export default function RatingModal({
  visible,
  onHide,
  order,
  onSubmitRating,
}: IRatingModalProps) {
  // State management
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);

  // Debounced submit function to prevent multiple submissions
  const handleSubmitDebounced = useDebounceFunction(
    () => {
      if (order && rating !== null) {
        onSubmitRating(order._id, rating, comment, selectedAspects);
        onHide();
      }
    },
    500
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

  // Handle aspect selection/deselection
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
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  return (
    <CustomDialog visible={visible} onHide={onHide} className="m-0" width="594px">
      <div className="flex flex-col items-center p-8 pt-16 rounded-xl gap-4">
        {/* Restaurant Image */}
        <div className="w-[162px] h-[162px] rounded-full overflow-hidden mb-4">
          {order?.restaurant?.image ? (
            <Image
              src={order.restaurant.image}
              alt={order.restaurant.name || "Restaurant"}
              width={162}
              height={162}
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
        <p className="text-gray-600 ">
          {order?.restaurant?.name || "Restaurant name"}
        </p>

        {/* Heading */}
        <h2 className="text-2xl font-bold  text-black">How was the delivery?</h2>

        {/* Subheading */}
        <p className="text-gray-600  text-center text-lg">
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
    </CustomDialog>
  );
}