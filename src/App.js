import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
//import { DashAdmin,DashSupplier} from "./pages";
import  Login from './login/Login'
import "./App.css";
import { Customers, Suppliers, Driver, Categories } from "./admin";
import { useStateContext } from "./contexts/ContextProvider";
import Home from "./Home";
//import MyRouter from './routes/MyRouter'
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
          <Routes>
            {/* dashboard  */}
            <Route path="/" element={<Customers />} />
            {/* <Route path="/dashAdminn" element={<DashAdmin />} />
            <Route path="/dashSupplier" element={<DashSupplier />} /> */}
            {/* admin  */}
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/categories" element={<Categories />} />

            {/* supplier */}
          
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
