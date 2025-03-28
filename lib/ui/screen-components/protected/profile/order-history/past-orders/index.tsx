
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction";
import OrderCardSkeleton from "@/lib/ui/useable-components/custom-skeletons/order.card.skelton";
import OrderCard from "@/lib/ui/useable-components/order-card";
import EmptyState from "@/lib/ui/useable-components/orders-empty-state";
import { IOrder } from "@/lib/utils/interfaces/orders.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RatingModal from "./rating";
import { reviewOrder } from "@/lib/api/graphql/mutations";
import { gql, useMutation } from "@apollo/client";
import useToast from "@/lib/hooks/useToast";

const REVIEWORDER = gql`
  ${reviewOrder}
`

interface IPastOrdersProps {
    pastOrders : IOrder[];
    ordersLoading: boolean;
}

export default function PastOrders({pastOrders,ordersLoading}:IPastOrdersProps) {
    // states 
    const [rating,setRating]= useState<number|null>(null)
    const [showRatingModal, setShowRatingModal] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)

    // hooks
      const router= useRouter()
      const { showToast } = useToast();

    //mutation
      const [mutate, { loading: loadingReviewOrder, error: ErrorReviewOrder }] = useMutation(REVIEWORDER, {
        onCompleted,
      });

      function onCompleted() {
        showToast({ type: 'success', title: 'Rating', message: 'Rating submitted successfully', duration: 3000 });
        setSelectedOrder(null);
      }
    
      
      //Handlesrs
      // use debouncefunction if user click multiple times at once it will call function only 1 time
    const handleReOrderClicked = useDebounceFunction(
        (restaurantId: string | undefined) => {
          console.log("ready for navigation");
          router.push(`/restaurants/${restaurantId}`);
        },
        500 // Debounce time in milliseconds
      );
    const handleRateOrderClicked = useDebounceFunction(
        (orderId: string | undefined, ratingValue:number) => {
          console.log(orderId,"OrderId for rating");
          console.log(ratingValue,"ratingValue on past order component");
              // Find the order by ID
         const order = pastOrders.find((order) => order._id === orderId)
          if (order) {
          setSelectedOrder(order)
          setShowRatingModal(true)
      }
        },
        500 // Debounce time in milliseconds
      );
      console.log(rating, "rating in state")


      const handleSubmitRating = async(
        orderId: string | undefined,
        ratingValue: number,
        comment?: string,
        aspects?: string[],
      ) => {
        console.log(orderId, "OrderId for rating")
        console.log(ratingValue, "ratingValue on past order component")
        console.log(comment, "comment on past order component")
        console.log(aspects, "selected aspects on past order component")
    
        // Set the rating in state
        setRating(ratingValue)
    
        // Here you would  call an API to save the rating
        // For example: saveOrderRating(orderId, ratingValue, comment, aspects);
        await mutate({ variables:{ order: orderId, description:comment, rating:ratingValue } });
    
        // Close the modal
        setShowRatingModal(false)
        setSelectedOrder(null)
      }

    // If ordersLoading display skelton  component of orderCardSkelton
    if (ordersLoading) {
        return (
          <OrderCardSkeleton count={2}/>
        )
      }
    
      // If no orders display component of emptyState and pass props 
      if (pastOrders?.length === 0) {
        return (
          <EmptyState
            // icon="fa-solid fa-receipt"
            title="No Past Orders"
            message="You haven't placed any orders yet."
            actionLabel="Browse Restaurants"
            actionLink="/restaurants"
          />
        )
      }
    
      return (
        <>
        <div className="space-y-4 py-4">
          <h2 className="text-2xl font-bold mb-6">Past Orders</h2>
          <div className="space-y-4">
            {pastOrders?.map((order:IOrder) => (
                <OrderCard
                key={order._id}
                order={order}
                handleReOrderClicked={handleReOrderClicked}
                handleRateOrderClicked={handleRateOrderClicked}
                type="past"
                className="border border-gray-200 rounded-lg shadow-sm"
                />
            ))}
          </div>
        </div>
        {/* Rating Modal */}
      <RatingModal
        visible={showRatingModal}
        onHide={() => setShowRatingModal(false)}
        order={selectedOrder}
        onSubmitRating={handleSubmitRating}
      />
        </>
      )
}