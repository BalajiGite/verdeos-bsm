import React from "react";


function MapExample() {

  const stateMarkers = [
    { position: { lat: -33.8688, lng: 151.2093 }, title: 'New South Wales (NSW)' }, // Sydney, NSW
    { position: { lat: -27.4698, lng: 153.0251 }, title: 'Queensland (QLD)' }, // Brisbane, QLD
    { position: { lat: -31.9523, lng: 115.857048 }, title: 'Western Australia (WA)' }, // Perth, WA
    { position: { lat: -37.8136, lng: 144.9631 }, title: 'Victoria (VIC)' }, // Melbourne, VIC
    { position: { lat: -34.9285, lng: 138.6007 }, title: 'South Australia (SA)' }, // Adelaide, SA
    { position: { lat: -35.3075, lng: 149.1244 }, title: 'Australian Capital Territory (ACT)' }, // Canberra, ACT
    { position: { lat: -42.8821, lng: 147.3272 }, title: 'Tasmania (TAS)' }, // Hobart, TAS
    { position: { lat: -12.4634, lng: 130.8456 }, title: 'Northern Territory (NT)' }, // Darwin, NT
  ];
  
  // You can add markers for other states and territories as needed
  

  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "-25.2744";
    let lng = "133.7751";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 4,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        // ... (your existing styles)
      ],
    };

    map = new google.maps.Map(map, mapOptions);
    var icon = {
      url: "https://www.nabers.gov.au/themes/custom/nabers/rating-register/dist/static/cluster_large.png", // url
      scaledSize: new google.maps.Size(60, 60), // size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(30, 20) // anchor 
    };
    
    const centerMarker = new google.maps.Marker({
      position: myLatlng,
      map,
      icon: icon,
    });

    stateMarkers.forEach((buildings) => {

     

      const markerw = new google.maps.Marker({
        position: buildings.position,
        map: map,
        animation: google.maps.Animation.DROP,
        title: buildings.title,
        icon:icon,
        label: {
          text: "56",
          fontFamily: "Material Icons",
          color: "#ffffff",
          fontSize: "14px",
        },
      });

      google.maps.event.addListener(markerw, "click", function () {
        infowindow.open(map, markerw);
      });

    });


    const contentString =
      '<div class="info-window-content"><h2>VerdeOS</h2>' +
      "<p>We are using Google map to Show States from verdeos on Click Event</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

  });

  return (
    <>
      <div className="relative w-full rounded h-300-px">
        <div className="rounded h-300-px" ref={mapRef} style={{ height: "450px" }} />
      </div>
    </>
  );
}

export default MapExample;
