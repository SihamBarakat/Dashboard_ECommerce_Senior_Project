import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,

  EditSettingsModel,
  dataSourceChanged,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import {
  customersData,
  customersGrid,
  datatest,
  employeesData,
  employeesGrid,
  data2,
} from "../data/dummy";
import { Header } from "../components";
import { Link, json } from "react-router-dom";
import { BsCurrencyDollar } from 'react-icons/bs';
import { BsChatLeft } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
//import { Navbar, Sidebar } from "../components";
import { NavbarAdmin, SidebarAdmin } from "../admin";
import { Ajax, DataManager, UrlAdaptor } from "@syncfusion/ej2/data";
//import {SubmitButton} from "./Style";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";

import {
  getCustomers,
  addCustomers,
  updateCustomers,
  deleteCustomers,
} from "../Connect";
import product9 from '../data/product9.jpg';

import { GoDotFill    } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Button, Navbar, Sidebar,} from '../components'
import { Stacked, Pie, LineChart, SparkLine,NavbarSupplier,SidebarSupplier } from '../supplier';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);
function editTemplate(args) {
  return (
    <MaskedTextBoxComponent
      value={args.PhoneNumber}
      mask="000-000-0000"
      id="PhoneNumber"
    />
  );
}
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);
const DashSupplier = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    currentMode,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  //const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Add", "Edit", "Delete"];
  //const editing = {  };
  const [data, setData] = useState([]);
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };
  const filterOption = { ignoreAccent: true, type: "menu" };
  useEffect(() => {
    getCustomers().then((data) => {
      setData(data);
    });
  }, []);
  function dataSourceChanged(state) {
    if (state.action === "add") {
      addCustomers(state.data);
    } else if (state.action === "edit") {
      updateCustomers(state.data);
    } else if (state.requestType === "delete") {
      deleteCustomers(state.data[0].id);
    }
  }
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
              <SidebarSupplier />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <SidebarSupplier />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  min-h-screen md:ml-72 w-full  "
                : " dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <NavbarSupplier />
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
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            {/* <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            /> */}
          </div>
        </div>
       
      </div>

     

         
      
      
    </>
  );
};

export default DashSupplier;
 {/* <h1>home  </h1>
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
           
             */}



//const [customers, setCustomers] = useState([]);
// const [loading, setloading] = useState(true);
// useEffect(() => {
//   axios
//     .get(`https://36bb-37-48-177-73.ngrok-free.app/Users/admin/customers`)
//     .then((res) => {
//       console.log(res);
//       setCustomers(res.data.customers);
//     });

//   // return ()=>{

//   // }
// }, []);

// const [isActive, setIsActive] = useState(false);

// const handleToggle = () => {
//   setIsActive(!isActive);
// };

// var customersDetails = "";
// customersDetails = customers.map((item, index) => {
//   return (
//     <tr key={index}>
//       <td>{item.id}</td>
//       <td>{item.user}</td>
//       <td>{item.phone_number}</td>

//       {/* وبكمل الحقول يلي بدي ياهم من الداتا  */}
//     </tr>
//   );
// });
