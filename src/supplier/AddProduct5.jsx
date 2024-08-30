// src/Login.js

import React, { useState, useEffect, Fragment } from "react";
import { useSignIn } from "react-auth-kit";
import styled from "styled-components";
import axios from "axios";
import "./products/addProduct.css";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import colorNamer from "color-namer";
import MapComponent from "../components/MapComponent";
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

const AddProduct5 = ({ setToken }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [rows, setRows] = useState([
    { color: "", size: "", quantity: "", price: "" },
  ]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const BASE_URL =
    "https://donkey-casual-python.ngrok-free.app/catalog/product_add/";
  const API_URL =
    "https://donkey-casual-python.ngrok-free.app/catalog/category";
  const API_Type =
    "https://donkey-casual-python.ngrok-free.app/catalog/product_type";
  const API_Size =
    "https://donkey-casual-python.ngrok-free.app/catalog/product_size_value";
  const API_brand = "https://donkey-casual-python.ngrok-free.app/catalog/brand";
  const API_color =
    "https://donkey-casual-python.ngrok-free.app/catalog/product_color/";
    
  useEffect(() => {
    fetch(API_URL, {
      method: "get",
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (level, event) => {
    const selectedId = event.target.value;
    const selectedCat = (
      level === 0 ? categories : subCategories[level - 1]
    ).find((cat) => cat.id == selectedId);

    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[level] = selectedCat;
    setSelectedCategories(newSelectedCategories);

    if (selectedCat && !selectedCat.is_leaf) {
      fetch(`${API_URL}/${selectedCat.slug}`, {
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const newSubCategories = [...subCategories];
          newSubCategories[level] = data;
          setSubCategories(newSubCategories);
        });
    } else {
      const newSubCategories = [...subCategories];
      newSubCategories[level] = [];
      setSubCategories(newSubCategories);

      if (selectedCat && selectedCat.is_leaf) {
        fetch(`${API_Type}/${selectedCat.slug}`, {
          method: "get",
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setProductTypes(data);
          });
      }

      fetch(`${API_brand}/${selectedCat.slug}`, {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBrands(data);
        });
    }
  };
  const handleProductTypeChange = (event) => {
    const typeId = event.target.value;
    const selectedType = productTypes.find((type) => type.id == typeId);
    setSelectedProductType(selectedType);

    if (selectedType) {
      fetch(`${API_Size}/${selectedType.name}`, {
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => setSizes(data));

      fetch(`${API_color}`, {
        method: "get",
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => setColors(data));
    } else {
      setSizes([]);
      setColors([]);
    }
  };
  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    const selectedbrand = brands.find((type) => type.id == brandId);

    setSelectedBrands(selectedbrand);
  };

  const handleAddRow = () => {
    setRows([...rows, { color: "", size: "", quantity: "", price: "" }]);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append(
      "category",
      selectedCategories[selectedCategories.length - 1]?.id || ""
    );
    formData.append("product_type", selectedProductType?.id || "");
    formData.append("brand", selectedBrands?.id || "");
   formData.append("uploaded_images", selectedFile);

    formData.append(
      "colors",
      JSON.stringify(rows.map((row) => parseInt(row.color)))
    );
    formData.append(
      "sizes",
      JSON.stringify(rows.map((row) => parseInt(row.size)))
    );
    formData.append(
      "quantitiy_in_stock",
      JSON.stringify(rows.map((row) => parseInt(row.quantity)))
    );
    formData.append(
      "prices",
      JSON.stringify(rows.map((row) => parseInt(row.price)))
    );

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          "ngrok-skip-browser-warning": "true",
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log(data);
      setMessage("Product added successfully!");
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <div className="product">
      <form  onSubmit={handleSubmit} encType="multipart/form-data">
      <div class="container">
      
        <div class="box">
          <div class="login_form">
        
              <h2>Add New Product</h2>
              <div class="login_form2">
                
                <div className="input_box">
                  <label>Name *</label>
                  <input
                    className="input"
                    type="text"
                    value={name}
                    placeholder="Enter Product Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input_box">
                  <label>Description *</label>
                  <input
                    className="input"
                    type="text"
                    value={description}
                    placeholder="Enter Product Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
               
              </div>
              
              <div class="login_form3">
              
                  <div class="input_box">
                    <label for="email">Category *</label>
                    <div className="select-container">
                      <select
                        onChange={(e) => handleCategoryChange(0, e)}
                        className="big-select"
                      >
                        <option value="">Select Category</option>
                        {Array.isArray(categories) &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div class="input_box">
                    <div className="select-container">
                      {selectedCategories.map((selectedCategory, level) =>
                        selectedCategory && !selectedCategory.is_leaf ? (
                          <Fragment key={level}>
                            <label for="email">Sub Category *</label>
                            <select
                              onChange={(e) =>
                                handleCategoryChange(level + 1, e)
                              }
                              className="big-select"
                            >
                              <option value="">Select Subcategory</option>
                              {subCategories[level] &&
                                subCategories[level].map((subCategory) => (
                                  <option
                                    key={subCategory.id}
                                    value={subCategory.id}
                                  >
                                    {subCategory.name}
                                  </option>
                                ))}
                            </select>
                          </Fragment>
                        ) : null
                      )}
                    </div>
                  </div>
               
              </div>
           
          </div>
        </div>
        <div class="box3">
          <div class="login_form">
           
              <div class="login_form2">
              
                <div className="input_box">
                  <div className="select-container">
                    {selectedCategories.length > 0 &&
                      selectedCategories[selectedCategories.length - 1]
                        ?.is_leaf && (
                        <Fragment>
                          <label>Select Product Type</label>
                          <select
                            onChange={handleProductTypeChange}
                            value={selectedProductType?.id || ""}
                            className="big-select"
                          >
                            <option value="">Select Type</option>
                            {productTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </Fragment>
                      )}
                  </div>
                </div>
                <div className="input_box">
                  <div className="select-container">
                    {selectedCategories.length > 0 &&
                      selectedCategories[selectedCategories.length - 1]
                        ?.is_leaf && (
                        <Fragment>
                          <h2>Select Product Brand</h2>
                          <select
                            onChange={handleBrandChange}
                            value={selectedBrands?.id || ""}
                            className="big-select"
                          >
                            <option value="">Select Brand</option>
                            {brands.map((brand) => (
                              <option key={brand.id} value={brand.id}>
                                {brand.name}
                              </option>
                            ))}
                          </select>
                        </Fragment>
                      )}
                  </div>
                </div>
                
              </div>

              <div class="login_form3">
            
                  <div class="input_box">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Sizes</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((item, index) => (
                        <tr key={index}>
                          <td className="td">
                            {selectedProductType && colors.length > 0 && (
                              <Fragment>
                                <select
                                  className="big-select"
                                  value={item.color || ""}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].color = e.target.value;
                                    setRows(updatedRows);
                                  }}
                                >
                                  <option value="">Select color</option>
                                  {colors.map((color) => (
                                    <option key={color.id} value={color.id}>
                                      {color.color}
                                    </option>
                                  ))}
                                </select>
                              </Fragment>
                            )}
                          </td>
                          <td>
                            {selectedProductType && sizes.length > 0 && (
                              <Fragment>
                                <select
                                  className="big-select"
                                  value={item.size || ""}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].size = e.target.value;
                                    setRows(updatedRows);
                                  }}
                                >
                                  <option value="">Select Size</option>
                                  {sizes.map((size) => (
                                    <option key={size.id} value={size.id}>
                                      {size.value}
                                    </option>
                                  ))}
                                </select>
                              </Fragment>
                            )}
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.quantity || ""}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].quantity = e.target.value;
                                setRows(updatedRows);
                              }}
                            />
                          </td>
                          <td>
                            <input
                              value={item.price || ""}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].price = e.target.value;
                                setRows(updatedRows);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button  className="button" onClick={handleAddRow}>Add Row</button>
                  </div>            
            
              </div>
              <div class="login_form3">
              <input
                  type="file"
                  placeholder="Image"
                  onChange={handleFileChange}
                  required
                />
                

              </div>
              <div class="login_form4">
            
                  <div>
                    <button>Add Product</button>
                  
                  </div>
                  <div >
                  <button onClick={goback}>Go Back</button>
                  
                  </div>
           
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
          
          </div>
        </div>
       
      </div>
      </form>
    </div>
  );
};

export default AddProduct5;
