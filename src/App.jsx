import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Search, Sidebar, Notification } from "./components";
import { Admin, DashAdmin, DashSupplier, Ecommerce } from "./pages";

import "./App.css";
import {
  Customers,
  Suppliers,
  Driver,
  Categories,
  AddCategory,
  Promotion,
  ApproveSupplier,
  ApproveDriver,
  ResultFilterSup,
  ResultFilterPro,
  ResultFilterDriv,
  ResultFilterCat,
} from "./admin";
import { useStateContext } from "./contexts/ContextProvider";
import Home from "./Home";
import { RequireAuth } from "react-auth-kit";
//import MyRouter from './routes/MyRouter'
import styled from "styled-components";
import {
  Products,
  Charts,
  Supplier,
  AddProduct2,
  ProductsDetails,
  AddProduct4,
  AddProduct5,
  EditProduct,
  DeleteProducts,
  ProductsDetails2,
} from "./supplier";
import Login from "./login/Login";
import AuthContext from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./signup/Signup";
import MapComponent from "./components/MapComponent";
import axios from "axios";
import Discounts from "./supplier/Discounts";
import EditInfo from "./supplier/EditInfo";
import MapSup from './components/MapSup'
//import Login from "./login/Login";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const [token, setToken] = useState("");
  const handleLocationSelect = (location) => {
    console.log("Selected Location:", location);
    sendLocationToBackend(location);
  };

  const sendLocationToBackend = async (location) => {
    try {
      const response = await axios.post("/api/save-location/", location);
      console.log("Location saved:", response.data);
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };
  const [selectedPosition, setSelectedPosition] = useState(null);
  return (
    //   <div>
    //   <MapComponent setSelectedPosition={setSelectedPosition} />
    //   {selectedPosition && (
    //     <div>
    //       <h2>Selected Position:</h2>
    //       <p>Latitude: {selectedPosition.lat}</p>
    //       <p>Longitude: {selectedPosition.lng}</p>
    //     </div>
    //   )}
    // </div>
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Router>
        <AuthProvider>
          <div>
            <div>
              <Routes>
                {/* <Route exact path="/" component={Login} /> */}
                <Route path="/admin/dashboard" component={DashAdmin} />
                <Route path="/supplier/dashboard" component={DashSupplier} />
              </Routes>
              <Routes>
                {/* dashboard   */}
                {/* <Route path="/" element={<Login setToken={setToken} />} /> */}
                <Route
                  exact
                  path="/signup"
                  element={<Signup setToken={setToken} />}
                />
                    <Route path="/" element= { <Signup  /> } /> 
                {/* <Route path="/" element= { <Home  /> } />  */}

                {/* <Route path="/" element={<Login />} /> */}

                <Route path="/home" element={<Home />} />
                <Route path="/dashAdminn" element={<DashAdmin />} />
                <Route path="/dashSupplier" element={<DashSupplier />} />
                <Route path="/search" element={<Search />} />
                <Route path="/promotion" element={<Promotion />} />

                {/* admin   */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/driver" element={<Driver />} />
                <Route path="/approveSupplier" element={<ApproveSupplier />} />
                <Route path="/approveDriver" element={<ApproveDriver />} />
                <Route
                  path="/categories"
                  element={<Categories setToken={setToken} />}
                />
                <Route path="/resultfiltersup" element={<ResultFilterSup />} />
                <Route path="/resultfilterpro" element={<ResultFilterPro />} />
                <Route
                  path="/resultfilterdriv"
                  element={<ResultFilterDriv />}
                />
                <Route path="/resultfiltercat" element={<ResultFilterCat />} />

                {/* <Route path="/addcategory" elememt={<AddCategory setToken={setToken}/>}/>  */}
                {/* supplier  */}
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/editsupplier" element={<EditInfo />} />
                <Route path="/products" element={<Products />} />
                <Route path="/productsdetails" element={<ProductsDetails />} />
                <Route path="/products/addproduct" element={<AddProduct2 />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/discounts" element={<Discounts />} />
                   <Route path="/editlocation" element={<MapSup />} />
                <Route path="/addlocation" element={<MapComponent />} />
                <Route path="/addproduct" element={<AddProduct4 />} />
                {/* both   */}
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
