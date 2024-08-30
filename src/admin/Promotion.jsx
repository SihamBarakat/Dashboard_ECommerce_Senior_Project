import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";

import { NavbarSubDisc } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import StatusTemplatepro from "./status/StatusTemplateScheduled";
import StatusTemplatepro2 from "./status/StatusTemplateActive";
import {
  AddPromotion,
  EditPromotion,
  DeletePromotion,
  NavbarAdmin,

  SidebarAdmin,
} from "../admin";
import AddProductToPromotion from '../admin/promotion/AddProductToPromotion'
import StatusTemplateScheduled from "./status/StatusTemplateScheduled";
import StatusTemplateActive from './status/StatusTemplateActive'
import   FilterPro from './promotion/FilterPro'
const API_URL = "https://donkey-casual-python.ngrok-free.app/promotion/";

const Promotion = () => {
  const { activeMenu, currentColor, isClicked, handleClick, currentMode } =
    useStateContext();

  const [promotion, setPromotion] = useState([]);
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
        setPromotion(data);
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
          
<NavbarSubDisc
                title2={"Promotion"}
                handle={"Add Promotion"}
                category2={<AddPromotion />}
                handle2={"Add Products to Promotion"}
                category4={<AddProductToPromotion />}
                handle3={"Edit Promotion"}
                category3={<EditPromotion />}
                handle4={"Delete Promotion"}
                category5={<DeletePromotion />}
                category6={<FilterPro />}
              />
              <GridComponent
                dataSource={promotion.promotions}
                width="1450"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}

                //dataSourceChanged={dataSourceChanged}
                //filterSettings={filterOption}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="Id"
                    field="id"
                    width="100"
                    textAlign="Center"
                    //isPrimaryKey={true}
                    type="number"
                  />
                  <ColumnDirective
                    headerText="image_url"
                    field="image_url"
                    width="100"
                    textAlign="Center"
                    type="number"
                  />
                  <ColumnDirective
                    headerText="name"
                    field="name"
                    width="100"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="description"
                    field="description"
                    width="100"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="discount_percentege"
                    field="discount_percentege"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="time_start"
                    field="time_start"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="time_end"
                    field="time_end"
                    width="100"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="is_active"
                    field="is_active"
                    template={StatusTemplateActive}
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="is_scheduled"
                    field="is_scheduled"
                    width="100"
                    template={StatusTemplateScheduled}
                    textAlign="Center"
                  />
                </ColumnsDirective>
                <Inject services={[Search, Page, Toolbar]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotion;
