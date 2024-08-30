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
const EditPromotion = () => {
  const [id, setId] = useState([]);
  const [name, setName] = useState([]);
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
    

    try {
      const response = await fetch(
        `https://donkey-casual-python.ngrok-free.app/promotion/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            discount_percentege,
            time_start,
            time_end,     
            is_active,
            is_scheduled,
            selectedFile
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
            Edit Promotion
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
              placeholder="Promotion Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default EditPromotion;
