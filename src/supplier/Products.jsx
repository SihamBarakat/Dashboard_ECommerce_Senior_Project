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

import { Header, NavbarSub, Sub } from "../components";
import { Link, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  getCustomers,
  addCustomers,
  updateCustomers,
  deleteCustomers,
} from "../Connect";
import SidebarSupplier from "./SidebarSupplier";
import NavbarSupplier from "./NavbarSupplier";
import AddProduct2 from "./products/AddProduct2";
import EditQuantity from "./products/EditProduct";
import AddProduct from "./AddProduct";
//import StatusTemplateProd from "./products/StatusTemplateProd";
import { MdKeyboardArrowDown, MdDelete, MdEdit } from "react-icons/md";
import AddProduct3 from "./AddProduct3";
import AddProduct4 from "./AddProduct4";
import NavbarSubPro from "../components/NavbarSubPro";
import AddProduct5 from "./AddProduct5";
import EditProduct from "./products/EditProduct";
import DeleteProducts from "./products/DeleteProducts";
import { TbListDetails } from "react-icons/tb";
import ProductsDetails2 from "./products/ProductsDetails2";
import ProductsDetails from "./products/ProductsDetails";
const Products = () => {
  const data = [
    { id: 1, name: "John Doe", details: null },
    { id: 2, name: "Jane Smith", is_approved: 0 },
    { id: 3, name: "Samuel Green", is_approved: 1 },
  ];

  const { activeMenu, setActiveMenu, currentMode } = useStateContext();
  const API_URL =
    "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
  const [productss, setProductss] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "get",
          headers: {
            //'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          },
        });
        const data = await response.json();
        setProductss(data);
        console.log(data); // This will log the entire response object for debugging
        console.log(data.product_detail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
const slug ='hello';
  const navigate = useNavigate();
  // const handleRowClick = (args) => {
  //   const { slug } = args.data;
  //   navigate(`/product/${slug}`);
  // };
  const handleProductClick = (slug) => {
    // Navigate to the product details page with the product slug
    navigate(`/productsdetails`);
  };
  const StatusTemplateProd = (slug) => {
    return (
      <div>
           <button onClick={() => handleProductClick(slug)}> <TbListDetails  /> </button>
          {/* <button onClick={() => handleDelete(props)}>
              <MdDelete /> Delete
          </button> */}
      </div>
    );
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
              <NavbarSubPro
                title2={"Products"}
                handle={"Add Products"}
                handle2={"Show Product Details"}
                category2={<AddProduct5 />}
                handle3={"Edit Products"}
                category3={<EditProduct />}
                handle4={"Delete Products"}
                category5={<DeleteProducts />}
                category6={<ProductsDetails/>}
              />
              <GridComponent
                dataSource={productss}
                // dataSource={data}
                width="1500"
                allowPaging
               // rowSelected={handleRowClick}
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
                    headerText="Name"
                    field="name"
                    width="150"
                    textAlign="Center"
                  />
                 
                  <ColumnDirective
                    headerText="Main Price"
                    field="main_price"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Main Sale Price"
                    field="main_sale_price"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Average Rating"
                    field="average_rating"
                    width="150"
                    textAlign="Center"
                    type="number"
                  />
                  <ColumnDirective
                    headerText="Reviews Count"
                    field="reviews_count"
                    width="150"
                    textAlign="Center"
                    type="number"
                  />
                  <ColumnDirective
                    headerText="Main Image"
                    field="main_image"
                    width="150"
                    textAlign="Center"
                  />
                
                </ColumnsDirective>
                <Inject services={[Search, Page, Edit, Toolbar]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

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

/*
 <BoldLink href="/" >

          <div>
            <Header title="Products" category={<Link to="/addproduct" className="btn btn-primart float-end"><Button margin="10" color={currentColor} size="xl" position="right" borderRadius="50%" /> Add Products </Link>} />

          </div>

        </BoldLink>
        <GridComponent
          dataSource={productsData}
          width="auto"
          allowPaging
          header={hed}
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            
            {productsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />

        </GridComponent>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="categories" />

        <GridComponent
          dataSource={categoriesDetails}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            
            {productsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />

        </GridComponent>

        */
