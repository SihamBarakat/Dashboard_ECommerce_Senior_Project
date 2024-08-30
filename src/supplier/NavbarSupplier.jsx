import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown, MdDelete ,MdEdit } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaSearch } from "react-icons/fa";
import avatar from "../data/avatar.jpg";
import { Search, UserProfile } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { DeleteAccount, UserProfileSupplier } from "../supplier";
import EditInfo from "./EditInfo";
import { CgProfile } from "react-icons/cg";
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

const NavbarSupplier = () => {
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

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const deleteAccount = async () => {
    const accountId = '123'; // Replace with the actual account ID

    try {
      const response = await fetch(`/api/account/${accountId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Account deleted successfully
        // Optionally redirect the user or update the UI
      } else {
        console.error('Failed to delete the account');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleClick2 = (action) => {
    if (action === "search") {
      navigate("/search"); // Navigate to the add page
    }
    // Handle other actions if necessary
  };
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Search"
          customFunc={() => handleClick2("search")}
          color={currentColor}
          icon={<FaSearch />}
        />
         {/* <NavButton
          title="Edit Information"
          customFunc={() => handleClick("editInfo")}
          color={currentColor}
          icon={<MdEdit />}
        /> */}
           <NavButton title="Profile" customFunc={() => handleClick('profile')} color={currentColor} icon={<CgProfile />} />
        {/* <NavButton
          title="Delete Account"
          customFunc={() => handleClick("delete")}
          color={currentColor}
          icon={<MdDelete />}
        /> */}
        {/* <NavButton title="Add Product" customFunc={() => handleClick('cart')} color={currentColor} icon={<MdOutlineAddCircleOutline />} /> */}

        {/* <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent> */}


        {isClicked.search && <Search />}
        {isClicked.editInfo && <EditInfo />}
        {/* {isClicked.delete && deleteAccount} */}
        {isClicked.profile && <UserProfileSupplier />}
        
      </div>
    </div>
  );
};

export default NavbarSupplier;
