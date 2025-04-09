"use client";
import { useEffect, useState } from "react";
import CustomDialog from "../custom-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import GoogleMapComponent from "@/lib/ui/useable-components/google-map-component";
import { IInfoModalProps, IOpeningTime } from "@/lib/utils/interfaces/info.modal.interface";
import { formatTimeForHoursMins, getCurrentDay } from "@/lib/utils/methods";


const InfoModal = ({ visible, onHide, restaurantInfo }: IInfoModalProps) => {

    //states
  const [currentDay, setCurrentDay] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 60.1699,
    lng: 24.9384, // Default to Helsinki
  });


  // hooks
  const { GOOGLE_MAPS_KEY } = useConfig();

// UseEffects 

// Set current day and map center when restaurantInfo changes
  useEffect(() => {
    // Set current day
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = days[new Date().getDay()];
    // set today to like "MON" instead of "Monday"
    setCurrentDay(today.slice(0, 3).toUpperCase());

    // Set map center if coordinates are available
    if (restaurantInfo?.location?.coordinates) {
      const [lng, lat] = restaurantInfo.location.coordinates;
      setMapCenter({
        lat: Number.parseFloat(lat),
        lng: Number.parseFloat(lng),
      });
    }
  }, [restaurantInfo]);


  //Methods

  // Get formatted opening hours for display
  const getFormattedHours = (day: IOpeningTime) => {
    if (day.times.length === 0) return "Closed";

    return day.times
      .map((time) => {
        const start = formatTimeForHoursMins(time.startTime);
        const end = formatTimeForHoursMins(time.endTime);
        return `${start}-${end}`;
      })
      .join(", ");
  };

  // Get current day's hours for the header only- Dynamically displaying the current day and hours
  // Example: "10:00-22:00" or "Closed" 
  const getCurrentDayHours = () => {
    const dayInfo = restaurantInfo?.openingTimes?.find(
      (day) => day.day === currentDay
    );
    if (!restaurantInfo?.isAvailable ||!dayInfo || dayInfo.times.length === 0) return "Closed";

    return dayInfo.times
      .map((time) => {
        const start = formatTimeForHoursMins(time.startTime);
        const end = formatTimeForHoursMins(time.endTime);
        return `${start}-${end}`;
      })
      .join(", ");
  };


  return (
    <CustomDialog
      visible={visible}
      onHide={onHide}
      className="m-0 z-[100]"
      width="550px"
    >
      <div className="restaurant-info-modal">
        {/* Google Map */}
        <div className="relative">
          <GoogleMapComponent
            apiKey={GOOGLE_MAPS_KEY || ""}
            center={mapCenter}
            circleRadius={300}
            visible={visible}
          />
        </div>

        {/* Restaurant Information */}
        <div className="p-6">
          {/* Restaurant Name */}
          <h1 className="text-3xl font-bold mb-2">{restaurantInfo.name}</h1>

          {/* Current Status */}
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faCircle}
            className={`text-xs mr-2 ${(restaurantInfo.isAvailable && getCurrentDayHours() !== "Closed") ? "text-green-500" : "text-red-500"}`}
            />
            <span>
              {getCurrentDay(currentDay)  }{" "}
              {getCurrentDayHours()}
            </span>
          </div>

          {/* Description */}
          <p className="mb-6">{restaurantInfo.description}</p>

          {/* Address */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Address</h2>
            <p className="mb-2">{restaurantInfo.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapCenter.lat},${mapCenter.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              See Map
            </a>
          </div>

          {/* Opening Times */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Opening times</h2>
            <div className="grid grid-cols-1 gap-2">
              {restaurantInfo.openingTimes.map((day) => (
                <div key={day.day} className="flex justify-between">
                  <span>{getCurrentDay(day.day)}</span>
                  <span>{getFormattedHours(day)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div>
            <h2 className="text-xl font-bold mb-2">Delivery information</h2>
            <div className="grid grid-cols-1 gap-2">
              {restaurantInfo.openingTimes.map((day) => (
                <div
                  key={`delivery-${day.day}`}
                  className="flex justify-between"
                >
                  <span>{getCurrentDay(day.day)}</span>
                  <span>{getFormattedHours(day)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default InfoModal;
