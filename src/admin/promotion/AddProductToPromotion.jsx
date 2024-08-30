import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../../components";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "../../components/Style";
import { Marginer } from "../../components/Marginer";

const AddProductToPromotion = () => {
  const [id,setId]=useState([])
  const [products, setProducts] = useState("");
  const [numberList, setNumberList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split the products input string by commas and trim whitespace
    const productsArray = products.split(",").map((product) => product.trim());

    try {
      const response = await fetch(
        `https://donkey-casual-python.ngrok-free.app/promotion/products/${id}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({ products: productsArray }),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication Error");
      }

      const data = await response.json();
      // Process the response data if necessary
      console.log(data);
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Add Products To Discounts
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
              placeholder="Enter product id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Products (comma-separated)"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              required
            />
            <SubmitButton className="mt-1 " type="submit">
              ADD
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
        </BoxContainer>
      </div>
    </div>
  );
};

export default AddProductToPromotion;
