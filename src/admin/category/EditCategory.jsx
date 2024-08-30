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

const EditCategory = ({ setToken }) => {
  const [id, setId] = useState([]);
  const [name, setName] = useState([]);
  const [is_active, setIsactive] = useState([]);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const API_URL =
"https://donkey-casual-python.ngrok-free.app/catalog/category/home";
  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(API_URL, {
  //         method: "get",
  //         headers: {
  //           //'Content-Type': 'application/json',
  //           "ngrok-skip-browser-warning": "true",
  //         },
  //       });
  //       const data = await response.json();
  //       setCategories(data);
  //       console.log(data); // This will log the entire response object for debugging
  //       // Assuming your API returns an array of items directly
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const typeId = e.target.value;
  
    // const selectedType = categories.find((cat) => cat.id == typeId);
    // setSelectedId(selectedType);
   
    try {
      const response = await fetch(
        `https://donkey-casual-python.ngrok-free.app/catalog/category/home`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //'ngrok-skip-browser-warning': 'true',
          },

          body: JSON.stringify({
            id,
            name,
            is_active,
            image
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
            Edit Category
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
              placeholder="ID"
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
              type="text"
              placeholder="Is Active"
              value={is_active}
              onChange={(e) => setIsactive(e.target.value)}
              required
            />
                        <Input
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              require
            />
            <SubmitButton className="mt-1 " type="submit">
              Edit
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />

          <Marginer direction="vertical" margin="1em" />
        
        </BoxContainer>
      </div>
    </div>
  );
};

export default EditCategory;
