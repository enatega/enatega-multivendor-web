import { DirectionsRenderer, DirectionsService, GoogleMap, Marker } from '@react-google-maps/api'
import React from 'react'

// Assets
import HomeIcon from "../../../../../assets/home_icon.png";
import RestIcon from "../../../../../assets/rest_icon.png";
import Image from "next/image";


interface IGoogleMapTrackingComponent {
  isLoaded: boolean,
  origin: {
    lat: number,
    lng: number
  },
  destination: {
    lat: number,
    lng: number
  },
  directions: google.maps.DirectionsResult | null,
  directionsCallback: (result: google.maps.DirectionsResult | null, status: string) => void
}

function GoogleMapTrackingComponent({ isLoaded, origin, destination, directions, directionsCallback }: IGoogleMapTrackingComponent) {
  return (
    <div className="relative">
      {isLoaded ?
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
          center={{
            lat: 24.8607, // Example: Karachi
            lng: 67.0011,
          }}
          zoom={13}
        >
          {/* Custom Origin Marker */}
          <Marker
            position={origin}
            icon={{
              url: HomeIcon.src, // Replace with your icon path or external URL
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />

          {/* Custom Destination Marker */}
          <Marker
            position={destination}
            icon={{
              url: RestIcon.src, // Replace with your icon path or external URL
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />

          {!directions && (
            <DirectionsService
              options={{
                destination,
                origin,
                travelMode: google.maps.TravelMode.DRIVING,
              }}
              callback={directionsCallback}
            />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                directions,
                suppressMarkers: true, // Hide default markers
                polylineOptions: {
                  strokeColor: "#5AC12F", // blue line
                  strokeOpacity: 0.8,
                  strokeWeight: 3, // thickness
                  zIndex: 10,
                },
              }}
            />
          )}
        </GoogleMap>
        : <>
          <Image
            alt="Map showing delivery route"
            className="w-full h-64 object-cover"
            height="300"
            src="https://storage.googleapis.com/a1aa/image/jt1AynRJJVtM9j1LRb30CodA1xsK2R23pWTOmRv3nsM.jpg"
            width="1200"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#5AC12F] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            H
          </div>{" "}
        </>
      }
    </div>
  )
}

export default GoogleMapTrackingComponent