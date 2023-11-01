import React, { useEffect, useState } from "react";
import { getApiDataFromAws, getApiDataFromAwsDemo } from "../../api/dashboardDataService";
import Dropdown from "../Dropdowns/Dropdown.js";

function PortfolioMap() {
  const [stateMarkers, setStateMarkers] = useState([]);
  const [dateSet, setDateSet] = useState(null);
  const [dateSpan, setDateSpan] = useState(null);
  const [buildingType, setBuildingType] = useState(null);

  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [selectedDateSpan, setSelectedDateSpan] = useState(null);
  const [selectedBuildingType, setSelectedBuildingType] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleOptionSelect = (option) => {
    setSelectedDataSet(option);
  };

  const handleBuildingType = (option) => {
    setSelectedBuildingType(option);
  };

  const handleDateSpan = (option) => {
    setSelectedDateSpan(option);
  };

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    const prepareData = `startDateString=2023-01-01&endDateString=2023-01-01&buildingType=${buildingType}&dataSet=${dataSet}&functionName=verdeosDemoGlobalPortfolio`;
    const resp = await getApiDataFromAws(prepareData);
    setStateMarkers(resp);
    setLoading(false);
  };

  useEffect(() => {
    const fetchDataInitial = async () => {
      const buildingTypeJson = await getApiDataFromAws("functionName=verdeosDemoBuildingType");
      setBuildingType(buildingTypeJson);
      setSelectedBuildingType(buildingTypeJson[0].name);

      const dateSpan = await getApiDataFromAwsDemo("21");
      setDateSpan(dateSpan);
      setSelectedDateSpan(dateSpan[0].name);

      const dataSets = await getApiDataFromAws("functionName=verdeosDemoDataSets");
      setDateSet(dataSets);
      setSelectedDataSet(dataSets[0].name);

      fetchData(buildingTypeJson[0].name, dateSpan[0].name, dataSets[0].name);
    };

    fetchDataInitial();
  }, []);

  useEffect(() => {
    if (selectedBuildingType && selectedDateSpan && selectedDataSet) {
      fetchData(selectedBuildingType, selectedDateSpan, selectedDataSet);
    }
  }, [selectedBuildingType, selectedDateSpan, selectedDataSet]);

  const mapRef = React.useRef(null);
  useEffect(() => {
    if (!loading && selectedBuildingType && selectedDateSpan && selectedDataSet) {
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
        url: "https://www.nabers.gov.au/themes/custom/nabers/rating-register/dist/static/icon_building.png",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 50),
      };

      const centerMarker = new google.maps.Marker({
        position: myLatlng,
        map,
        icon: iconCenter,
      });

      stateMarkers.forEach((buildings) => {
        var icon = {
          url: "https://www.nabers.gov.au/themes/custom/nabers/rating-register/dist/static/cluster_large.png",
          scaledSize: new google.maps.Size(60, 60),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(30, 20),
        };

        const markerw = new google.maps.Marker({
          position: buildings.position,
          map: map,
          animation: google.maps.Animation.DROP,
          title: buildings.title,
          icon: icon,
          label: {
            text: buildings.value == "null"?"0":buildings.value,
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
    }
  }, [loading, selectedBuildingType, selectedDateSpan, selectedDataSet]);

  return (
    <>
      <div className="flex mb-2 justify-end pt-4">
        <div className="mr-4">
          <Dropdown
            className="energy-usage-intensity-button-bg-color"
            selected={selectedBuildingType}
            options={buildingType}
            onSelect={handleBuildingType}
          />
        </div>
        <div className="mr-4">
          <Dropdown
            selected={selectedDateSpan}
            options={dateSpan}
            onSelect={handleDateSpan}
          />
        </div>
        <div className="mr-4 pr-4">
          <Dropdown
            selected={selectedDataSet}
            options={dateSet}
            onSelect={handleOptionSelect}
          />
        </div>
      </div>
      <div className="relative w-full rounded h-300-px">
        <div className="rounded h-300-px" ref={mapRef} style={{ height: "450px" }} />
      </div>
    </>
  );
}

export default PortfolioMap;
