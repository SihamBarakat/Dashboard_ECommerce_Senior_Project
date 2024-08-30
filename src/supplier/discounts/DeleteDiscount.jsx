

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
const DeleteDiscount = ({ setToken }) => {
  const [id, setId] = useState([]);
 

  
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
// };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://donkey-casual-python.ngrok-free.app/coupon/${id}`,
        {
          method: "delete",
          headers: {
            'Content-Type':'application/json',
            // 'Authorization':
            //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NzgxMDMzLCJpYXQiOjE3MTkxNDEwMzMsImp0aSI6IjVlNTQ3MjdhZTEyZDQ3OGI5MzVkM2EwZWZkYzJhNDExIiwidXNlcl9pZCI6MX0.LLvsXHNH--8kC31nIt9ixMvZbS6Jo6rgDxw1RWY52ts',
          },
          body: JSON.stringify({
          id
            
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
          Delete Discount
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
              placeholder="Discount ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
           
            <SubmitButton className="mt-1 " type="submit">
              DELETE
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

export default DeleteDiscount;

