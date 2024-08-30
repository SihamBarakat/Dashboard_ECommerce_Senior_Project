import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Margin } from "@syncfusion/ej2-react-charts";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./Style2";
import { latLng } from "leaflet";
const MapSup = ({ lat, lng }) => {
  const [address, setAddress] = useState(null);
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "AIzaSyCjU2Z3rFcn8kC_EjC3pSwhLLAro2ZngpI";
  const containerStyle = {
    width: "70%",
    height: "400px",
  };

  const center = {
    lat: 33.514153951781914,
    lng: 36.26979719851376,
  };
  // const onMapClick = useCallback((event) => {
  //       const latitude = event.latLng.lat();
  //       const longitude = event.latLng.lng();
  //       setSelectedLocation({ latitude, longitude });
  //     }, []);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: null,
    longitude: null,

    city: "",
    details: "",
    district: "",
  });

  const onMapClick = useCallback(async (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    // Define the endpoint for reverse geocoding
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

    try {
      // Fetch the geocoding data
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const results = data.results;
        const addressComponents = results[0].address_components;

        // Extract country, city, street, and district information
        let country = "";
        let city = "";
        let details = "";
        let district = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("route")) {
            details = component.long_name;
          }
          if (component.types.includes("administrative_area_level_2")) {
            district = component.long_name;
          }
        });

        // Update state with the selected location and additional information
        setSelectedLocation({ latitude, longitude, city, details, district });
      } else {
        console.error("Geocoding failed:", data.status);
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  }, []);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              latlng: `${lat},${lng}`,
              key: API_KEY,
            },
          }
          
        );

        if (response.data.status === "OK") {
          const addressComponents =
            response.data.results[0]?.address_components;
          const addressDetails = {
            details: addressComponents?.find((component) =>
              component.types.includes("route")
            )?.long_name,
            city: addressComponents?.find((component) =>
              component.types.includes("locality")
            )?.long_name,
            district: addressComponents?.find((component) =>
              component.types.includes("administrative_area_level_2")
            )?.long_name,
          };
          setAddress(addressDetails);
          console.log(lat)
          console.log(lng)
        
        } else {
          setError("Failed to retrieve address.");
        }
      } catch (err) {
        setError("Error fetching address.");
        console.error(err);
      }
    };

    fetchAddress();
  }, [lat, lng]);
  const handleSubmit = () => {
    if (selectedLocation) {
      fetch("http://donkey-casual-python.ngrok-free.app/supplier/view", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTI0NzIxLCJpYXQiOjE3MjA4ODQ3MjEsImp0aSI6Ijg2OWQ3MTI4NTQ0YjQwOTg5MjRjNGJkMzgzZTk4ODljIiwidXNlcl9pZCI6MX0.xop9VKtdQa9FhZlbVMkJQRvES8pywV0EukiwXxMVBdY",
        },
        body: JSON.stringify(selectedLocation),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Location saved:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(selectedLocation);
    }
  };
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <>
      <BoxContainer>
        <LoadScript googleMapsApiKey="AIzaSyCjU2Z3rFcn8kC_EjC3pSwhLLAro2ZngpI">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={onMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
          {selectedLocation && (
          <div>
            <p>Latitude: {selectedLocation.latitude}</p>
            <p>Longitude: {selectedLocation.longitude}</p>
        
            <button onClick={handleSubmit}>Save Location</button><br/>
            <button onClick={goback}>Go Back</button>
          </div>
        )}
        </LoadScript>
        
      </BoxContainer>
      <div >
        
      </div>
    </>
  );
};

export default MapSup;
