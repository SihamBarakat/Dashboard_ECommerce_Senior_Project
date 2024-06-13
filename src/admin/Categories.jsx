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
  Filter,
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

import { BsChatLeft } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar } from "../components";
import { NavbarAdmin, SidebarAdmin } from "../admin";
import { Ajax, DataManager, UrlAdaptor } from "@syncfusion/ej2/data";
//import {SubmitButton} from "./Style";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { MODE } from "baseui/button-group";
import {
  getCategories,
  addCustomers,
  updateCustomers,
  deleteCustomers,
} from "../Server";
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
const Customers = () => {
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
    getCategories().then((data) => {
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
              <SidebarAdmin />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <SidebarAdmin />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <NavbarAdmin />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap lg:flex-nowrap justify-center bg-white">
            <div className="m-2  p-2 md:p-10  ml-40 mt-0 rounded-xl">
              <Header title={"Categories"} />
             
              <GridComponent
                dataSource={data}
                width="1250"
                allowPaging
                //allowSorting
                allowFiltering={true}
                pageSettings={{ pageCount: 5 }}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                //dataSourceChanged={dataSourceChanged}
                //filterSettings={filterOption}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="name"
                    field="name "
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="parent"
                    field="parent"
                    width="150"
                    textAlign="Center"
                  />
                 
                </ColumnsDirective>
                <Inject services={[Search, Page, Edit, Toolbar, Filter]} />
              </GridComponent>
            </div>
          </div>
         
          
        </div>
      </div>
    </>
  );
};

export default Customers;
