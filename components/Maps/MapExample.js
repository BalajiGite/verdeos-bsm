import React from "react";

function MapExample() {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        // ... (your existing styles)
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "VerdeOS!",
    });

    const contentString =
      '<div class="info-window-content"><h2>VerdeOS</h2>' +
      "<p>A free Admin for Tailwind CSS, React, React Hooks, and NextJS.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  });

  return (
    <>
      <div className="relative w-full rounded h-300-px">
        <div className="rounded h-300-px" ref={mapRef} style={{ height: "300px" }} />
      </div>
    </>
  );
}

export default MapExample;
