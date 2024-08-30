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
} from "../components/Style2";
import { latLng } from "leaflet";
const MapComponent = ({ lat, lng }) => {
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
      navigate('/dashSupplier')
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
            <p>City: {selectedLocation.city}</p>
            <p>District: {selectedLocation.district}</p>
            <p>Street: {selectedLocation.details}</p>
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

export default MapComponent;

// import React, { useState, useCallback } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 33.514153951781914,
//    lng: 36.26979719851376
// };

// const MapComponent = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [address, setAddress] = useState(null);

//   const onMapClick = useCallback((event) => {
//     const latitude = event.latLng.lat();
//     const longitude = event.latLng.lng();

//     setSelectedLocation({  latitude,  longitude });

//     // Perform reverse geocoding to get address information
//     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCjU2Z3rFcn8kC_EjC3pSwhLLAro2ZngpI`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.results && data.results.length > 0) {
//           const addressComponents = data.results[0].address_components;
//           const address = {
//             country: addressComponents.find(comp => comp.types.includes("country"))?.long_name || '',
//             city: addressComponents.find(comp => comp.types.includes("locality"))?.long_name || '',
//             district: addressComponents.find(comp => comp.types.includes("sublocality"))?.long_name || '',
//             street: addressComponents.find(comp => comp.types.includes("route"))?.long_name || '',
//           };
//           setAddress(address);
//           console.log(address)
//         }
//       })
//       .catch(error => console.error('Error fetching address:', error));
//   }, []);

//   const handleSubmit = () => {
//     if (selectedLocation) {
//       fetch('http://donkey-casual-python.ngrok-free.app/supplier/view', {
//         method: 'put',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTI0NzIxLCJpYXQiOjE3MjA4ODQ3MjEsImp0aSI6Ijg2OWQ3MTI4NTQ0YjQwOTg5MjRjNGJkMzgzZTk4ODljIiwidXNlcl9pZCI6MX0.xop9VKtdQa9FhZlbVMkJQRvES8pywV0EukiwXxMVBdY',
//         },
//         body: JSON.stringify({selectedLocation, address}),
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Location saved:', data);
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//       console.log(selectedLocation);
//     }
//   };

//   return (
//     <>
//       <LoadScript googleMapsApiKey="AIzaSyCjU2Z3rFcn8kC_EjC3pSwhLLAro2ZngpI">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           onClick={onMapClick}
//         >
//           {selectedLocation && <Marker position={selectedLocation} />}
//         </GoogleMap>
//       </LoadScript>
//       {address && (
//         <div>
//           <p>Country: {address.country}</p>
//           <p>City: {address.city}</p>
//           <p>District: {address.district}</p>
//           <p>Street: {address.street}</p>
//         </div>
//       )}
//       <button onClick={handleSubmit}>Save Location</button>
//     </>
//   );
// };

// export default MapComponent;

// src/MapComponent.js
// import React, { useState, useCallback } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// const MapComponent = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const onMapClick = useCallback((event) => {
//     const latitude = event.latLng.lat();
//     const longitude = event.latLng.lng();
//     setSelectedLocation({ latitude, longitude });
//   }, []);

//   const handleSubmit = () => {
//     if (selectedLocation) {
//       fetch('http://donkey-casual-python.ngrok-free.app/supplier/view', {
//         method: 'put',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization':
//               'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTI0NzIxLCJpYXQiOjE3MjA4ODQ3MjEsImp0aSI6Ijg2OWQ3MTI4NTQ0YjQwOTg5MjRjNGJkMzgzZTk4ODljIiwidXNlcl9pZCI6MX0.xop9VKtdQa9FhZlbVMkJQRvES8pywV0EukiwXxMVBdY ',

//         },
//         body: JSON.stringify(selectedLocation),
//       })

//         .then(response => response.json())
//         .then(data => {
//           console.log('Location saved:', data);
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//         console.log(selectedLocation)
//     }
//   };

//   return (
//     <>
//       <LoadScript googleMapsApiKey="AIzaSyCjU2Z3rFcn8kC_EjC3pSwhLLAro2ZngpI">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           onClick={onMapClick}
//         >
//           {selectedLocation && <Marker position={selectedLocation} />}
//         </GoogleMap>
//       </LoadScript>
//       <button onClick={handleSubmit}>Save Location</button>
//     </>
//   );
// };

// export default MapComponent;

//true
// // components/LocationForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import Map from './Map';

// const MapComponent = () => {
//   const [location, setLocation] = useState(null);

//   const handleLocationSelect = (location) => {
//     setLocation(location);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!location) {
//       alert('Please select a location on the map.');
//       return;
//     }
//     try {
//       await axios.post('YOUR_BACKEND_API_ENDPOINT', location);
//       alert('Location saved successfully!');
//     } catch (error) {
//       console.error('Error saving location:', error);
//       alert('Failed to save location.');
//     }
//   };

//   return (
//     <div>
//       <h2>Select a Location</h2>
//       <Map onLocationSelect={handleLocationSelect} />
//       <button onClick={handleSubmit} disabled={!location}>
//         Save Location
//       </button>
//     </div>
//   );
// };

// export default MapComponent;

// // src/components/Map.js
// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
// import axios from 'axios';
// import {
//   BoldLink,
//   BoxContainer,
//   FormContainer,
//   Input,
//   MutedLink,
//   SubmitButton,
// } from "../components/Style2";
// const libraries = ["places"];

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [autocomplete, setAutocomplete] = useState(null);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   //const [satellite, setsatellite] = useState('satellite');
//   const onLoad = (mapInstance) => {
//     setMap(mapInstance);
//   };

//   const onLoadAutocomplete = (autocompleteInstance) => {
//     setAutocomplete(autocompleteInstance);
//   };

//   const onPlaceChanged = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       setSelectedPlace({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//         address: place.formatted_address,
//       });
//     } else {
//       console.log('Autocomplete is not loaded yet!');
//     }
//   };

//   const handleSave = () => {
//     if (selectedPlace) {
//       axios.post('http://localhost:8000/api/locations/', selectedPlace)
//         .then(response => {
//           console.log('Location saved successfully:', response.data);
//         })
//         .catch(error => {
//           console.error('There was an error saving the location!', error);
//         });
//     }
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://donkey-casual-python.ngrok-free.app/catalog/category",
//           {
//             method: "get",
//             headers: {
//               //'Content-Type': 'application/json',
//               "ngrok-skip-browser-warning": "true",
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//             },
//           }
//         );
//         const data = await response.json();
//         setCategories(data.categories);
//         setLoading(false);

//           // Implement the if condition based on the received data
//           if (data.categories.name===selectedOption1 ) {
//               console.log('The value is example');
//           } else {
//               setMessage('The value is not example');
//           }
//       } catch (error) {
//           console.error('Error fetching data:', error);
//           setMessage('Error fetching data');
//       }
//   };

//   fetchData();

//   }, []);
//   return (
//     <BoxContainer>
//     <form method='post' onSubmit={handleSave} >
//       <LoadScript googleMapsApiKey="AIzaSyCjU2Z3rFcn8kC_EjC3pSwhLLAro2ZngpI" libraries={libraries}>
//         <GoogleMap
//           mapContainerStyle={{ height: "400px", width: "800px" }}
//           center={{ lat: -1.745, lng: -18.523 }}
//           zoom={10}
//           onLoad={onLoad}
//           //mapTypeId={satellite}
//         >
//           {selectedPlace && <Marker position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }} />}
//           <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
//             <input type="text" placeholder="Search for a location" style={{ width: "300px", height: "40px" }} />
//           </Autocomplete>
//         </GoogleMap>
//       </LoadScript>
//       <button  className='ml-96' >Save Location</button>
//     </form>
//     </BoxContainer>
//   );
// };

// export default MapComponent;

// import React, { useState, useCallback } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// const MapComponent = ({ onLocationSelect }) => {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const onMapClick = useCallback((event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     setSelectedLocation({ lat, lng });
//     onLocationSelect({ lat, lng });
//   }, [onLocationSelect]);

//   return (
//     <LoadScript
//       googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
//     >
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onClick={onMapClick}
//       >
//         {selectedLocation && (
//           <Marker position={selectedLocation} />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   )
// }

// export default MapComponent;

// // MapComponent.js
// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix leaflet's default icon path
// import L from 'leaflet';
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const LocationMarker = ({ setSelectedPosition }) => {
//   const [position, setPosition] = useState(null);

//   useMapEvents({
//     click(e) {
//       setPosition(e.latlng);
//       setSelectedPosition(e.latlng);
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}></Marker>
//   );
// };

// const MapComponent = ({ setSelectedPosition }) => {
//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <LocationMarker setSelectedPosition={setSelectedPosition} />
//     </MapContainer>
//   );
// };

// export default MapComponent;
