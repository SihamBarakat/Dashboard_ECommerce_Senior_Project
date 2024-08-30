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
const AddPromotion = ({ setToken }) => {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState("");
  const [discount_percentege, setDiscountPercentege] = useState([]);
  const [time_start, setTimeStart] = useState([]);
  const [time_end, setTimeEnd] = useState([]);

  const [is_active, setIsActive] = useState([]);
  const [is_scheduled, setIsScheduled] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("discount_percentege", discount_percentege);
    formData.append("time_start", time_start);
    formData.append("time_end", time_end);
    formData.append("is_active", is_active);
    formData.append("is_scheduled", is_scheduled);
    formData.append("image_url", selectedFile);

    try {
      const response = await fetch(
        'https://donkey-casual-python.ngrok-free.app/promotion/',
        {
          method: "POST",
          headers: {
           // 'Content-Type': 'application/json',
             //'Authorization':
           //  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NzgxOTE3LCJpYXQiOjE3MTkxNDE5MTcsImp0aSI6Ijc5YTg4NzM1ZTY0YTRjZjBhM2RjNGVmMjQzMTRkMzJkIiwidXNlcl9pZCI6MTB9.4A6b0JF9MM6rVeOFzm9ITxY-F--nRRVYxWdS6TCq8NI',
          },
          body:  formData,
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
            Add Promotion
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
                    className="input"
                    type="text"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
            <Input
              type="number"
              placeholder="Discount Percentege"
              value={discount_percentege}
              onChange={(e) => setDiscountPercentege(e.target.value)}
              required
            />
           
            <Input
              type="date"
              placeholder="Time Start"
              value={time_start}
              onChange={(e) => setTimeStart(e.target.value)}
              required
            />
            <Input
              type="date"
              placeholder="Time End"
              value={time_end}
              onChange={(e) => setTimeEnd(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Is Active"
              value={is_active}
              onChange={(e) => setIsActive(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Is Scheduled"
              value={is_scheduled}
              onChange={(e) => setIsScheduled(e.target.value)}
              required
            />
            <Input
              type="file"
              placeholder="Image"
             
              
              onChange={handleFileChange}
              require
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

export default AddPromotion;
