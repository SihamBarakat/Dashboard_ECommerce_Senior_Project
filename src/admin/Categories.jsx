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
import StatusTemplatepro2 from "./status/StatusTemplateActive";
import { Header, NavbarSub, NavbarSubCat } from "../components";
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
} from "../admin";

import { Ajax, DataManager, UrlAdaptor } from "@syncfusion/ej2/data";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { MODE } from "baseui/button-group";
import StatusTemplateLeaf from './status/StatusTemplateLeaf'


const API_URL =
"https://donkey-casual-python.ngrok-free.app/catalog/category";

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
const Categories = () => {
  const { activeMenu, setActiveMenu, currentMode } = useStateContext();

  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  const filterOption = { ignoreAccent: true, type: "menu" };


  const [categoriess, setCategoriess] = useState([]);

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
        setCategoriess(data);
        console.log(data); // This will log the entire response object for debugging
        // Assuming your API returns an array of items directly
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
              <NavbarSubCat
                title2={"Categories"}
                handle={"Add Category"}
                category2={<AddCategory />}
                handle3={"Edit Category"}
                category3={<EditCategory />}
                category5={<DeleteCategory />}
                handle4={"Delete Category"}
              />

              <GridComponent
                dataSource={categoriess}
                width="1250"
                allowPaging
                allowSorting
                allowFiltering={true}
                pageSettings={{ pageCount: 5 }}
                filterSettings={filterOption}

              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="Id"
                    field="id"
                    width="150"
                    textAlign="Center"
                    //isPrimaryKey={true}
                    type="number"
                  />
                  <ColumnDirective
                    headerText="Name"
                    field="name"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Slug"
                    field="slug"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Parent"
                    field="parent "
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Is Leaf"
                    field="is_leaf"
                    width="150"
                    textAlign="Center"
                    template={StatusTemplateLeaf}
                  />
                  <ColumnDirective
                    headerText="Is Active"
                    field="is_active"
                    width="150"
                    textAlign="Center"
                    template={StatusTemplatepro2}
                  />
                  <ColumnDirective
                    headerText="Image Url"
                    field="image_url"
                    width="150"
                    textAlign="Center"
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

export default Categories;
