import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ center, markers }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
    });

    markers.forEach((marker) => {
      new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
      });
    });
  }, [center, markers]);

  return (
    <div ref={mapRef} className="h-350 w-full"></div>
  );
};

export default GoogleMap;
