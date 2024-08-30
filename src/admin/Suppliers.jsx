import React, { useEffect, useState ,useNavigate} from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Edit,
 
  dataSourceChanged,
} from "@syncfusion/ej2-react-grids";
import { NavbarSubAdm } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { NavbarAdmin, SidebarAdmin,ApproveSupplier } from "../admin";

import StatusTemplate from './suppliers/StatusTemplate';
import{ AddSuppliers ,EditSuppliers,DeleteSuppliers}from "../admin";
import FilterSup from "./suppliers/FilterSup";
const Supplier = () => {
  const {
    activeMenu,
    isClicked,
    currentMode,
  } = useStateContext();

  const filterOption = { ignoreAccent: true, type: "menu" };
  const API_URL =
  "https://donkey-casual-python.ngrok-free.app/supplier/all";
  const [supplierss, setSupplierss] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "get",
          headers: {
            //'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true",
          },
        })
        const data = await response.json();
        setSupplierss(data);
        console.log(data); 
     
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const data = [
    { id: 1, name: 'John Doe', is_approved: 1 },
    { id: 2, name: 'Jane Smith', is_approved: 0 },
    { id: 3, name: 'Samuel Green', is_approved: 1 },
  ];

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
            <NavbarSubAdm
                title2={"Suppliers"}
              //
                category5={<DeleteSuppliers />}
                handle4={"Delete Supplier"}
                category6={<FilterSup/>}
              />

              <GridComponent
                dataSource={supplierss}
               //  dataSource={data}
                width="1500"
                allowPaging
                allowFiltering={true}
                pageSettings={{ pageCount: 5 }}
                dataSourceChanged={dataSourceChanged}
                filterSettings={filterOption}
              >
                <ColumnsDirective>
                <ColumnDirective
                    field="id"
                    headerText="Id"
                    width="120"
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
                    headerText="First Name"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    field="user.last_name"
                    headerText="Last Name"
                    width="120"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    field="user.username"
                    headerText="User Name"
                    width="120"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    field="phone_number"
                    headerText="Phone Number"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Latitude"
                    field="latitude"
                    width="150"
                    textAlign="Center"
                      type="number"
                  />
                    <ColumnDirective
                    headerText="Longitude"
                    field="longitude"
                    width="150"
                    textAlign="Center"
                      type="number"
                  />
                  <ColumnDirective
                    headerText="Commercial Recored"
                    field="commercial_recored"
                    width="150"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    field="is_approved"
                    headerText="Is Approved"
                    width="150"
                   template={StatusTemplate} 
                    textAlign="Center"
                    type="boolean"
                  />
                </ColumnsDirective>
                <Inject services={[Search, Page, Edit]} />
              </GridComponent>
            </div>
          </div>

          {isClicked.userProfile && (<ApproveSupplier />)}
        </div>
      </div>
    </>
  );
};

export default Supplier;

//
