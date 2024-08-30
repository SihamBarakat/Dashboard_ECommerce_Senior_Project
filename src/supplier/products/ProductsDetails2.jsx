

import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../../components";
import {
  BoxContainer,
  FormContainer,
  SubmitButton,
} from "../../components/Style";
import { Marginer } from "../../components/Marginer";
import { Link,useNavigate } from "react-router-dom";
const ProductsDetails2 = ({ setToken }) => {
  const [name, setName] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
 
  const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
  const Delete_URL = "https://donkey-casual-python.ngrok-free.app/catalog/products/";
  const handleNameSelect = (event) => {
    const selectedId = event.target.value;
    const selectedProduct = products.find((product) => product.id == selectedId);
    setSelectedProduct(selectedProduct);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "get",
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      console.error("No product selected");
      return;
    }

    try {
      const response = await fetch(
        `${Delete_URL}${selectedProduct.slug}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();
      setToken(data.token);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      console.log(data.token);
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };
  const navigate = useNavigate();
  const goto = () => {
    navigate('/productsdetails');
  };
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Show Details
          </p>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-6">
        <BoxContainer method="post" onSubmit={handleSubmit}>
          <FormContainer>
            <select onChange={handleNameSelect} required>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <SubmitButton className="mt-1 " type="submit" onClick={goto}>
              SHOW
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <Marginer direction="vertical" margin="1em" />
        </BoxContainer>
      </div>
    </div>
  );
};

export default ProductsDetails2;




// import React, { useEffect, useState } from "react";
// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Page,
//   Search,
//   Selection,
//   Inject,
//   Edit,
//   Toolbar,
//   Sort,
//   EditSettingsModel,
// } from "@syncfusion/ej2-react-grids";
// import { Input } from "../../components/Style";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
// import SidebarSupplier from "../SidebarSupplier";
// import NavbarSupplier from "../NavbarSupplier";
// import AddProduct3 from "../AddProduct3";
// import EditDetails from "./EditDetails";
// import DeleteDetails from "./DeleteDetails";
// import NavbarSubPro from "../../components/NavbarSubPro";
// import StatusTemplateActive from "../../admin/status/StatusTemplateActive";
// import {
//   BoxContainer,
//   FormContainer,
//   SubmitButton,
// } from "../../components/Style";
// import { Marginer } from "../../components/Marginer";
// const ProductsDetails2 = ({ setToken }) => {
//   const [productDetails, setProductDetails] = useState([]);
//   const [filteredProductDetails, setFilteredProductDetails] = useState([]);
//   const { activeMenu, currentMode } = useStateContext();
//   const [productName, setProductName] = useState("");
//   const [slug, setSlug] = useState("");

//   //const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch(API_URL, {
//   //         method: "GET",
//   //         headers: {
//   //           "ngrok-skip-browser-warning": "true",
//   //           Authorization:
//   //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//   //         },
//   //       });
//   //       const data = await response.json();
//   //       setProductDetails(data);
//   //       setFilteredProductDetails(data);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   // const handleProductNameChange = (e) => {
//   //   const name = e.target.value;
//   //   setProductName(name);
//   //   const newSlug = generateSlug(name);
//   //   setSlug(newSlug);
//   //   const filteredData = productDetails.filter((product) => product.slug === newSlug);
//   //   setFilteredProductDetails(filteredData);
//   // };

//   // const generateSlug = (name) => {
//   //   return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
//   // };
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
//   const Delete_URL = "https://donkey-casual-python.ngrok-free.app/catalog/products/";
//   const handleNameSelect = (event) => {
//     const selectedId = event.target.value;
//     const selectedProduct = products.find((product) => product.id == selectedId);
//     setSelectedProduct(selectedProduct);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_URL, {
//           method: "get",
//           headers: {
//             "ngrok-skip-browser-warning": "true",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//           },
//         });
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedProduct) {
//       console.error("No product selected");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${Delete_URL}${selectedProduct.slug}`,
//         {
//           method: "get",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Authentication Error");
//       }
//       const data = await response.json();
//       setToken(data.token);
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }
//       console.log(data.token);
//     } catch (error) {
//       console.error("Authentication Error:", error);
//     }
//   };
//   return (
//     <>
//       <div className={currentMode === "Dark" ? "dark" : ""}>
//         <div className="flex relative dark:bg-main-dark-bg h-12">
//           <div
//             className="fixed right-4 bottom-4"
//             style={{ zIndex: "1000" }}
//           ></div>
//           {activeMenu ? (
//             <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
//               <SidebarSupplier />
//             </div>
//           ) : (
//             <div className="w-0 dark:bg-secondary-dark-bg">
//               <SidebarSupplier />
//             </div>
//           )}
//           <div
//             className={
//               activeMenu
//                 ? "dark:bg-main-dark-bg  min-h-screen md:ml-72 w-full  "
//                 : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
//             }
//           >
//             <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
//               <NavbarSupplier />
//             </div>
//           </div>
//         </div>
//         <div className="mt-6">
//           <div className="flex flex-wrap lg:flex-nowrap justify-center bg-white">
//             <div className="m-2  p-2 md:p-10  ml-40 mt-0 rounded-xl">
//               <NavbarSubPro
//                 title2={"Products Details"}
//                 handle={"Add Product Details"}
//                 category2={<AddProduct3 />}
//                 handle3={"Edit Product Details"}
//                 category3={<EditDetails />}
//                 handle4={"Delete Product Details"}
//                 category5={<DeleteDetails />}
//               />
//               <BoxContainer onSubmit={handleSubmit}>
//           <FormContainer>
//             <select onChange={handleNameSelect} required>
//               <option value="">Select Product</option>
//               {products.map((product) => (
//                 <option key={product.id} value={product.id}>
//                   {product.name}
//                 </option>
//               ))}
//             </select>
//             <SubmitButton className="mt-1 " type="submit">
//               DELETE
//             </SubmitButton>
//           </FormContainer>
//           <Marginer direction="vertical" margin={10} />
//           <Marginer direction="vertical" margin="1em" />
//         </BoxContainer>
             
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductsDetails2;























































































































































// import React, { useEffect, useState } from "react";
// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Page,
//   Search,
//   Inject,
//   Edit,
//   Toolbar,
// } from "@syncfusion/ej2-react-grids";
// import {
//   BoldLink,
//   BoxContainer,
//   FormContainer,
//   Input,
//   MutedLink,
//   SubmitButton,
// } from "../../components/Style";

// import { useStateContext } from "../../contexts/ContextProvider";

// import SidebarSupplier from "../SidebarSupplier";
// import NavbarSupplier from "../NavbarSupplier";

// import StatusTemplateActive from "../../admin/status/StatusTemplateActive";

// import AddProduct3 from "../AddProduct3";

// import NavbarSubPro from "../../components/NavbarSubPro";

// import EditDetails from "./EditDetails";
// import DeleteDetails from "./DeleteDetails";
// const ProductsDetails2 = () => {
//   const [productdetails, setProductdetails] = useState([]);
//   const { activeMenu, setActiveMenu, currentMode } = useStateContext();
//   const [products, setProducts] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [slug, setSlug] = useState("");

//   const API_URL =
//     "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_URL, {
//           method: "GET",
//           headers: {
//             "ngrok-skip-browser-warning": "true",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//           },
//         });
//         const data = await response.json();
//         setProducts(data);
//         console.log(data); // This will log the entire response object for debugging
//         console.log(data.product_detail);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleProductNameChange = (e) => {
//     const name = e.target.value;
//     setProductName(name);
//     setSlug(generateSlug(name));
//   };

//   const generateSlug = (name) => {
//     return name
//       .toLowerCase()
//       .replace(/ /g, "-")
//       .replace(/[^\w-]+/g, "");
//   };

//   return (
//     <>
//       <div className={currentMode === "Dark" ? "dark" : ""}>
//         <div className="flex relative dark:bg-main-dark-bg h-12">
//           <div
//             className="fixed right-4 bottom-4"
//             style={{ zIndex: "1000" }}
//           ></div>
//           {activeMenu ? (
//             <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
//               <SidebarSupplier />
//             </div>
//           ) : (
//             <div className="w-0 dark:bg-secondary-dark-bg">
//               <SidebarSupplier />
//             </div>
//           )}
//           <div
//             className={
//               activeMenu
//                 ? "dark:bg-main-dark-bg  min-h-screen md:ml-72 w-full  "
//                 : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
//             }
//           >
//             <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
//               <NavbarSupplier />
//             </div>
//           </div>
//         </div>
//         <div className="mt-6">
//           <div className="flex flex-wrap lg:flex-nowrap justify-center bg-white">
//             <div className="m-2  p-2 md:p-10  ml-40 mt-0 rounded-xl">
//               <NavbarSubPro
//                 title2={"Products Details"}
//                 handle={"Add Product Details"}
//                 category2={<AddProduct3 />}
//                 handle3={"Edit Product Details"}
//                 category3={<EditDetails />}
//                 handle4={"Delete Product Details"}
//                 category5={<DeleteDetails />}
//               />
//               <Input
//                 type="text"
//                 placeholder="Product Name"
//                 value={productName}
//                 onChange={handleProductNameChange}
//                 required
//               />
//               <p>Slug: {slug}</p>
//               <GridComponent
//                 dataSource={productdetails.stocks}
//                 width="1500"
//                 allowPaging
//                 pageSettings={{ pageCount: 5 }}
//               >
//                 <ColumnsDirective>
//                   <ColumnDirective
//                     headerText="Id"
//                     field="product_detail.id"
//                     width="120"
//                     textAlign="Center"
//                     type="number"
//                   />
//                   <ColumnDirective
//                     headerText="color"
//                     field="product_detail.color"
//                     width="120"
//                     textAlign="Center"
//                   />

//                   <ColumnDirective
//                     headerText="size"
//                     field="product_detail.size"
//                     width="120"
//                     textAlign="Center"
//                   />
//                   <ColumnDirective
//                     headerText="sku"
//                     field="product_detail.sku"
//                     width="150"
//                     textAlign="Center"
//                   />
//                   <ColumnDirective
//                     headerText="price"
//                     field="product_detail.price"
//                     width="150"
//                     textAlign="Center"
//                     type="number"
//                   />
//                   <ColumnDirective
//                     headerText="sale price"
//                     field="product_detail.sale_price"
//                     width="120"
//                     textAlign="Center"
//                     type="number"
//                   />
//                   <ColumnDirective
//                     headerText="is_active"
//                     field="product_detail.is_active"
//                     width="120"
//                     textAlign="Center"
//                     template={StatusTemplateActive}
//                   />
//                   <ColumnDirective
//                     headerText="is_main"
//                     field="product_detail.is_main"
//                     width="120"
//                     textAlign="Center"
//                   />

//                   <ColumnDirective
//                     headerText="Quantity In stock"
//                     field="quantity_in_stock"
//                     width="120"
//                     textAlign="Center"
//                   />
//                   <ColumnDirective
//                     headerText="Products Sold"
//                     field="products_sold"
//                     width="150"
//                     textAlign="Center"
//                   />
//                 </ColumnsDirective>
//                 <Inject services={[Search, Page, Edit, Toolbar]} />
//               </GridComponent>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductsDetails2;

// const [productdetails, setProductdetails] = useState([]);
// //const {slug} =useParams()
// const { activeMenu, setActiveMenu, currentMode } = useStateContext();
// const DETAILS_URL =
//   "https://donkey-casual-python.ngrok-free.app/catalog/product/stock/iphone-13-pro-max";
//   const API_URL =
//   "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
// const [products, setProducts] = useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(API_URL, {
//         method: "get",
//         headers: {
//           //'Content-Type': 'application/json',
//           "ngrok-skip-browser-warning": "true",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//         },
//       });
//       const data = await response.json();
//       setProducts(data);
//       console.log(data); // This will log the entire response object for debugging
//       console.log(data.product_detail);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, []);

// const handleProductTypeChange = (event) => {
//   const detailsname = event.target.value;
//   const selectedType = productTypes.find((type) => type.id == typeId);
//   setSelectedProductType(selectedType);

//   if (selectedType) {
//     fetch(`${API_Size}/${selectedType.name}`, {
//       method: "get",
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setSizes(data));

//     fetch(`${API_color}`, {
//       method: "get",
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setColors(data));
//   } else {
//     setSizes([]);
//     setColors([]);
//   }
// };
