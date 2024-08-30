


import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Button } from "../components";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";
import { useNavigate } from "react-router-dom";
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const UserProfileSupplier = () => {
  const { currentColor, handleClick, isClicked } = useStateContext();
  const API_URL =
    "https://donkey-casual-python.ngrok-free.app/supplier/view_details/";
  const [supplierProfile, setSupplierProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMTQ1NTM2LCJpYXQiOjE3MjE1MDU1MzYsImp0aSI6IjFhY2VmYjQ0ZWI4MzQ1YWRhMDYzOGUzMGQxNTY1MjE4IiwidXNlcl9pZCI6MX0.2MczG1MFpsW-imzII_mAi1iCuGSxtJPg8oqjm-yUPqY",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSupplierProfile(data);
        console.log(data.commercial_recored)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Construct the full URL for the commercial record image
   const commercialRecordUrl = `${supplierProfile.commercial_recored}`;
  

  const goto = () => {
    navigate('/');
  };
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200 ml-3">Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
   
          <img src={commercialRecordUrl} alt="Commercial Record" />
       
        {/* <img src={commercialRecordUrl} alt="Commercial Record" className="item-image" /> */}
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            Name: {supplierProfile.user.first_name} {supplierProfile.user.last_name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            User Name: {supplierProfile.user.username}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            Email: {supplierProfile.user.email}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            Phone Number: {supplierProfile.phone_number}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6 ml-3">
          <div>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-200">
              City: {supplierProfile.city}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              District: {supplierProfile.district}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              Details: {supplierProfile.details}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              Latitude: {supplierProfile.latitude}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              Longitude: {supplierProfile.longitude}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              Is Approved: {supplierProfile.is_approved ? "Approved" : "Not Approved"}
            </p>
          </div>
        </div>
        <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
          <button
            type="button"
            className="text-xl rounded-lg p-3 hover:bg-light-gray"
          >
            <Link to="/editsupplier">
              Edit information
              <span>
                <MdOutlineEdit />
              </span>
            </Link>
          </button>
        </div>
        <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
          <button
            type="button"
            className="text-xl rounded-lg p-3 hover:bg-light-gray"
            onClick={goto}
          >
            Delete supplier
            <span>
              <MdDelete />
            </span>
          </button>
        </div>
      </div>
      <div className="mt-5">
        {/* <Button
          color="white"
          bgColor={currentColor}
          // text={<Link to='/' className="link">Logout</Link>}
          borderRadius="10px"
          width="full"
        /> */}
      </div>
      {isClicked.delete && <DeleteAccount />}
    </div>
  );
};

export default UserProfileSupplier;



