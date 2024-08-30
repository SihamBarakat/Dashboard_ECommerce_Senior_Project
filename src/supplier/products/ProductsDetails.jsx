// import React, { useState, useEffect } from "react";
// import { MdOutlineCancel } from "react-icons/md";
// import { Button } from "../../components";
// import {
//   BoxContainer,
//   FormContainer,
//   SubmitButton,
// } from "../../components/Style";
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
// import { Marginer } from "../../components/Marginer";
// import { Link,useNavigate } from "react-router-dom";
// const ProductsDetails = ({ setToken }) => {
//   const [productdetails, setProductdetails] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [products, setProducts] = useState([]);

//   const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
//   const Delete_URL = "https://donkey-casual-python.ngrok-free.app/catalog/product/stock/";
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
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMjA3OTI5LCJpYXQiOjE3MjE1Njc5MjksImp0aSI6ImQ0MThkNDdhNjFmZDQ3ZmQ5MzUxY2VkYTAwYjNjNTgzIiwidXNlcl9pZCI6MjF9.gklo0ESBBicwxAztwYUlrnBq5Fz_bXf_0co84JaR4dM",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Authentication Error");
//       }
//       const data = await response.json();
//       setProductdetails(data)

//       console.log(data);
//     } catch (error) {
//       console.error("Authentication Error:", error);
//     }
//   };
//   const navigate = useNavigate();
//   // const goto = () => {
//   //   navigate('/productsdetails');
//   // };
//   return (
//     <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
//       <div className="flex justify-between items-center">
//         <div className="flex gap-3">
//           <p className="font-semibold text-lg dark:text-gray-200">
//             Show Details
//           </p>
//         </div>
//         <Button
//           icon={<MdOutlineCancel />}
//           color="rgb(153, 171, 180)"
//           bgHoverColor="light-gray"
//           size="2xl"
//           borderRadius="50%"
//         />
//       </div>
//       <div className="mt-6">
//         <BoxContainer method="post" onSubmit={handleSubmit}>
//           <FormContainer>
//             <select onChange={handleNameSelect} required>
//               <option value="">Select Product</option>
//               {products.map((product) => (
//                 <option key={product.id} value={product.id}>
//                   {product.name}
//                 </option>
//               ))}
//             </select>
//             <SubmitButton className="mt-1 " type="submit" >
//               SHOW
//             </SubmitButton>
//           </FormContainer>
//           <GridComponent
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
//                    // template={StatusTemplateActive}
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
//           <Marginer direction="vertical" margin={10} />
//           <Marginer direction="vertical" margin="1em" />
//         </BoxContainer>
//       </div>
//     </div>
//   );
// };

// export default ProductsDetails;

import React, { useEffect, useState } from "react";
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
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "../../components/StyleFilter";
import { Header, NavbarSubAdm } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
//  import { NavbarAdmin, SidebarAdmin, ApproveSupplier } from "..";
import { Link, useNavigate } from "react-router-dom";

import { AddSuppliers, EditSuppliers, DeleteSuppliers, EditDetails, DeleteDetails } from "..";
import NavbarSubProDetails from "../../components/NavbarSubProDetails";
import StatusTemplateMain from '../../admin/status/StatusTemplateMain'
import StatusTemplateActive from '../../admin/status/StatusTemplateActive'
const ProductsDetails = () => {
  const [productdetails, setProductdetails] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { activeMenu, setActiveMenu, currentMode } = useStateContext();
  const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
  const Delete_URL = "https://donkey-casual-python.ngrok-free.app/catalog/product/stock/";

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
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching products: ${errorText}`);
        }
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
      const response = await fetch(`${Delete_URL}${selectedProduct.slug}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMjA3OTI5LCJpYXQiOjE3MjE1Njc5MjksImp0aSI6ImQ0MThkNDdhNjFmZDQ3ZmQ5MzUxY2VkYTAwYjNjNTgzIiwidXNlcl9pZCI6MjF9.gklo0ESBBicwxAztwYUlrnBq5Fz_bXf_0co84JaR4dM",
        },
      });

      const contentType = response.headers.get("Content-Type");
      console.log(`Response Content-Type: ${contentType}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Authentication Error: ${errorText}`);
      }

      const responseText = await response.text();
      console.log(`Response Text: ${responseText}`);

      try {
        const data = JSON.parse(responseText);
        setProductdetails(data);
        console.log(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  const navigate = useNavigate();
  const goback = (action) => {
    navigate(-1); // Navigate to the add page

    // Handle other actions if necessary
  };
  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="mt-6">
          <div className="flex flex-wrap lg:flex-nowrap justify-center bg-white">
            <div className="m-2  p-2 md:p-10  ml-40 mt-0 rounded-xl">
             
              <BoxContainer method="post" onSubmit={handleSubmit}>
              <NavbarSubProDetails
                title2={"Products Details"}
               
              
                // category2={<AddProduct3 />}
                handle3={"Edit Details"}
                 category3={<EditDetails />}
                handle4={"Delete Details"}
                category5={<DeleteDetails />}
              //   category6={<ProductsDetails/>}
               />
                <FormContainer>
                <select onChange={handleNameSelect} required>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

                  <div className="text-center">
                  <SubmitButton className="mt-1 mr-4" type="submit">
                    Details
                  </SubmitButton>
                  <SubmitButton
                    className="mt-2"
                    type="submit"
                    onClick={goback}
                  >
                    GoBack
                  </SubmitButton>
                  </div>
            
              <GridComponent
                dataSource={productdetails.stocks}
                //  dataSource={data}
                width="100%"
                allowPaging
                allowFiltering={true}
                pageSettings={{ pageCount: 5 }}
                dataSourceChanged={dataSourceChanged}
              
              >
                <ColumnsDirective>
              <ColumnDirective
                headerText="Id"
                field="product_detail.id"
                width="120"
                textAlign="Center"
                type="number"
              />
              <ColumnDirective
                headerText="color"
                field="product_detail.color"
                width="120"
                textAlign="Center"
               
              />
              <ColumnDirective
                headerText="size"
                field="product_detail.size"
                width="120"
                textAlign="Center"
               
              />
              <ColumnDirective
                headerText="sku"
                field="product_detail.sku"
                width="150"
                textAlign="Center"
              />
              <ColumnDirective
                headerText="price"
                field="product_detail.price"
                width="150"
                textAlign="Center"
                type="number"
              />
              <ColumnDirective
                headerText="sale price"
                field="product_detail.sale_price"
                width="120"
                textAlign="Center"
                type="number"
              />
              <ColumnDirective
                headerText="is_active"
                field="product_detail.is_active"
                width="120"
                textAlign="Center"
                template={StatusTemplateActive}
              />
              <ColumnDirective
                headerText="is_main"
                field="product_detail.is_main"
                width="120"
                textAlign="Center"
                  template={StatusTemplateMain}
              />
              <ColumnDirective
                headerText="Quantity In stock"
                field="quantity_in_stock"
                width="120"
                textAlign="Center"
              />
              <ColumnDirective
                headerText="Products Sold"
                field="products_sold"
                width="150"
                textAlign="Center"
              />
            </ColumnsDirective>

                <Inject services={[Search, Page, Edit]} />
              </GridComponent>
              </FormContainer>
              </BoxContainer>
            </div>
          </div>

          {/* {isClicked.userProfile && <ApproveSupplier />} */}
        </div>
      </div>
    </>
  );
};

export default ProductsDetails;


