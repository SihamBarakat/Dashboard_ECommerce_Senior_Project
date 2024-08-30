import React, { useState, useEffect, useContext, Fragment } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from "../components";
import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "../components/Style";
import { Marginer } from "../components/Marginer";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import CategoryList from'./CategoryList'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdEdit } from "react-icons/md";
//import UserProfile from './UserProfile'
import axios from "axios";
const AddProduct = () => {
  const API_URL =
    "https://donkey-casual-python.ngrok-free.app/catalog/category";
  const API_Type =
    "https://donkey-casual-python.ngrok-free.app/catalog/product_type";

  const [categories, setCategories] = useState([]);  //cat
  const [sub1Categories, setSub1Categories] = useState([]); //subcat1
  const [sub2Categories, setSub2Categories] = useState([]);  //subcat2
  const [sub3Categories, setSub3Categories] = useState([]);  //subcat2
  const [sub4Categories, setSub4Categories] = useState([]);  //subcat2
  const [sub5Categories, setSub5Categories] = useState([]);  //subcat2
  const [type, setType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); //select1

  const [selectedSub1Category, setSelectedSub1Category] = useState(null);
  
  const [selectedSub2Category, setSelectedSub2Category] = useState(null);
  const [selectedSub3Category, setSelectedSub3Category] = useState(null); 
  const [selectedsub4Category, setSelectedSub4Category] = useState(null); 
  const [selectedtype, setSelectedType] = useState(null);
  const data2  = [
    {
      name: "elcetronics",
      states: {
        name: "laptop",
        category3: ["gamming", "pc"],
      },
    },
    {
      name: "Clothes",
      states: {
        name: "man",
        category3: ["tshirt", "jaket"],
      },
    },
    { name: "Shose" },
  ];

  useEffect(() => {
    // Fetch categories
    fetch("https://donkey-casual-python.ngrok-free.app/catalog/category", {
      method: "get",
      headers: {
        //'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    const selectedCat = categories.find((cat) => cat.id == selectedId);
    setSelectedCategory(selectedCat);

    if (selectedCat && !selectedCat.is_leaf) {
      // Fetch subcategories
      fetch(`${API_URL}/${selectedCat.slug}`, {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => setSub1Categories(data));
    } else {
      setSub1Categories([]);
    }
  };
  const handleSub1CategoryChange = (event) => {
    const selectedSub1Id = event.target.value;
    const selectedSub1Cat = sub1Categories.find((cat) => cat.id == selectedSub1Id);
    setSelectedSub1Category(selectedSub1Cat);

    if (selectedSub1Cat && !selectedSub1Cat.is_leaf) {
      // Fetch subcategories
      fetch(`${API_URL}/${selectedSub1Cat.slug}`, {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => setSub2Categories(data));
    } else {
      setSub2Categories([]);
    }
  };
  const handleSub2CategoryChange = (event) => {
    const selectedSub2Id = event.target.value;
    const selectedSub2Cat = sub2Categories.find((cat) => cat.id == selectedSub2Id);
    setSelectedSub2Category(selectedSub2Cat);

    if (selectedSub2Cat && !selectedSub2Cat.is_leaf) {
      // Fetch subcategories
      fetch(`https://donkey-casual-python.ngrok-free.app/catalog/product_type/${selectedSub2Cat.slug}`, {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => setSub3Categories(data));
    } else {
      setSub3Categories([]);
    }
  };
  const handleSub3CategoryChange = (event) => {
    const selectedSub3Id = event.target.value;
    const selectedSub3Cat = sub3Categories.find((cat) => cat.id == selectedSub3Id);
    setSelectedSub3Category(selectedSub3Cat);

    if (selectedSub3Cat && !selectedSub3Cat.is_leaf) {
      // Fetch subcategories
      fetch(`https://donkey-casual-python.ngrok-free.app/catalog/category/${selectedSub3Cat.slug}`, {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
      
        .then((response) => response.json())
        .then((data) => {setSub4Categories(data)
          console.log(data.name)
        })
        
    } else {
      setSub4Categories([]);
    }
  };
  const handleSub4CategoryChange = (event) => {
    const selectedSub4Id = event.target.value;
    const selectedSub4Cat = sub4Categories.find((cat) => cat.id == selectedSub4Id);
    setSelectedSub4Category(selectedSub4Cat);

    if (selectedSub4Cat && !selectedSub4Cat.is_leaf) {
      // Fetch subcategories
      fetch(`https://donkey-casual-python.ngrok-free.app/catalog/category/${selectedSub4Cat.slug}`, {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => {setSub5Categories(data);
          console.log(data)}
        );
       
    } else {
      setSub5Categories([]);
    }
  };
  const handleType = (event) => {
    const typeId = event.target.value;
    const selectedtype = sub1Categories.find((cat) => cat.id == typeId);
    setSelectedSub1Category(selectedtype);
   
    
    setSelectedType(selectedtype);

    if (selectedtype) {
      // Fetch subcategories
      fetch(`https://donkey-casual-python.ngrok-free.app/catalog/product_type/${selectedtype.slug}`, {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
        },
      })
        .then((response) => response.json())
        .then((data) => setType(data));
    } else {
      setType([]);
    }
  };
  // const handleCategoryType1 = (event) => {
  //   const selectedSubId = event.target.value;
  //   const selectedSubCat = subsubCategories.find(
  //     (cat) => cat.id == selectedSubId
  //   );
  //   setSelectedSubCategory(selectedSubCat);

  //   if (selectedSubCat && !selectedSubCat.is_leaf) {
  //     // Fetch subcategories
  //     fetch(`${API_Type}/camera`, {
  //       method: "get",
  //       headers: {
  //         //'Content-Type': 'application/json',
  //         "ngrok-skip-browser-warning": "true",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setSubSubCategories(data));
  //   } else {
  //     setSubSubCategories([]);
  //   }
  // };
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
            {/* <Input type="text" placeholder="Price" required /> */}







            <h1>Select Category</h1>
            <select onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {selectedCategory && !selectedCategory.is_leaf && (
              <>
                <h2>Select Subcategory 1</h2>
                <select onChange={handleSub1CategoryChange}>
                  <option value="">Select Sub 1 category</option>
                  {sub1Categories.map((sub1Category) => (
                    <option key={sub1Category.id} value={sub1Category.id}>
                      {sub1Category.name}
                    </option>
                  ))}
                </select>
              </>
            )}
             
            {selectedSub1Category && selectedSub1Category.is_leaf && (
              <>
                <h2>Select type 1</h2>
                <select onChange={handleType} >
                  <option value="">Select Type</option>
                  {type.map((type1) => (
                    <option key={type1.id} value={type1.id}>
                      {type1.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            {selectedSub1Category && !selectedSub1Category.is_leaf && (
              <>
                <h2>Select Subcategory 2</h2>
                <select onChange={handleSub2CategoryChange}>
                  <option value="">Select Sub 2 category</option>
                  {sub2Categories.map((sub2Category) => (
                    <option
                      key={sub2Category.id}
                      value={sub2Category.id}
                    >
                      {sub2Category.name}
                    </option>
                  ))}
                </select>
              </>
            )}
             {selectedSub2Category && !selectedSub2Category.is_leaf && (
              <>
                <h2>Select Subcategory 3</h2>
                <select onChange={handleSub3CategoryChange}>
                  <option value="">Select Sub 3 category</option>
                 
                  {Array.isArray(sub3Categories) && sub3Categories.map((sub3Category) => (
                    <option
                      key={sub3Category.id}
                      value={sub3Category.id}
                    >
                      {sub3Category.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            {selectedsub4Category && !selectedsub4Category.is_leaf && (
              <>
                <h2>Select Subcategory 4</h2>
                <select >
                  <option value="">Select Sub 4 category</option>
                  { sub4Categories.map((sub4Category) => (
                    <option
                      key={sub4Category.id}
                      value={sub4Category.id}
                    >
                      {sub4Category.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            
            {/* {selectedSub4Category && !selectedSub4Category.is_leaf && (
              <>
                <h2>Select Subcategory 4</h2>
                <select >
                  <option value="">Select Sub 4 category</option>
                  {sub5Categories.map((sub4Category) => (
                    <option
                      key={sub4Category.id}
                      value={sub4Category.id}
                    >
                      {sub4Category.name}
                    </option>
                  ))}
                </select>
              </>
            )} */}
            {/* {selectedSub3Category && !selectedSub3Category.is_leaf && (
              <>
                <h2 >Select Subcategory 4</h2>
                <select onChange={handleSub4CategoryChange}>
                  <option value="">Select Sub 4 category</option>
                  {sub4Categories.map((sub4Category) => (
                    <option
                      key={sub4Category.id}
                      value={sub4Category.id}
                    >
                      {sub4Category.name}
                    </option>
                  ))}
                </select>
              </>
            )} */}
            {/* {selectedSub3Category && selectedSub3Category.is_leaf && (
              <>
                <h2>Select type 222</h2>
                <select >
                  <option value="">Select Sub 4 category</option>
                  {sub4Categories.map((sub4Category) => (
                    <option
                      key={sub4Category.id}
                      value={sub4Category.id}
                    >
                      {sub4Category.name}
                    </option>
                  ))}
                </select>
              </>
            )} */}
            {/* {selectedSubCategory && selectedSubCategory.is_leaf && (
              <>
                <h2>Select Type</h2>
                <select onChange={handleCategoryType1}>
                  <option value="">Select category Type</option>
                  {subsubCategories.map((subsubCategories) => (
                    <option
                      key={subsubCategories.id}
                      value={subsubCategories.id}
                    >
                      {subsubCategories.name}
                    </option>
                  ))}
                </select>
              </>
            )} */}

            {/* <>
              <Input type="text" placeholder="Type" required />
            </> */}
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <SubmitButton type="submit">
            <Link to="/Admin" class="link">
              ADD
            </Link>
          </SubmitButton>
          <Marginer direction="vertical" margin="1em" />
          {/* <MutedLink href="#">
                Go Back
                <BoldLink href="#" >
                  <Link to='/'class="link" >Back</Link>
                </BoldLink>
              </MutedLink> */}
        </BoxContainer>
      </div>
    </div>
  );
};
export default AddProduct;



// if (selectedCat && selectedCat.is_leaf) {
//   try {
//     const response = await fetch(`${API_brand}/${selectedCat.slug}`, {
//       method: "get",
//       headers: {
//         //'Content-Type': 'application/json',
//         "ngrok-skip-browser-warning": "true",
//        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI',


//       },
//     });
//   const data = await response.json();
//   setBrands(data);
//     console.log(data); // This will log the entire response object for debugging
   
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }

  
// }
// {selectedCategories.length > 0 &&
//   selectedCategories[selectedCategories.length - 1]?.is_leaf && (
//     <Fragment>
//       <h2>Select Product Brand</h2>
//       <select onChange={handleBrandChange}>
//         <option value="">Select Brand</option>
//         {brands.map((brand) => (
//           <option key={brand.id} value={brand.id}>
//             {brand.name}
//           </option>
//         ))}
//       </select>
//     </Fragment>
//   )}