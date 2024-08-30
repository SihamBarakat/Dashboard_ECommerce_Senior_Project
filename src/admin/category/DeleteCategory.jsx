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

const DeleteCategory = () => {
  const [category_id, setCategoryId] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://donkey-casual-python.ngrok-free.app/catalog/category/${category_id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            //'ngrok-skip-browser-warning': 'true',
          },

          body: JSON.stringify({
            category_id,
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
            Delete Category
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
              placeholder="Category ID"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />

            <SubmitButton className="mt-1 " type="submit">
              Delete
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />

          <Marginer direction="vertical" margin="1em" />
        </BoxContainer>
      </div>
    </div>
  );
};

export default DeleteCategory;
