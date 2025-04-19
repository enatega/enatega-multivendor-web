"use client"
import useNearByRestaurantsPreview from "@/lib/hooks/useNearByRestaurantsPreview";
import { FC, useState } from "react";
import Loader from "./components/Loader";
import DisplayError from "./components/DisplayError";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import Map from "./components/Map";
import SideList from "./components/SideList";

interface MapViewPageProps {
  params: {
    slug: string;
  };
}

const MapView: FC<MapViewPageProps> = ({ params }) => {
  const { slug } = params;
  const { error, loading, restaurantsData , groceriesData } = useNearByRestaurantsPreview();

  const { GOOGLE_MAPS_KEY } = useConfig();
  const data = slug === "restaurants" ? restaurantsData : groceriesData;
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="w-screen">
        {
          loading 
          ?
            <Loader />
          : 
          error 
          ?
            <DisplayError  />
          :
          data
          ?
            <div className="flex mt-1 relative min-h-screen max-h-screen md:flex-row flex-col-reverse">
              <div className="md:relative absolute bottom-8 z-[99999] md:flex-[0.35] xl:flex-[0.25] overflow-y-auto md:w-auto w-full">
                <SideList 
                data={data} 
                slug={slug} 
                onHover={(coordinates) => setCenter(coordinates)} 
                />
              </div>
              <div className="flex-[0.65] xl:flex-[0.75] h-screen overflow-y-auto">
                <Map
                apiKey={GOOGLE_MAPS_KEY} 
                data={data} 
                center={center}
                /> 
              </div>
            </div>
          : 
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-2xl font-bold text-gray-900">
                No data available to show.
              </h1>
            </div>
            
        }
    </div>
  );
};

export default MapView;
