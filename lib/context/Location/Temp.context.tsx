import {
  ILocation,
  ILocationContext,
  ILocationProvider,
} from "@/lib/utils/interfaces";
import React, { useContext, useEffect, useRef, useState } from "react";

export const LocationContext = React.createContext({} as ILocationContext);

export const LocationProvider = ({ children }: ILocationProvider) => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const isInitialRender = useRef(true);
  useEffect(() => {
    const locationStr = localStorage.getItem("location");

    if (locationStr && locationStr !== "undefined") {
      setLocation(JSON.parse(locationStr));
    }
  }, []);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (location) localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
