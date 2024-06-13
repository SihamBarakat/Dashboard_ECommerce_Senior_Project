import React, { useState, useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Button } from "./components";
import { Stacked, Pie, LineChart, SparkLine } from "./supplier";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "./data/dummy";
import { useStateContext } from "./contexts/ContextProvider";
import product9 from "./data/product9.jpg";
import { Navbar, Sidebar } from "./components";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import {NavbarAdmin,SidebarAdmin} from './admin'
import { employeesData, employeesGrid, customersGrid } from "./data/dummy";
import { Header } from "./components";
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Home = () => {
  const [data, setData] = useState(null);
  const {
    setCurrentColor,
    setCurrentMode,
    currentColor,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  // useEffect(() => {
  //   fetch('127.0.0.1:5000/earnings')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     // .catch(error => console.error('Error fetching data:', error));
  // }, []);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg h-12">
          <div
            className="fixed right-4 bottom-4"
            style={{ zIndex: "1000" }}
          ></div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
          </div>
        </div>
        <div className="mt-6 ">
        <div className="flex justify-between items-center">
           
             
                {/* <div className="App">
            <h1>Data from Flask</h1>
            <p>Name: {data.Supplier}</p>
            <p>Age: {data.Earnings}</p>
           
          </div> */}
                {/* <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div> */}

               
           

                <h1>home  </h1>
            </div>
            
          </div>
          <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
           <h1>page</h1>
          </div>
        </div>

        

        <div className="flex gap-10 m-4 flex-wrap justify-center">
          <h1>show</h1>
          
        </div>

        <div className="flex flex-wrap justify-center">
         <h1>the</h1>
          </div>
          <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            
           <h1>result</h1>
           
            
              </div>
          
       
      
    </>
  );
};

export default Home;
