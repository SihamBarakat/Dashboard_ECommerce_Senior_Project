import React, { useEffect, useState, useRef } from "react";
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
} from "@syncfusion/ej2-react-grids";
import axios from "axios";

import { NavbarSub,NavbarSubCust } from "../components";
import { Link, json } from "react-router-dom";

import { BsChatLeft } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar } from "../components";
import { NavbarAdmin, SidebarAdmin ,AddCustomers,EditCustomers,DeleteCustomers} from "../admin";
import { Ajax, DataManager, UrlAdaptor } from "@syncfusion/ej2/data";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { MODE } from "baseui/button-group";
import {
  getCustomers,
  addCustomers,
  updateCustomers,
  deleteCustomers,
} from "../Connect";

const Customers = () => {
  const { activeMenu, setActiveMenu, currentMode } = useStateContext();

  const API_URL =
    "https://donkey-casual-python.ngrok-free.app/Users/admin/customers";

  const [customerss, setCustomerss] = useState([]);

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
        setCustomerss(data);
        console.log(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
            <NavbarSubCust
                title2={"Customers"}
                // handle={"Add Customer"}
                // category2={<AddCustomers />}
                // handle3={"Edit Customer"}
                //  category3={<EditCustomers />}
                category5={<DeleteCustomers />}
                handle4={"Delete Customer"}
              />

              <GridComponent
                dataSource={customerss.customers}
                width="1250"
                allowPaging
                allowSorting
              
                pageSettings={{ pageCount: 5 }}

                //actionComplete={actionComplete}
              >
                <ColumnsDirective>
                
                <ColumnDirective
                    field="id"
                    headerText="Id"
                    width="200"
                    textAlign="Center"
                     type="number"
                  />
                 
                 <ColumnDirective
                    field="user.email"
                    headerText="email"
                    width="200"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    field="user.first_name"
                    headerText="first_name"
                    width="120"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    field="user.last_name"
                    headerText="last_name"
                    width="120"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    field="user.username"
                    headerText="username"
                    width="120"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="PhoneNumber"
                    field="phone_number"
                    width="150"
                    textAlign="Center"
                  />
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Edit]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
