import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../../components";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "../../components/Style";
import { Marginer } from "../../components/Marginer";

const AddCategory = ({ setToken }) => {
  const [name, setName] = useState([]);
  const [parent, setParent] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://donkey-casual-python.ngrok-free.app/catalog/category/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MTk1OTI3LCJpYXQiOjE3MTY1NTU5MjcsImp0aSI6IjE1NDg0MWEwNTkzZjRlOWM5OTg4M2QxYmFkN2QxMDYwIiwidXNlcl9pZCI6MX0.8iIGe-3IYmmr4zYT7qfCO4HSxdb6hoLmJ7cEGZi1FKM'
          },
          body: JSON.stringify({
            name,
            parent,
            image,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();
      setToken(data.token);
     
      console.log(data.token);
      setMessage("Category added successfully!");
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Add Category
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
              placeholder="Parent"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              require
            />
            <SubmitButton className="mt-1 " type="submit">
              ADD
            </SubmitButton>
          </FormContainer>

          <Marginer direction="vertical" margin={10} />

          <Marginer direction="vertical" margin="1em" />
        
        </BoxContainer>
      </div>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default AddCategory;
