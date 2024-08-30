import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../components";
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
const EditInfo = ({ setToken }) => {
  //const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [first_name, setFirstname] = useState();
  const [last_name, setlastName] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState();
  const [details, setDetails] = useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://donkey-casual-python.ngrok-free.app/supplier/view",
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMTQ1NTM2LCJpYXQiOjE3MjE1MDU1MzYsImp0aSI6IjFhY2VmYjQ0ZWI4MzQ1YWRhMDYzOGUzMGQxNTY1MjE4IiwidXNlcl9pZCI6MX0.2MczG1MFpsW-imzII_mAi1iCuGSxtJPg8oqjm-yUPqY",
          },
          body: JSON.stringify({
            email,
            first_name,
            last_name,
            district,
            details,
            city,
            phone_number,
            latitude,
            longitude,
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
  const navigate = useNavigate();
  const goback = () => {
    navigate('/');
  };
  const addlocatin = () => {
    navigate('/');
  };
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Edit Information
          </p>
        </div>
      </div>
      <div className="mt-6">
        <BoxContainer method="post" onSubmit={handleSubmit}>
          <FormContainer>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <Input
              type="text"
              value={first_name}
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
              // require
            />

            <Input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setlastName(e.target.value)}
              // required
            />
            <Input
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              // required
            />
            <Input
              type="text"
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              // require
            />
            <Input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              // required
            />
            <Input
              type="number"
              placeholder="Phone Number"
              value={phone_number}
              onChange={(e) => setPhonenumber(e.target.value)}
              // required
            />
          
          
            
              <Link to="/editlocation"  >Add Location  </Link>
          
            <SubmitButton type="submit"  onClick={addlocatin} >Edit</SubmitButton>
              <SubmitButton type="submit" onClick={goback}>
                Back
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

export default EditInfo;
