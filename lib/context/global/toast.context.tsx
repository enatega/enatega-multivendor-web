"use client";

// Core
import React, { useRef } from "react";

// Interfaces

// Prime React
import { Toast } from "primereact/toast";

// Components
import CustomNotification from "@/lib/ui/useable-components/notification";
import {
  IToast,
  IToastContext,
  IToastProviderProps,
} from "@/lib/utils/interfaces/";

export const ToastContext = React.createContext<IToastContext>(
  {} as IToastContext
);

export const ToastProvider: React.FC<IToastProviderProps> = ({ children }) => {
  // Ref
  const toastRef = useRef<Toast>(null);

  // Handlers
  const onShowToast = (config: IToast) => {
    toastRef.current?.show({
      severity: config.type,
      life: config?.duration ?? 2500,
      contentStyle: {
        margin: 0,
        padding: 0,
        
      },
      
      content: (
        <CustomNotification
          type={config.type}
          title={config.title}
          message={config.message}
        
        />
      ),
    });
  };

  const value: IToastContext = {
    showToast: onShowToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast ref={toastRef}  className="
        !fixed !top-5 !w-auto !ml-2 sm:!ml-0
        sm:!left-1/2 sm:!-translate-x-1/2 
        lg:!left-auto lg:!translate-x-0 lg:!right-5
        z-[9999]
" />
    </ToastContext.Provider>
  );
};
