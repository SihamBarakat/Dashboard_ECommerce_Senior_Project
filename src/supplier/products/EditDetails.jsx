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
const EditDetails = () => {
  const [id, setId] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [is_main, setIsmain] = useState([]);
  const [price, setPrice] = useState([]);
  const [is_active, setIsactive] = useState([]);
  const [quantity_in_stock, setQuantityInStock] = useState([]);
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleIsactiveChange = (event) => {
    setIsactive(event.target.value);
  };
  const handleIsmainChange = (event) => {
    setIsmain(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantityInStock(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://donkey-casual-python.ngrok-free.app/catalog/product_stock/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //'ngrok-skip-browser-warning': 'true',
           // Authorization:
          //    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          },

          body: JSON.stringify({
           
            color,
            size,
            price,
            is_active,
            is_main,
            quantity_in_stock,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);

        const payload = JSON.parse(atob(data.token.split(".")[1]));
        const userRole = payload.role;
      }
      console.log(data.token);
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Edit Details
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
            <Input
              type="number"
              placeholder="Id"
              value={id}
              onChange={handleIdChange}
              required
            />
            <Input
              type="text"
              placeholder="Colors"
              value={color}
              onChange={handleColorChange}
             
            />
            <Input
              placeholder="Sizes"
              value={size}
              onChange={handleSizeChange}
       
            />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={handlePriceChange}
              required
            />
            <Input
              type="text"
              placeholder="Is Active"
              value={is_active}
              onChange={handleIsactiveChange}
              required
            />

            <Input
              type="text"
              placeholder="Is Main"
              value={is_main}
              onChange={handleIsmainChange}
              required
            />
            <Input
              type="text"
              placeholder="Quantity"
              value={quantity_in_stock}
              onChange={handleQuantityChange}
              required
            />
            <SubmitButton className="mt-1 " type="submit">
              Edit
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />

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

export default EditDetails;
