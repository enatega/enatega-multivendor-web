import ActionButton from "@/lib/ui/useable-components/action-button";
import { ratingOptions } from "@/lib/utils/constants";
import { IRatingOption } from "@/lib/utils/interfaces/ratings.interface";
import { twMerge } from "tailwind-merge";


// Rating option component - Displays individual rating options (1-5 stars)
const RatingOption = ({ value, emoji, label, selected, onSelect }: IRatingOption) => (
    <span
      onClick={() => onSelect(value)}
      className={twMerge(
        "flex flex-col cursor-pointer items-center focus:outline-none transition-all hover:scale-125 ease-in-out",
        selected ? "transform scale-125 transition-all ease-in-out" : ""  // Scale up when selected
      )}
    >
      <span className="text-3xl mb-2">{emoji}</span>
      <span className={twMerge("text-sm text-gray-600",
        selected ? "font-semibold" : ""
      )}>{label}</span>
    </span>
  )

  // Render the first step - Rating selection (1-5 stars)
  function RenderStepOne({rating,handleRatingSelect,handleNext}: {rating: number | null,handleRatingSelect: (value: number) => void,handleNext: () => void}) {
    return (
        <div className="w-full">
          <div className="flex justify-around items-center mb-8 md:px-20">
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
  } 
  export default RenderStepOne