import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Search, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { AddCategory } from "../admin";
import { Header } from ".";
import { MdAdd, MdOutlineEdit, MdDelete } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { MdFilterAlt  } from "react-icons/md";
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

const NavbarSubDiscount = ({
  title2,
  category2,
  category3,
  category4,
  category5,
  handle,
  handle2,
  handle3,
  handle4
}) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  // const handleClick = (action) => {
  //   if (action === "addproduct") {
  //     navigate("/addproduct"); // Navigate to the add page
  //   }
  //   // Handle other actions if necessary
  // };
  const handleClick3 = (action) => {
    if (action === "details") {
      navigate("/productsdetails"); // Navigate to the add page
    }
    // Handle other actions if necessary
  };
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <Header title={title2} />
      <div className="flex">
        
        <NavButton
          title={handle}
          customFunc={() => handleClick("add")}
          color={currentColor}
          icon={<MdAdd />}
        />
      
       <NavButton
          title={handle3}
          customFunc={() => handleClick("edit")}
          color={currentColor}
          icon={<MdOutlineEdit />}
        />
       
        <NavButton
          title={handle4}
          customFunc={() => handleClick("delete")}
          color={currentColor}
          icon={<MdDelete />}
        />
          {/* <NavButton
          title="Filter"
          customFunc={() => handleClick3("filter")}
          color={currentColor}
          icon={<MdFilterAlt />}
        /> */}
        {isClicked.add && [category2]}
        {isClicked.edit && [category3]}
        {isClicked.delete && [category4]}
        {isClicked.filter && [category5]}
      </div>
    </div>
  );
};

export default NavbarSubDiscount;

// import React from "react";

// const Header = ({ category, title2, title }) => (
//   <div className=" mb-6 ">
//     <div className="text-3xl font-extrabold tracking-tight text-slate-900 bg-white">
//       <h4 color="black">{title} </h4>{" "}
//       <h4 className="text-lg mr-11 text-gray-400">{category}</h4>
//     </div>
//   </div>
// );

// export default Header;
