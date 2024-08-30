import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css"; // Import CSS for styles
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import ProductsDetails from "./ProductsDetails";
import { useStateContext } from "../../contexts/ContextProvider";
import { MdKeyboardArrowDown, MdDelete ,MdEdit } from "react-icons/md";
import { Search, UserProfile } from "../../components";
import { TbListDetails } from "react-icons/tb";
// const StatusTemplateProd = (props) => {
//   const navigate = useNavigate();

//   const handleProductDetailsClick = () => {
//     navigate(`/productsdetails`);
//     const slug =props.slug
//     return slug
//   };

//   return <button onClick={handleProductDetailsClick}>View Details</button>;
// };
// export default StatusTemplateProd;
const StatusTemplateProd = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
   
    navigate("/productsdetails"); // Navigate to the inactive page
   
  };
  

// const handleEdit = (props) => {
//   const handleClick = () => {
   
//     navigate("/productsdetails"); // Navigate to the inactive page
   
//   };
//     // Add your edit logic here
// };

const handleDelete = (props) => {
    console.log('Delete button clicked', props);
    // Add your delete logic here
};
return (
  <div>
      <button onClick={handleClick}> 
          <TbListDetails  /> 
      </button>
      {/* <button onClick={() => handleDelete(props)}>
          <MdDelete /> Delete
      </button> */}
  </div>
);
};

export default StatusTemplateProd;





// const actionTemplate = (props) => {
//   return (
//       <div>
//           <button onClick={() => handleEdit(props)}> 
//               <MdEdit /> Edit
//           </button>
//           <button onClick={() => handleDelete(props)}>
//               <MdDelete /> Delete
//           </button>
//       </div>
//   );
// };

// const handleEdit = (props) => {
//   console.log('Edit button clicked', props);
//   // Add your edit logic here
// };

// const handleDelete = (props) => {
//   console.log('Delete button clicked', props);
//   // Add your delete logic here
// };
