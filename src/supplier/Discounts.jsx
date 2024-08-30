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

import { Header,NavbarSubDiscount } from "../components";
import { Link, json } from "react-router-dom";
import { Button } from "../components";
import { BsChatLeft } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar } from "../components";
import { AddCategory, AddPromotion, NavbarAdmin, SidebarAdmin } from "../admin";
import { Ajax, DataManager, UrlAdaptor } from "@syncfusion/ej2/data";

import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { MODE } from "baseui/button-group";
import { getCategories, updateCustomers, deleteCustomers } from "../Connect";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { AddProduct2, NavbarSupplier, SidebarSupplier } from ".";
import {
  AddDiscount,
  AddProductToDiscount,
  EditDiscount,
  DeleteDiscount,
} from ".";


const API_URL = "https://donkey-casual-python.ngrok-free.app/coupon/";

const Discounts = ({ setToken }) => {
  const { activeMenu, currentColor, isClicked, handleClick, currentMode } =
    useStateContext();


  const [discountss, setDiscountss] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "get",
          headers: {
            //'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwNTA1ODIxLCJpYXQiOjE3MjE4NjU4MjEsImp0aSI6ImJjNjQwYjk2YjY2NDRjYmRhYTdhNGEyNmY2NGQ0NWQ0IiwidXNlcl9pZCI6M30.LE6bGXa2lkek4wKKJGE4NUMQ_yGAIaIWCI5cb-1vPNs',


          },
        });

        const data = await response.json();
        setDiscountss(data);
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
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <NavbarSupplier />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap lg:flex-nowrap justify-center bg-white">
            <div className="m-2  p-2 md:p-10  ml-40 mt-0 rounded-xl">
              <NavbarSubDiscount
                title2={"Discounts"}
                handle={"Add Discount"}
                category2={<AddDiscount />}
              
              
                handle3={"Edit Discount"}
                category3={<EditDiscount />}
                handle4={"Delete Discount"}
                category4={<DeleteDiscount />}
              />
              <GridComponent
                dataSource={discountss}
                width="1250"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
              >
                <ColumnsDirective>
                <ColumnDirective
                    headerText="Id"
                    field="id"
                    width="150"
                    textAlign="Center"
                     type="number"
                  />
                  <ColumnDirective
                    headerText="name"
                    field="name"
                    width="150"
                    textAlign="Center"
                    //isPrimaryKey={true}
                    type="number"
                  />
                  <ColumnDirective
                    headerText="Coupon Code"
                    field="coupon_code"
                    width="150"
                    textAlign="Center"
                    type="number"
                  />
                  <ColumnDirective
                    headerText="Discount Value"
                    field="discount_value"
                    width="150"
                    textAlign="Center"
                    type="number"
                  />
                  <ColumnDirective
                    headerText="User Max Use"
                    field="user_max_use"
                    width="150"
                    textAlign="Center"
                  />
                  
                  <ColumnDirective
                    headerText="Products To Earn"
                    field="products_to_earn"
                    width="150"
                    textAlign="Center"
                  />
                  
                  <ColumnDirective
                    headerText="Time Start"
                    field="time_start"
                    width="120"
                    textAlign="Center"
                  />
                  
                  <ColumnDirective
                    headerText="Time End"
                    field="time_end"
                    width="120"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Is Active"
                    field="is_active"
                    width="120"
                    textAlign="Center"
                  />
                </ColumnsDirective>
                <Inject services={[Search, Page]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discounts;
