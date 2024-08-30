import React, { useState, useEffect, Fragment } from "react";
import { Button } from "../components";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "../components/Style";
import { Marginer } from "../components/Marginer";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

const AddProduct3 = () => {
  const API_URL =
    "https://donkey-casual-python.ngrok-free.app/catalog/category";
  const API_Type =
    "https://donkey-casual-python.ngrok-free.app/catalog/product_type";
  const API_Size =
    "https://donkey-casual-python.ngrok-free.app/catalog/product_size_value";
  const API_brand =
    "https://donkey-casual-python.ngrok-free.app/catalog/brand";
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(null);
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

  const handleCategoryChange = async (level, event) => {
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

      if (selectedCat && selectedCat.is_leaf) {
        try {
          const response = await fetch(`${API_brand}/${selectedCat.slug}`, {
            method: "get",
            headers: {
              //'Content-Type': 'application/json',
              "ngrok-skip-browser-warning": "true",
             
  
  
            },
          });
        const data = await response.json();
        setBrands(data);
          console.log(data); // This will log the entire response object for debugging
         
        } catch (error) {
          console.error("Error fetching data:", error);
        }

        
      }
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
    } else {
      setSizes([]);
    }
  };
  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    const selectedbrand = brands.find((type) => type.id == brandId);
    
    setSelectedBrands(selectedbrand);
  };
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Add Product
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
        <BoxContainer>
          <FormContainer>
            <Input type="text" placeholder="Name" required />
            <Input type="text" placeholder="Description" required />

            <h1>Select Category</h1>
            <select onChange={(e) => handleCategoryChange(0, e)}>
              <option value="">Select Category</option>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>

            {selectedCategories.map((selectedCategory, level) =>
              selectedCategory && !selectedCategory.is_leaf ? (
                <Fragment key={level}>
                  <h2>Select Subcategory </h2>
                  <select onChange={(e) => handleCategoryChange(level + 1, e)}>
                    <option value="">Select Subcategory</option>
                    {subCategories[level] &&
                      subCategories[level].map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </option>
                      ))}
                  </select>
                </Fragment>
              ) : null
            )}

            {selectedCategories.length > 0 &&
              selectedCategories[selectedCategories.length - 1]?.is_leaf && (
                <Fragment>
                  <h2>Select Product Type</h2>
                  <select onChange={handleProductTypeChange}>
                    <option value="">Select Type</option>
                    {productTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </Fragment>
              )}
            {selectedCategories.length > 0 &&
              selectedCategories[selectedCategories.length - 1]?.is_leaf && (
                <Fragment>
                  <h2>Select Product Brand</h2>
                  <select onChange={handleBrandChange}>
                    <option value="">Select Brand</option>
                    {Array.isArray(brands) &&brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </Fragment>
              )}
              
            {selectedProductType && sizes.length > 0 && (
              <Fragment>
                <h2>Select Size</h2>
                <select >
                  <option value="">Select Size</option>
                  {sizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.value}
                    </option>
                  ))}
                </select>
              </Fragment>
            )}
             <label>
                  <input
                    type="checkbox"
                    value="36"
                    //checked={selectedOption === "option1"}
                   // onChange={handleChange}
                  />
                  36
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="option2"
                   // checked={selectedOption === "option2"}
                   // onChange={handleChange}
                  />
                  37
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="option3"
                   // checked={selectedOption === "option3"}
                   // onChange={handleChange}
                  />
                  38
                </label>
                <div>
     
        <div key={sizes} style={{ margin: '10px 0' }}>
          <label
            // style={{
            //   color: size === selectedSize ? sizeColors[size] : 'black'
            // }}
          >
            <input
              type="checkbox"
              checked={sizes }
              //onChange={() => handleCheckboxChange(size)}
            />
            {sizes}
          </label>
        </div>
     
    </div>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <SubmitButton type="submit">
            <Link to="/Admin" className="link">
              ADD
            </Link>
          </SubmitButton>
          <Marginer direction="vertical" margin="1em" />
        </BoxContainer>
      </div>
    </div>
  );
};

export default AddProduct3;

// import React, { useState, useEffect ,Fragment} from "react";
// import { Button } from "../components";
// import { BoxContainer, FormContainer, Input, SubmitButton } from "../components/Style";
// import { Marginer } from "../components/Marginer";
// import { Link } from "react-router-dom";
// import { MdOutlineCancel } from "react-icons/md";

// const AddProduct3 = () => {
// //   const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/category";
// //   const API_Type =
// //   "https://donkey-casual-python.ngrok-free.app/catalog/product_type";
// //   const [categories, setCategories] = useState([]);
// //   const [subCategories, setSubCategories] = useState([]);
// //   const [selectedCategories, setSelectedCategories] = useState([]);
// //  const [productTypes, setProductTypes] = useState([]);
// //  const [selectedProductType, setSelectedProductType] = useState("");
// //   useEffect(() => {
// //     // Fetch categories
// //     fetch(API_URL, {
// //       method: "get",
// //       headers: {
// //         "ngrok-skip-browser-warning": "true",
// //         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
// //       },
// //     })
// //       .then((response) => response.json())
// //       .then((data) => setCategories(data));
// //   }, []);

// //   const handleCategoryChange = (level, event) => {
// //     const selectedId = event.target.value;
// //     const selectedCat = (level === 0 ? categories : subCategories[level - 1]).find((cat) => cat.id == selectedId);

// //     const newSelectedCategories = [...selectedCategories];
// //     newSelectedCategories[level] = selectedCat;
// //     setSelectedCategories(newSelectedCategories);

// //     if (selectedCat && !selectedCat.is_leaf) {
// //       // Fetch subcategories
// //       fetch(`${API_URL}/${selectedCat.slug}`, {
// //         method: "get",
// //         headers: {
// //           "ngrok-skip-browser-warning": "true",
// //           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
// //         },
// //       })
// //         .then((response) => response.json())
// //         .then((data) => {
// //           const newSubCategories = [...subCategories];
// //           newSubCategories[level] = data;
// //           setSubCategories(newSubCategories);
// //         });
// //     } else {
// //       const newSubCategories = [...subCategories];
// //       newSubCategories[level] = [];
// //       setSubCategories(newSubCategories);
// //     }
// //   };
// //   const handleCategory2Change = (level, event) => {
// //     const selectedId = event.target.value;
// //     const selectedCat = (level === 0 ? categories : subCategories[level - 1]).find((cat) => cat.id == selectedId);

// //     const newSelectedCategories = [...selectedCategories];
// //     newSelectedCategories[level] = selectedCat;
// //     setSelectedCategories(newSelectedCategories);

// //     if (selectedCat && selectedCat.is_leaf) {
// //       // Fetch subcategories
// //       fetch(`${API_Type}/${selectedCat.slug}`, {
// //         method: "get",
// //         headers: {
// //           "ngrok-skip-browser-warning": "true",
// //           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
// //         },
// //       })
// //         .then((response) => response.json())
// //         .then((data) => {
// //           const newSubCategories = [...subCategories];
// //           newSubCategories[level] = data;
// //           setSubCategories(newSubCategories);
// //         });
// //     } else {
// //       const newSubCategories = [...subCategories];
// //       newSubCategories[level] = [];
// //       setSubCategories(newSubCategories);
// //     }
// //   };
// //   const handletypeChange = (level, event) => {
// //     const selectedId = event.target.value;
// //     const selectedCat = (level === 0 ? categories : subCategories[level - 1]).find((cat) => cat.id == selectedId);

// //     const newSelectedCategories = [...selectedCategories];
// //     newSelectedCategories[level] = selectedCat;
// //     setSelectedCategories(newSelectedCategories);

// //     if (selectedCat && selectedCat.is_leaf) {
// //       // Fetch subcategories
// //       fetch(`${API_Type}/${selectedCat.slug}`, {
// //         method: "get",
// //         headers: {
// //           "ngrok-skip-browser-warning": "true",
// //           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
// //         },
// //       })
// //         .then((response) => response.json())
// //         .then((data) => {
// //           const newSubCategories = [...subCategories];
// //           newSubCategories[level] = data;
// //           setSubCategories(newSubCategories);
// //         });
// //     } else {
// //       const newSubCategories = [...subCategories];
// //       newSubCategories[level] = [];
// //       setSubCategories(newSubCategories);
// //     }
// //   };

// //   const handleType = (event) => {
// //     const typeId = event.target.value;
// //     const selectedtype = subCategories.find((cat) => cat.id == typeId);
// //     setSelectedProductType(selectedtype);

// //     setProductTypes(selectedtype);

// //     if (selectedtype) {
// //       // Fetch subcategories
// //       fetch(`https://donkey-casual-python.ngrok-free.app/catalog/product_type/${selectedtype.slug}`, {
// //         method: "get",
// //         headers: {
// //           //'Content-Type': 'application/json',
// //           "ngrok-skip-browser-warning": "true",
// //           Authorization:
// //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
// //         },
// //       })
// //         .then((response) => response.json())
// //         .then((data) => setProductTypes(data));
// //     } else {
// //       setProductTypes([]);
// //     }
// //   };

// const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/category";
//   const API_Type = "https://donkey-casual-python.ngrok-free.app/catalog/product_type";
//   const API_Size = "https://donkey-casual-python.ngrok-free.app/catalog/product_size_value";
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [productTypes, setProductTypes] = useState([]);
//   const [selectedProductType, setSelectedProductType] = useState("");
//   const [sizes, setSizes] = useState([]);

//   useEffect(() => {
//     fetch(API_URL, {
//       method: "get",
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setCategories(data));
//   }, []);

//   const handleCategoryChange = (level, event) => {
//     const selectedId = event.target.value;
//     const selectedCat = (level === 0 ? categories : subCategories[level - 1]).find((cat) => cat.id == selectedId);

//     const newSelectedCategories = [...selectedCategories];
//     newSelectedCategories[level] = selectedCat;
//     setSelectedCategories(newSelectedCategories);

//     if (selectedCat && !selectedCat.is_leaf) {
//       fetch(`${API_URL}/${selectedCat.slug}`, {
//         method: "get",
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const newSubCategories = [...subCategories];
//           newSubCategories[level] = data;
//           setSubCategories(newSubCategories);
//         });
//     } else {
//       const newSubCategories = [...subCategories];
//       newSubCategories[level] = [];
//       setSubCategories(newSubCategories);

//       if (selectedCat && selectedCat.is_leaf) {
//         fetch(`${API_Type}/${selectedCat.slug}`, {
//           method: "get",
//           headers: {
//             "ngrok-skip-browser-warning": "true",
//             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//           },
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             setProductTypes(data);
//           });
//       }
//     }
//   };

//   const handleProductTypeChange = (event) => {
//     const typeId = event.target.value;
//     const selectedType = productTypes.find((type) => type.id == typeId);
//     setSelectedProductType(selectedType);

//   };

//   return (
//     <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
//       <div className="flex justify-between items-center">
//         <div className="flex gap-3">
//           <p className="font-semibold text-lg dark:text-gray-200">Add Product</p>
//         </div>
//         <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
//       </div>
//       <div className="mt-6">
//         <BoxContainer>
//           <FormContainer>
//             <Input type="text" placeholder="Name" required />
//             <Input type="text" placeholder="Description" required />

//             <h1>Select Category</h1>
//             <select onChange={(e) => handleCategoryChange(0, e)}>
//               <option value="">Select Category</option>
//               {Array.isArray(categories) &&categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>

//             {selectedCategories.map((selectedCategory, level) =>
//               selectedCategory && !selectedCategory.is_leaf ? (
//                 <Fragment key={level}>
//                   <h2>Select Subcategory {level + 1}</h2>
//                   <select onChange={(e) => handleCategoryChange(level + 1, e)}>
//                     <option value="">Select Subcategory {level + 1}</option>
//                     {subCategories[level] &&
//                       subCategories[level].map((subCategory) => (
//                         <option key={subCategory.id} value={subCategory.id}>
//                           {subCategory.name}
//                         </option>
//                       ))}
//                   </select>
//                 </Fragment>
//               ) : null
//             )}

//             {selectedCategories.length > 0 && selectedCategories[selectedCategories.length - 1]?.is_leaf && (
//               <Fragment>
//                 <h2>Select Product Type</h2>
//                 <select onChange={handleProductTypeChange}>
//                   <option value="">Select Type</option>
//                   {productTypes.map((type) => (
//                     <option key={type.id} value={type.id}>
//                       {type.name}
//                     </option>
//                   ))}
//                 </select>
//               </Fragment>
//             )}
//              {selectedProductType && selectedCategories.length > 0 && (
//               <Fragment>
//                 <h2>Select Size</h2>
//                 <select >
//                   <option value="">Select Size</option>
//                   {sizes.map((size) => (
//                     <option key={size.id} value={size.id}>
//                       {size.name}
//                     </option>
//                   ))}
//                 </select>
//               </Fragment>
//             )}
// {/*
// {selectedProductType && sizes.length > 0 && (
//   <Fragment>
//     <h2>Select Size</h2>
//     <select>
//       <option value="">Select Size</option>
//       {sizes.map((size) => (
//         <option key={size.id} value={size.id}>
//           {size.name}
//         </option>
//       ))}
//     </select>
//   </Fragment>
// )} */}

//             {/* <h1>Select Category</h1>
//             <select onChange={(e) => handleCategoryChange(0, e)}>
//               <option value="">Select Category</option>
//               {Array.isArray(categories) &&categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>

//             {selectedCategories.map((selectedCategory, level) =>
//               selectedCategory && !selectedCategory.is_leaf ? (
//                 <Fragment key={level}>
//                   <h2>Select Subcategory {level + 1}</h2>
//                   <select onChange={(e) => handleCategoryChange(level + 1, e)}>
//                     <option value="">Select Subcategory {level + 1}</option>
//                     {Array.isArray(subCategories) &&subCategories[level] &&
//                       Array.isArray(subCategories) && subCategories[level].map((subCategory) => (
//                         <option key={subCategory.id} value={subCategory.id}>
//                           {subCategory.name}
//                         </option>
//                       ))}
//                   </select>

//                 </Fragment>
//               ) : null
//             )}

//            {selectedCategories.map((selectedCategory, level) =>
//               selectedCategory && selectedCategory.is_leaf ? (
//                 <Fragment key={level}>
//                    <h2>Select type 1</h2>
//                 <select onChange={handleCategory2Change} >
//                   <option value="">Select Type</option>
//                   {productTypes.map((type1) => (
//                     <option key={type1.id} value={type1.id}>
//                       {type1.name}
//                     </option>
//                   ))}
//                 </select>

//                 </Fragment>
//               ) : null
//             )}
//              {Array.isArray(selectedProductType) &&selectedProductType.map((selectedCategory, level) =>
//               selectedCategory && !selectedCategory.is_leaf ? (
//                 <Fragment key={level}>
//                   <h2>Select type 12</h2>
//                 <select onChange={handleType} >
//                   <option value="">Select Type</option>
//                   {productTypes.map((type1) => (
//                     <option key={type1.id} value={type1.id}>
//                       {type1.name}
//                     </option>
//                   ))}
//                 </select>
//                 </Fragment>
//               ) : null
//             )} */}

//           </FormContainer>
//           <Marginer direction="vertical" margin={10} />
//           <SubmitButton type="submit">
//             <Link to="/Admin" className="link">
//               ADD
//             </Link>
//           </SubmitButton>
//           <Marginer direction="vertical" margin="1em" />
//         </BoxContainer>
//       </div>
//     </div>
//   );
// };

// export default AddProduct3;
