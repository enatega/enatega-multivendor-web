"use client"

import React from 'react';
import HomeSearch from '@/lib/ui/useable-components/Home-search';
import styles from './Start.module.css';
import { useLocation } from '@/lib/context/Location/Location.context';  // Import useLocation context
import { useRouter } from 'next/navigation';  // Import useRouter for navigation

const Start: React.FC = () => {
  const { setLocation } = useLocation();  // Destructure setLocation to update location in context
  const router = useRouter();  // Initialize useRouter for navigation

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);

          setLocation({
            name: "Current Location",  
            lat: latitude,
            lng: longitude,
          });

          
          router.push('/restaurants');  
        },
        error => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }

  return (
    <div className={`h-screen bg-cover bg-center flex items-center justify-center bg-[#94e469]`}>
      <div>
        <div>
          <h1 className={`font-extrabold text-[40px] text-white text my-6 md:text-[80px] ${styles.anim}`}>Burgers Delivered</h1>
        </div>
        <HomeSearch />
        <div className='my-6 text-white items-center justify-center flex'>
          <div className='flex items-center gap-2'>
            <i className="pi pi-map-marker" style={{ fontSize: '1rem', color: "white" }}></i>
            <button className='me-2 underline' onClick={handleShareLocation}>
              Share Location
            </button>
          </div>
          <button className='underline'>Login for saved address</button>
        </div>
      </div>
    </div>
  )
}

export default Start;
