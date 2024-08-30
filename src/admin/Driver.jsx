import React, { useEffect, useState, useRef } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Edit,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";

import { Header, Sub, NavbarSubAdm, NavbarSubDriv } from "../components";
import { Link, json } from "react-router-dom";

import { BsChatLeft } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar } from "../components";
import {
  AddCategory,
  EditCategory,
  DeleteCategory,
  NavbarAdmin,
  SidebarAdmin,
  AddDriver,
  EditDriver,
  DeleteDriver,
} from "../admin";
import StatusTemplateApprove from "./status/StatusTemplateApprove";
import StatusTemplateOnline from './status/StatusTemplateOnline'
import { Ajax, DataManager, UrlAdaptor } from "@syncfusion/ej2/data";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { MODE } from "baseui/button-group";

const API_URL = "https://donkey-casual-python.ngrok-free.app/driver/all";

const fetchCategories = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // 'ngrok-skip-browser-warning': 'true',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

function editTemplate(args) {
  return (
    <MaskedTextBoxComponent
      value={args.PhoneNumber}
      mask="000-000-0000"
      id="PhoneNumber"
    />
  );
}
const Driver = () => {
  const { activeMenu, setActiveMenu, currentMode } = useStateContext();

  const API_URL = "https://donkey-casual-python.ngrok-free.app/driver/all";

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "get",
          headers: {
            //'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await response.json();
        setDrivers(data);
        console.log(data); // This will log the entire response object for debugging
        // Assuming your API returns an array of items directly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const ImageTemplate = (props) => {
    return <img src={props.vehicle_image} alt="Vehicle" style={{ width: '50px', height: '50px' }} />;
  };
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
              <NavbarSubDriv
                title2={"Driver"}
              
              />

              <GridComponent
                dataSource={drivers}
                width="1400"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="Id"
                    field="id"
                    width="100"
                    textAlign="Center"
                    type="number"
                  />

                  <ColumnDirective
                    headerText="Email"
                    field="user.email"
                    width="100"
                    textAlign="Center"
                    type="number"
                  />

                  <ColumnDirective
                    headerText="First Name"
                    field="user.first_name"
                    width="100"
                    textAlign="Center"
                    type="number"
                  />
                  <ColumnDirective
                    headerText="Last Name"
                    field="user.last_name"
                    width="120"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Username"
                    field="user.username"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="Latitude"
                    field="latitude"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="Longitude"
                    field="longitude"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="Phone Number"
                    field="phone_number"
                    width="120"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="Vehicle Type"
                    field="vehicle_type"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="Vehicle Plate"
                    field="vehicle_plate"
                    width="100"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Vehicle Image"
                    field="vehicle_image"
                    width="120"
                    textAlign="Center"
                    template={ImageTemplate}
                  />
                  <ColumnDirective
                    headerText="Is Approved"
                    field="is_approved"
                    width="120"
                    textAlign="Center"
                    type="boolean"
                    template={StatusTemplateApprove}
                  />
                  <ColumnDirective
                    headerText="Is Online"
                    field="is_online"
                    width="120"
                    textAlign="Center"
                    
                    template={StatusTemplateOnline}
                  />
                </ColumnsDirective>
                <Inject services={[Page]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Driver;
