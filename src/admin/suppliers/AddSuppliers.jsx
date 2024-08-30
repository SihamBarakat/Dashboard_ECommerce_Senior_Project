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
const AddSuppliers = ({ setToken }) => {
  const [email, setEmail] = useState([]);
  const [first_name, setFirstname] = useState([]);
  const [last_name, setLastname] = useState([]);
  const [username, setUsername] = useState([]);
  const [brand_name, setBrandname] = useState([]);
  const [brand_location, setBrandlocation] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("username", username);
    formData.append("brand_name", brand_name);
    formData.append("brand_location", brand_location);
    formData.append("commercial_recored", selectedFile);
    try {
      const response = await fetch(
        "https://donkey-casual-python.ngrok-free.app/catalog/category/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MTk1OTI3LCJpYXQiOjE3MTY1NTU5MjcsImp0aSI6IjE1NDg0MWEwNTkzZjRlOWM5OTg4M2QxYmFkN2QxMDYwIiwidXNlcl9pZCI6MX0.8iIGe-3IYmmr4zYT7qfCO4HSxdb6hoLmJ7cEGZi1FKM'
          },
          body: formData,
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
            Add Supplier
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Brand Name"
              value={brand_name}
              onChange={(e) => setBrandname(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Brand Location"
              value={brand_location}
              onChange={(e) => setBrandlocation(e.target.value)}
              required
            />
            <Input
              type="file"
              placeholder="Commercial Recored"
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

export default AddSuppliers;
