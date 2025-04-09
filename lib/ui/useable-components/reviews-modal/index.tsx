"use client"
import { Rating } from "primereact/rating"
import CustomDialog from "../custom-dialog"
import useReviews from "@/lib/hooks/useReviews"
import { useMemo } from "react"
import CustomReviewModal from "../custom-skeletons/reviews.card"
import { formatDateForCreatedAt } from "@/lib/utils/methods"
import { IReview, IReviewsModalProps } from "@/lib/utils/interfaces/reviews.interface"



const ReviewsModal = ({ visible, onHide, restaurantId }: IReviewsModalProps) => {

    // Hooks
    const { data, loading } = useReviews(restaurantId);
    console.log(data, "data of reviews on reviews modal")

    // Extract the review result from the nested data structure
    const reviewResult = data?.reviewsByRestaurant || { reviews: [], ratings: 0, total: 0 }
    console.log("🚀 ~ ReviewsModal ~ reviewResult:", reviewResult)
 
    // Check if there are any reviews
    const hasReviews = reviewResult.total > 0 && reviewResult.reviews.length > 0
    console.log("🚀 ~ ReviewsModal ~ reviewResult.total:", reviewResult.total)


    
  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!hasReviews) return 0

    // If ratings is already the average, use it
    if (reviewResult.ratings) return reviewResult.ratings

    // Otherwise calculate from individual reviews
    
    const sum = reviewResult.reviews.reduce((acc:number, review:IReview) => acc + review.rating, 0)
    return sum / reviewResult.reviews.length
  }, [reviewResult, hasReviews])
  

 // Generate rating breakdown (5 to 1 stars)

//  const ratingBreakdown = useMemo(() => {
//     if (!hasReviews) return []

//     // Initialize counts for each star rating
//     const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

//     // Count reviews for each star rating
//     //@ts-ignore
//     reviewResult.reviews.forEach((review) => {
//       if (counts[review.rating as keyof typeof counts] !== undefined) {
//         counts[review.rating as keyof typeof counts]++
//       }
//     })

//     // Calculate percentages
//     const total = reviewResult.reviews.length
//     return Object.entries(counts)
//       .map(([stars, count]) => ({
//         stars: Number.parseInt(stars),
//         count,
//         percentage: total > 0 ? Math.round((count / total) * 100) : 0,
//       }))
//       .sort((a, b) => b.stars - a.stars) // Sort from 5 to 1 stars
//   }, [reviewResult, hasReviews])

// Calculate how many reviews we have for each star rating (5-star, 4-star, etc.)
const ratingBreakdown = useMemo(() => {
    // If we don't have any reviews, just return an empty array
    if (!hasReviews) return [];
  
    // Start with zero reviews for each star rating
    const starCounts = {
      5: 0,
      4: 0, 
      3: 0,
      2: 0,
      1: 0
    };
    
    // Go through each review and count how many we have for each star level
  
    reviewResult.reviews.forEach((review: IReview) => {
      // Get the star rating from the review (1-5)
      const rating = review.rating;
      
      // Make sure it's a valid rating between 1-5
      if (rating >= 1 && rating <= 5) {
        // Add one to the count for this star rating
        
        starCounts[rating as keyof typeof starCounts]++;
      }
    });
    
    // Calculate what percentage each star rating makes up of the total
    const totalReviews = reviewResult.reviews.length;
    
    // Create our final results array
    const results = [];
    
    // Add data for each star rating (5 stars, 4 stars, etc.)
    for (let stars = 5; stars >= 1; stars--) {

    const count = starCounts[stars as keyof typeof starCounts];
      const percentage = totalReviews > 0 
        ? Math.round((count / totalReviews) * 100) 
        : 0;
        
      results.push({
        stars,
        count,
        percentage
      });
    }
    
    return results;
  }, [reviewResult, hasReviews]);


 // Function to render star rating
  const renderStars = (rating: number) => {
    return (
      <Rating
        value={rating}
        readOnly
        cancel={false}
        className="flex"
        pt={{
          onIcon: { className: "text-amber-500" },
          offIcon: { className: "text-amber-500" },
        }}
      />
    )
  }

 if(loading && visible) return <CustomReviewModal/>

  return (
    <CustomDialog visible={visible} onHide={onHide} className="m-0 z-[100]" width="905px">
    <div className="p-6 pt-16 max-h-[80vh] overflow-y-auto">
      {hasReviews ? (
        <>
          {/* Overall Rating */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border p-4 rounded-md shadow-sm">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-semibold text-gray-700">{averageRating?.toFixed(1)}</h1>
              <p className="text-gray-500 mt-1 font-normal text-xl md:text-2xl">({reviewResult?.total?.toLocaleString()})</p>
              <div className="flex items-center mt-2">{renderStars(Math.round(averageRating))}</div>
            </div>

            {/* Rating Breakdown */}
            <div className="w-full md:w-3/5">
              {ratingBreakdown.map((item) => (
                <div key={item?.stars} className="flex items-center mb-2">
                  <span className="w-6 text-right mr-2">{item?.stars}</span>
                  <span className="text-amber-500">
                    <Rating value={1} stars={1} readOnly cancel={false} className="flex scale-75 origin-left"  pt={{ onIcon: { className: "text-amber-500" },}} />
                  </span>
                  <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${item?.percentage}%` }}></div>
                  </div>
                  <span className="ml-2 text-gray-600">{item?.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {reviewResult?.reviews?.map((review:IReview) => (
              <div key={review?._id} className=" border p-4 rounded-md shadow-sm">
                <h3 className="text-gray-700 font-medium text-lg md:text-2xl mb-1">{review?.order?.user?.name}</h3>
                <div className="flex items-center mb-2">
                  {renderStars(review?.rating)}
                  <span className="ml-2 text-gray-500 font-normal text-[16px]">{formatDateForCreatedAt(review?.createdAt)}</span>
                </div>
                <p className="text-gray-500 font-normal text-lg">{review?.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        // No reviews state
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="text-amber-500 mb-4">
            <Rating value={0} readOnly cancel={false} className="flex justify-center" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Reviews Yet</h2>
          <p className="text-gray-600 max-w-md mb-6">
            This restaurant doesn&apos;t have any reviews yet.
          </p>
         
        </div>
      )}
    </div>
  </CustomDialog>
  )
}

export default ReviewsModal
