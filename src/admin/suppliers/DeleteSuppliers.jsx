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
const DeleteSuppliers = ({ setToken }) => {
  const [id, setId] = useState([]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://donkey-casual-python.ngrok-free.app/supplier/view",
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            //'ngrok-skip-browser-warning': 'true',
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5MDczNzEzLCJpYXQiOjE3MjA0MzM3MTMsImp0aSI6ImU4NmQ1NWUwMGRhZDQyMjZhNDM1Mjg0NzAwZDM1Y2VlIiwidXNlcl9pZCI6N30.0732dbWIOnDChfZS838Il4rogJHPc3QxtDhCR79_yiM'
          },

          body: JSON.stringify({
            id,
           
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();

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
            Delete Suppliers
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
              placeholder="Supplier ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
           
            <SubmitButton className="mt-1 " type="submit">
              Delete
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

export default DeleteSuppliers;
