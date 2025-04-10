'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useConfig } from '../configuration/configuration.context';
import { ToastContext } from '@/lib/context/global/toast.context';
import { IGoogleMapsContext, IGoogleMapsProviderProps } from '../../utils/interfaces';
import { loadGoogleMapsScript } from '@/lib/utils/methods';

export const GoogleMapsContext = createContext<IGoogleMapsContext>({} as IGoogleMapsContext);

export const GoogleMapsProvider: React.FC<IGoogleMapsProviderProps> = ({ children }) => {
  const { GOOGLE_MAPS_KEY } = useConfig();
  const { showToast } = useContext(ToastContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (GOOGLE_MAPS_KEY && typeof GOOGLE_MAPS_KEY === 'string') {
      loadGoogleMapsScript(GOOGLE_MAPS_KEY)
        .then(() => {
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          showToast({
            type: 'error',
            title: 'Google Maps',
            message: 'Failed to load Google Maps.',
          });
        });
    }
  }, [GOOGLE_MAPS_KEY]);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};


