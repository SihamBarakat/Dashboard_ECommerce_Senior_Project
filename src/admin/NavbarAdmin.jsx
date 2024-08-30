import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaSearch, FaFilter } from "react-icons/fa";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Search, UserProfile } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { CgProfile } from "react-icons/cg";

import { Link, useNavigate } from "react-router-dom";
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

const NavbarAdmin = () => {
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
  const handleClick2 = (action) => {
    if (action === "filter") {
      navigate("/filter"); // Navigate to the add page
    }
    // Handle other actions if necessary
  };
  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
       
        {/* <NavButton
          title="Search"
          customFunc={() => handleClick("search")}
          color={currentColor}
          icon={<FaSearch />}
        /> */}
        {/* <NavButton
          title="Profile"
          customFunc={() => handleClick("profile")}
          color={currentColor}
          icon={<CgProfile />}
        /> */}
        {/* <TooltipComponent content="Profile" position="BottomCenter" icon={<CgProfile/>}>
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
         
            <p>
             
              <span className="text-gray-400 font-bold ml-1 text-14">
                Profile
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent> */}

       
        {isClicked.search && <Search />}

        {isClicked.Profile && <UserProfile />}
      </div>
    </div>
  );
};

export default NavbarAdmin;
