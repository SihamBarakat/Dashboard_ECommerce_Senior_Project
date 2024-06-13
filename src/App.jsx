import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar } from "./components";
import { Admin, DashAdmin, DashSupplier, Ecommerce } from "./pages";

import "./App.css";
import { Customers, Suppliers, Driver, Categories } from "./admin";
import { useStateContext } from "./contexts/ContextProvider";
import Home from "./Home";
import { RequireAuth } from "react-auth-kit";
//import MyRouter from './routes/MyRouter'
import styled from "styled-components";
import { Products, Charts ,Supplier} from "./supplier";
import Login from "./login/Login";

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

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div>
          {/* {themeSettings && (<ThemeSettings />)}  */}

          <div>
          {/* <Routes>
                <Route exact path="/" component={Login} />
                <Route path="/admin/dashboard" component={DashAdmin} />
                <Route path="/supplier/dashboard" component={DashSupplier} />
            </Routes> */}
            <Routes>
              {/* dashboard  */}
              <Route path="/" element={<DashAdmin />} />
              <Route path="/home" element={<Home/>}/>
              <Route path="/dashAdminn" element={<DashAdmin />} />
              <Route path="/dashSupplier" component={<DashSupplier />} />
              {/* admin  */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/driver" element={<Driver />} />
              <Route path="/categories" element={<Categories />} />

              {/* supplier */}
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/charts" element={<Charts />} />
              {/*both  */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
