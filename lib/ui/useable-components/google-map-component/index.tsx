"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Libraries,
  Circle,
} from "@react-google-maps/api";
import styles from "./google-map-component.module.css";

interface IGoogleMapComponentProps {
  apiKey: string;
  center: { lat: number; lng: number };
  circleRadius?: number; // Optional prop for circle radius in meters
  visible: boolean;
}

const GoogleMapComponent = ({
  apiKey,
  center,
  circleRadius = 300,
  visible,
}: IGoogleMapComponentProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(15);

  // Memoize values to prevent reinitialization
  const libraries: Libraries = useMemo(() => ["places"], []);
  const mapsKey = useMemo(() => apiKey, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapsKey,
    libraries,
    id: "google-map-script",
  });

  // Reset map when visibility changes
  useEffect(() => {
    if (!visible && mapInstance) {
      // Clean up map instance when component becomes invisible
      setMapInstance(null);
    }
  }, [visible, mapInstance]);

  const mapContainerStyle = {
    width: "100%",
    height: "360px",
    position: "relative" as const,
  };

  // Circle options
  const circleOptions = {
    strokeColor: "#000",
    strokeOpacity: 0.5,
    strokeWeight: 1,
    fillColor: "#000",
    fillOpacity: 0.1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapInstance(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMapInstance(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    if (mapInstance) {
      const newZoom = Math.min(zoom + 1, 20);
      mapInstance.setZoom(newZoom);
      setZoom(newZoom);
    }
  }, [mapInstance, zoom]);

  const handleZoomOut = useCallback(() => {
    if (mapInstance) {
      const newZoom = Math.max(zoom - 1, 1);
      mapInstance.setZoom(newZoom);
      setZoom(newZoom);
    }
  }, [mapInstance, zoom]);

  if (!visible) return null;

  if (loadError) {
    return (
      <div
        style={mapContainerStyle}
        className="flex items-center justify-center bg-gray-100"
      >
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        style={mapContainerStyle}
        className="flex items-center justify-center bg-gray-100"
      >
        Loading map...
      </div>
    );
  }

  return (
    <div className="map-container" style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false, // Disable default zoom controls
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          cameraControl: false,
          styles: [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                { saturation: -30 }, // Slight desaturation to match the grayscale look
              ],
            },
          ],
        }}
      >
        <Marker position={center} />
        <Circle center={center} radius={circleRadius} options={circleOptions} />
      </GoogleMap>

      {/* Custom Zoom Controls */}
      <div className={styles.zoomControls}>
        <button
          className={styles.zoomButton}
          onClick={handleZoomIn}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          className={styles.zoomButton}
          onClick={handleZoomOut}
          aria-label="Zoom out"
        >
          −
        </button>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
