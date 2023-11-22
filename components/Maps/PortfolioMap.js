import React, { useEffect, useState } from "react";
import {
  getApiDataFromAws,
  getDates,
} from "../../api/dashboardDataService";

function PortfolioMap(props) {
  const [stateMarkers, setStateMarkers] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    //alert("called from Map:" + buildingType + " " + dateSpan + " " + dataSet);
    
    if(buildingType != null && dateSpan !=null && dataSet !=null){
      const dates = getDates(dateSpan);
      const prepareData = `startDateString=${dates.start}&endDateString=${dates.end}&buildingType=${buildingType}&dataSet=${dataSet}&functionName=verdeosDemoGlobalPortfolio`;
      const resp = await getApiDataFromAws(prepareData);
      setStateMarkers(resp);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataInitial = async () => {
      fetchData(props.buildingType, props.dateSpan, props.dataSet);
    };

    fetchDataInitial();
  }, []);

  useEffect(() => {
    if (props.buildingType && props.dateSpan && props.dataSet) {
      fetchData(props.buildingType, props.dateSpan, props.dataSet);
    }
  }, [props.buildingType, props.dateSpan, props.dataSet]);

  const mapRef = React.useRef(null);
  useEffect(() => {
    if (!loading && props.buildingType && props.dateSpan && props.dataSet) {
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

      var iconCenter = {
        url: "/map/buildings.png",
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(30, 70),
      };

      const centerMarker = new google.maps.Marker({
        position: myLatlng,
        map,
        icon: iconCenter,
      });
      if (stateMarkers) {
        stateMarkers.forEach((buildings) => {
          var icon = {
            url: "/map/mainicon.png",
            scaledSize: new google.maps.Size(75, 75),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(45, 30),
          };

          const markerw = new google.maps.Marker({
            position: buildings.position,
            map: map,
            animation: google.maps.Animation.DROP,
            title: buildings.title,
            icon: icon,
            label: {
              text: buildings.value == "null" ? "0" : buildings.value,
              fontFamily: "Material Icons",
              color: "#ffffff",
              fontSize: "14px",
            },
          });

          google.maps.event.addListener(markerw, "click", function () {
            infowindow.open(map, markerw);
          });
        });
      }
      const contentString =
        '<div class="info-window-content"><h2>VerdeOS</h2>' +
        "<p>We are using Google map to Show States from verdeos on Click Event</p></div>";

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
    }
  }, [loading, props.buildingType, props.dateSpan, props.dataSet]);

  return (
    <>
      <div className="relative w-full rounded h-300-px">
        <div
          className="rounded h-300-px"
          ref={mapRef}
          style={{ height: "450px" }}
        />
      </div>
    </>
  );
}

export default PortfolioMap;
