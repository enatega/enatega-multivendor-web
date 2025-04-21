import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Marker } from "@react-google-maps/api";
import { SUBSCRIPTION_RIDER_LOCATION } from "@/lib/api/graphql/subscription/riderLocation";
import { RIDER } from "@/lib/api/graphql/queries/rider";
import RiderMarker from "../../../../../assets/rider_icon.png";

const TrackingRider = ({ id }: { id: string }) => {
  const { loading, error, data, subscribeToMore } = useQuery(RIDER, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUBSCRIPTION_RIDER_LOCATION,
      variables: { riderId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          rider: {
            ...prev.rider,
            ...subscriptionData.data.subscriptionRiderLocation,
          },
        };
      },
    });
    return unsubscribe;
  }, [id, subscribeToMore]);

  if (loading) return null;
  if (error) return null;
  
  let riderCoordinates = {
    lat: parseFloat(data.rider.location.coordinates[1]),
    lng: parseFloat(data.rider.location.coordinates[0]),
  };
  
  return (
    <Marker 
      position={riderCoordinates} 
      icon={{
        url: RiderMarker.src,
        scaledSize: new window.google.maps.Size(40, 40),
      }}
    />
  );
};

export default TrackingRider;