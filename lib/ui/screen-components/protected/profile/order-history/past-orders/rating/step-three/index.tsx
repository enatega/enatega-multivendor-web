import React from "react";
import ActionButton from "@/lib/ui/useable-components/action-button"
import RenderAspects from "@/lib/ui/useable-components/render-aspects"
import { IRenderStepThreeProps } from "@/lib/utils/interfaces/ratings.interface";
import CustomButton from "@/lib/ui/useable-components/button";


  // Render the third step - Comment input with aspects selection
  const RenderStepThree: React.FC<IRenderStepThreeProps> = ({selectedAspects, handleAspectToggle, handleSubmitDebounced, comment, setComment}) => (
    <div className="w-full">
      <RenderAspects selectedAspects={selectedAspects} handleAspectToggle={handleAspectToggle} />
      <CustomButton
      label="+ Add a comment"
      className="!font-thin w-full py-2 rounded-full bg-gray-100 text-gray-400 mb-4 text-center"/>
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


  export default RenderStepThree