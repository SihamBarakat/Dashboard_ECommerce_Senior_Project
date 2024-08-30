import React, { useEffect,useNavigate } from "react";
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
import { IoMdArrowBack } from "react-icons/io";
import { Header } from ".";
import { MdAdd, MdOutlineEdit,MdDelete  } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { Products,Products2 } from "../supplier";
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

const Sub = ({
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
//   const handleBackClick = () => {
//     navigate("/Suppliers"); // Navigate back to the previous page
//   };
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <Header title={title2} />
      <div className="flex">
      <NavButton
          title={handle}
          customFunc={() => handleClick("edit")}
          color={currentColor}
          icon={<MdOutlineEdit />}
        />
        
        <NavButton
          title={handle2}
          customFunc={() => handleClick("back")}
          color={currentColor}
          icon={<IoMdArrowBack />}
        />
        
        
        {/* {isClicked.edit && (<EditProductDetails/>)} */}
        {isClicked.back && (navigate(-1))}
      </div>
    </div>
  );
};

export default Sub;


