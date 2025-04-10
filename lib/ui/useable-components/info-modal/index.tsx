"use client";
import { useEffect, useState } from "react";
import CustomDialog from "../custom-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import GoogleMapComponent from "@/lib/ui/useable-components/google-map-component";
import {
    IInfoModalProps,
    IOpeningTime,
} from "@/lib/utils/interfaces/info.modal.interface";
import { formatTimeForHoursMins, getCurrentDay } from "@/lib/utils/methods";

/**
 * InfoModal Component
 * 
 * Displays detailed information about a restaurant in a modal dialog
 * Including location map, hours, address and delivery information
 */
const InfoModal = ({ visible, onHide, restaurantInfo }: IInfoModalProps) => {
    // State declarations
    const [currentDay, setCurrentDay] = useState<string>("");
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
        lat: 60.1699,
        lng: 24.9384, // Default to Helsinki
    });

    // Configuration hooks
    const { GOOGLE_MAPS_KEY } = useConfig();

    // UseEffects

    /**
     * Effect to initialize current day and map center coordinates
     * Runs when restaurant information changes
     */
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
        // Convert day format from "Monday" to "MON"
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

    // Helper Methods

    /**
     * Formats opening hours for a given day
     * @param day - The opening time data for a specific day
     * @returns Formatted string representing hours or "Closed" if no times available
     */
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

    /**
     * Gets the current day's opening hours for display in the header
     * @returns Formatted string of today's hours or "Closed" if not available
     */
    const getCurrentDayHours = () => {
        const dayInfo = restaurantInfo?.openingTimes?.find(
            (day) => day.day === currentDay
        );
        if (!restaurantInfo?.isAvailable || !dayInfo || dayInfo.times.length === 0)
            return "Closed";

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
                {/* Google Map Section - Shows restaurant location */}
                <div className="relative">
                    <GoogleMapComponent
                        apiKey={GOOGLE_MAPS_KEY || ""}
                        center={mapCenter}
                        circleRadius={300}
                        visible={visible}
                    />
                </div>

                {/* Restaurant Information Section */}
                <div className="p-6">
                    {/* Restaurant Name Header */}
                    <h1 className="text-xl md:text-3xl font-bold mb-2">
                        {restaurantInfo.name}
                    </h1>

                    {/* Current Operating Status - Green for open, Red for closed */}
                    <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                            icon={faCircle}
                            className={`text-[10px] md:text-xs font-normal md:text-[16px] mr-2 ${restaurantInfo.isAvailable && getCurrentDayHours() !== "Closed" ? "text-green-500" : "text-red-500"}`}
                        />
                        <span>
                            {getCurrentDay(currentDay)} {getCurrentDayHours()}
                        </span>
                    </div>

                    {/* Restaurant Description */}
                    <p className="mb-6 text-xs font-normal md:text-[16px]">
                        {restaurantInfo.description}
                    </p>

                    {/* Address Section with Google Maps link */}
                    <div className="mb-6">
                        <h2 className="text-lg md:text-xl font-bold mb-2">Address</h2>
                        <p className="mb-2 text-xs md:text-[16px] font-normal">
                            {restaurantInfo.address}
                        </p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mapCenter.lat},${mapCenter.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-xs md:text-[16px] font-normal"
                        >
                            See Map
                        </a>
                    </div>

                    {/* Opening Times Section - Lists hours for each day of the week */}
                    <div className="mb-6">
                        <h2 className="text-lg md:text-xl font-bold mb-2">Opening times</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {restaurantInfo.openingTimes.map((day) => (
                                <div
                                    key={day.day}
                                    className="flex justify-between text-xs md:text-[16px] font-normal leading-[16px] md:leading-[24px]"
                                >
                                    <span>{getCurrentDay(day.day)}</span>
                                    <span>{getFormattedHours(day)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Information Section - Shows delivery hours by day */}
                    <div>
                        <h2 className="text-lg md:text-xl font-bold mb-2">
                            Delivery information
                        </h2>
                        <div className="grid grid-cols-1 gap-2">
                            {restaurantInfo.openingTimes.map((day) => (
                                <div
                                    key={`delivery-${day.day}`}
                                    className="flex justify-between text-xs md:text-[16px] font-normal leading-[16px] md:leading-[24px]"
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
