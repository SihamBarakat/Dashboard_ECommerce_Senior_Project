import React, { useState, useEffect, useContext } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../../components";
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
const AddDiscount = ({ setToken }) => {
  const [name, setName] = useState([]);
  const [coupon_code, setCouponCode] = useState([]);
  const [discount_value, setDiscountValue] = useState([]);
  const [user_max_use, setUserMaxUse] = useState([]);
  const [products_to_earn, setProductsToEarn] = useState([]);

  //   const handleFileChange = (event) => {
  //     setSelectedFile(event.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://donkey-casual-python.ngrok-free.app/coupon/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwNTA1ODIxLCJpYXQiOjE3MjE4NjU4MjEsImp0aSI6ImJjNjQwYjk2YjY2NDRjYmRhYTdhNGEyNmY2NGQ0NWQ0IiwidXNlcl9pZCI6M30.LE6bGXa2lkek4wKKJGE4NUMQ_yGAIaIWCI5cb-1vPNs",
          },
          body: JSON.stringify({
            name,
            coupon_code,
            discount_value,
            user_max_use,
            products_to_earn
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();
      setToken(data.token);
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
            Add Discount
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
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Coupon Code"
              value={coupon_code}
              onChange={(e) => setCouponCode(e.target.value)}
              required
            />

            <Input
              type="number"
              placeholder="Discoun Value"
              value={discount_value}
              onChange={(e) => setDiscountValue(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="User Max Use"
              value={user_max_use}
              onChange={(e) => setUserMaxUse(e.target.value)}
              required
            />

            <Input
              type="number"
              placeholder="Products To Earn"
              value={products_to_earn}
              onChange={(e) => setProductsToEarn(e.target.value)}
              required
            />
            <SubmitButton className="mt-1 " type="submit">
              ADD
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

export default AddDiscount;
