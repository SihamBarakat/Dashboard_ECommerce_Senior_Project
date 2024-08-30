import React, { useState, useEffect, useContext } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../components";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./suppliers/StyleSupp";
import { Marginer } from "../components/Marginer";
import { Link, useNavigate } from "react-router-dom";
const ApproveSupplier = () => {
  const [supplier_id, setSupplierId] = useState([]);
  const [is_approved, setIsApproved] = useState([]);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/Suppliers"); // Navigate back to the previous page
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://donkey-casual-python.ngrok-free.app/supplier/approve/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4OTg5NzQwLCJpYXQiOjE3MjAzNDk3NDAsImp0aSI6ImZiY2I1ODk0MTE0ZDQ1MWNhNzZhZjFkYTU1NjliNzhiIiwidXNlcl9pZCI6MTB9.zCEfjoM35rpbNqWpkQLs2qpkSalcxKeuvvf62YqsQyE'
          },
          body: JSON.stringify({
            supplier_id,
            is_approved,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();
      //   setToken(data.token);
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
            Approve Supplier
          </p>
        </div>
        {/* <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        /> */}
      </div>
      <div className="mt-6">
        <BoxContainer method="post" onSubmit={handleSubmit}>
          <FormContainer>
            <Input
              type="text"
              placeholder="Supplier Id"
              value={supplier_id}
              onChange={(e) => setSupplierId(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Is Approved"
              value={is_approved}
              onChange={(e) => setIsApproved(e.target.value)}
              required
            />
            <SubmitButton className="mt-1 " type="submit">
              APPROVE
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />

          <Marginer direction="vertical" margin="1em" />
          <MutedLink href="#">
            Go Back
            <BoldLink href="" onClick={handleBackClick}>
              Back
            </BoldLink>
          </MutedLink>
        </BoxContainer>
      </div>
    </div>
  );
};

export default ApproveSupplier;
