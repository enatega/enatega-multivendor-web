"use client"

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import GoogleMapTrackingComponent from "@/lib/ui/screen-components/protected/order-tracking/components/gm-tracking-comp";
import TrackingOrderDetails from "../../../../screen-components/protected/order-tracking/components/tracking-order-details";
import TrackingHelpCard from "../../../../screen-components/protected/order-tracking/components/tracking-help-card";
import TrackingStatusCard from "@/lib/ui/screen-components/protected/order-tracking/components/tracking-status-card";
import TrackingOrderDetailsDummy from "../../../../screen-components/protected/order-tracking/components/tracking-order-details-dummy";

// Services
import useLocation from "@/lib/ui/screen-components/protected/order-tracking/services/useLocation";
import useTracking from "@/lib/ui/screen-components/protected/order-tracking/services/useTracking";

interface IOrderTrackingScreenProps {
    orderId: string;
}

export default function OrderTrackingScreen({ orderId }: IOrderTrackingScreenProps) {
    const { isLoaded, origin, destination, directions, directionsCallback } = useLocation();
    const { orderTrackingDetails, isOrderTrackingDetailsLoading, subscriptionData } = useTracking({ orderId: orderId });

    // Merge subscription data with order tracking details
    const mergedOrderDetails = orderTrackingDetails && subscriptionData ? {
        ...orderTrackingDetails,
        orderStatus: subscriptionData.orderStatus || orderTrackingDetails.orderStatus,
        rider: subscriptionData.rider || orderTrackingDetails.rider,
        completionTime: subscriptionData.completionTime || orderTrackingDetails.completionTime
    } : orderTrackingDetails;

    return (
        <>
            <div className="w-screen h-full flex flex-col pb-20">
                <div className="scrollable-container flex-1">
                    {/* Google Map for Tracking */}
                    <GoogleMapTrackingComponent 
                        isLoaded={isLoaded} 
                        origin={origin} 
                        destination={destination} 
                        directions={directions} 
                        directionsCallback={directionsCallback}
                        orderStatus={mergedOrderDetails?.orderStatus || 'PENDING'}
                        riderId={mergedOrderDetails?.rider?._id}
                    />
                    
                    {/* Main Content with increased gap from map */}
                    <div className="mt-8 md:mt-10">
                        <PaddingContainer>
                            {/* Status Card and Help Card in the same row */}
                            <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-6 mb-8">
                                {/* Order Status Card */}
                                {!isOrderTrackingDetailsLoading && mergedOrderDetails && (
                                    <TrackingStatusCard orderTrackingDetails={mergedOrderDetails} />
                                )}
                                
                                {/* Help Card - positioned on the left */}
                                <div className="md:ml-0 w-full md:w-auto md:flex-none">
                                    <TrackingHelpCard />
                                </div>
                            </div>
                            
                            {/* Order Details - Full width to match status card */}
                            <div className="flex justify-center md:justify-start">
                                {isOrderTrackingDetailsLoading ? 
                                    <TrackingOrderDetailsDummy /> : 
                                    <TrackingOrderDetails orderTrackingDetails={mergedOrderDetails} />
                                }
                            </div>
                        </PaddingContainer>
                    </div>
                </div>
            </div>
        </>
    );
}