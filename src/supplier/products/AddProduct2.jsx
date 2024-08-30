import React, { useState, useEffect, useContext } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from "../../components";
import { chatData } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "../../components/Style";
import { Marginer } from "../../components/Marginer";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import CategoryList from'./CategoryList'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdEdit } from "react-icons/md";

//import UserProfile from './UserProfile'
const AddProduct2 = ({ someProp }) => {
  const API_ENDPOINT =
    "https://donkey-casual-python.ngrok-free.app/catalog/category";
  const API_electronics = "/electronics";

  const { currentColor, handleClick, isClicked } = useStateContext();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState([]);

  const [showInputs, setShowInputs] = useState([]);
  const [inputVisibility, setInputVisibility] = useState([]);

  const [selectedOption1, setSelectedOption1] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [categories1, setCategories1] = useState([]);
  const [message, setMessage] = useState("");
  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [is_leaf, setIsleaf] = useState([]);

  const [value, setValue] = useState("");

  const category = [
    {
      categories: [
        {
          id: 1,
          name: "Electronics",
          slug: "electronics",
          parent: null,
          is_leaf: false,
          is_active: true,
          image_url:
            "/media/https%3A/f.nooncdn.com/mpcms/EN0002/assets/fd5ec2de-e0da-4c16-8b11-7125ed91758a.png%3Fformat%3Davif",
        },
        {
          id: 18,
          name: "Fashion",
          slug: "fashion",
          parent: null,
          is_leaf: false,
          is_active: true,
          image_url: "/media/images/category/default.png",
        },
        {
          id: 46,
          name: "[]",
          slug: "",
          parent: null,
          is_leaf: true,
          is_active: true,
          image_url: "/media/images/category/default.png",
        },
        {
          id: 39,
          name: "Beauty & Fragrance",
          slug: "beauty-fragrance",
          parent: null,
          is_leaf: false,
          is_active: true,
          image_url: "/media/images/category/default.png",
        },
      ],
    },
  ];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission, e.g., uploading files to a server
    // console.log(selectedFiles);
  };

  const handleSelectChange1 = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };
  function handleSelect(event) {
    setValue(event.target.value);
  }

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue1(value);

    // Determine the number of input boxes based on the selected value
    if (value === "elcetronics") {
      setInputCount(1);
    } else if (value === "cat22") {
      setInputCount(2);
    } else if (value === "cat32") {
      setInputCount(3);
    } else {
      setInputCount(0);
    }
  };
  const getCategories = async () => {
    const response = await fetch(API_ENDPOINT, {
            method: "get",
            headers: {
              //'Content-Type': 'application/json',
              "ngrok-skip-browser-warning": "true",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
            },
          });
    const data = await response.json();
    setCategories(data)
    return data;
  };

  // const getCategories = async () => {
  //   try {
      
  //     const response = await fetch(API_ENDPOINT, {
  //       method: "get",
  //       headers: {
  //         //'Content-Type': 'application/json',
  //         "ngrok-skip-browser-warning": "true",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
  //       },
  //     });
  //     const data = await response.json();

  //     console.log(data);

  //     setCategories(data.categories);
  //     //   if (selectedOption1.name === 'Electronics') {
  //     //    console.log('true elect')
  //     // } else {
  //     //     //setShowSecondSelect(false);
  //     // }

  //     // const value = data.categories.name;
  //     // const leaf = data.categories.is_leaf;
  //     // console.log(value);
  //     //setSelectedValue(value);

  //     // Determine the number of input boxes based on the selected value
  //     // if (leaf === false) {
  //     //   setInputCount(1);
  //     // } else if (value === "cat22") {
  //     //   setInputCount(2);
  //     // } else if (value === "cat32") {
  //     //   setInputCount(3);
  //     // } else {
  //     //   setInputCount(0);
  //     // }
  //     // // Implement the if condition based on the received data
  //     // if (value === selectedValue&&slug===true) {
  //     //   setInputCount(1);
  //     // } else if (value === "cat22") {
  //     //   setInputCount(2);
  //     // } else if (value === "cat32") {
  //     //   setInputCount(3);
  //     // } else {
  //     //   setInputCount(0);
  //     // }
     
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setMessage("Error fetching data");
  //   }
  // };
  const getsubCategory1 = async () => {
    const response = await fetch(API_ENDPOINT + API_electronics, {
      method: "get",
      headers: {
        //'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
      },
    });
    const data = await response.json();
    setCategories1(data);
    //categories1 == data.categories; 
   

    // const leaf = setIsleaf(data.categories.is_leaf);
    console.log(data);
   
  };
  useEffect(() => {
    getCategories();

   
  }, []);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const categoriess = await getCategories();
  //     setCategories(categoriess);
  //   };

  //   fetchCategories();
  // }, [someProp]);
  const [firstSelect, setFirstSelect] = useState('');
  const [secondOptions, setSecondOptions] = useState([]);
  const [secondSelect, setSecondSelect] = useState([]);

  const firstOptions = [
    { value: 'fruit', label: 'Fruit' },
    { value: 'vegetable', label: 'Vegetable' },
  ];

  const allSecondOptions = {
    fruit: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
    vegetable: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  };

  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelect(selectedValue);
    setSecondOptions(allSecondOptions[selectedValue] || []);
    setSecondSelect([]); // Reset second select when the first select changes
  };

  const handleSecondSelectChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSecondSelect(selectedValues);
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
            <Input type="text" placeholder="Price" required />


            {/* <div>
      <div>
        <label>
          First Select:
          <select value={firstSelect} onChange={handleFirstSelectChange}>
            <option value="" disabled>Select an option</option>
            {firstOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Second Select (multiple):
          <select multiple={true} value={secondSelect} onChange={handleSecondSelectChange}>
            {secondOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
    </div> */}



       {/* categories*/}
            <h6>categories</h6>
            <select onChange={handleSelectChange} value={selectedValue}>
              {categories.map(item=> (
                <option  value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {/*sub category1*/}
            

               

           
             <h6>Category Dropdown</h6>
              <select onChange={handleSelectChange} value={selectedValue}>
                {categories1.map(item=> (
                  <option value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            {/* <select value={selectedOption} onChange={handleSelectChange}>
              <option value="">category</option>
              <option value="elcetronics">Elcetronics</option>
              <option value="fashion">Fashion</option>
              <option value="beauty and fragrance">Beauty And Fragrance</option>
            </select> */}

            <Input
              type="multiple"
              option={category.name}
              onChange={handleSelect}
            />
            {/* <select classname="form-select" onChange={handleSelect}>{
                      option.map(option=>(
                        <option value ={option.value}>{option.label}</option>
                      ))
                    }
                      </select> */}
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

export default AddProduct2;
