"use client"

// Componentns
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import GoogleMapTrackingComponent from "../../../../screen-components/protected/order-tracking/components/gm-tracking-comp";

// Services
import useLocation from "../../../../screen-components/protected/order-tracking/services/useLocation";

// Assets
import TrackingOrderDetails from "../../../../screen-components/protected/order-tracking/components/tracking-order-details";
import TrackingHelpCard from "../../../../screen-components/protected/order-tracking/components/tracking-help-card";
import useTracking from "../../../../screen-components/protected/order-tracking/services/useTracking";

interface IOrderTrackingScreenProps {
    orderId: string;
}

export default function OrderTrackingScreen({ orderId }: IOrderTrackingScreenProps) {

    const { isLoaded, origin, destination, directions, directionsCallback } = useLocation();
    const { order } = useTracking({ orderId: orderId });

    console.log("order", order);

    return (
        <>
            <div className="w-screen h-full flex flex-col pb-20">
                <div className="scrollable-container flex-1 ">
                    {/* <!-- Header with map and navigation --> */}
                    <GoogleMapTrackingComponent isLoaded={isLoaded} origin={origin} destination={destination} directions={directions} directionsCallback={directionsCallback} />
                    {/* <!-- Main Content --> */}
                    <PaddingContainer>
                        <div className="bg-white py-4 md:py-8 flex md:flex-row flex-col md:items-start items-center justify-around gap-9 mx-auto">
                            {/* Order Details */}
                            <TrackingOrderDetails />

                            {/* Help Card */}
                            <TrackingHelpCard />
                        </div>
                    </PaddingContainer>
                </div>
            </div>

        </>
    );
}
