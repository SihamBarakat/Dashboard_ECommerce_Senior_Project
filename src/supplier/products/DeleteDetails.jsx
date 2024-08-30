import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../../components";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "../../components/Style";
import { Marginer } from "../../components/Marginer";

const DeleteDetails = ({ setToken }) => {
  const [id, setId] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/product_stock/";
  const Delete_URL = " https://donkey-casual-python.ngrok-free.app/catalog/product_stock/";
 
  const handleNameSelect = (event) => {
    const selectedId = event.target.value;
    const selectedProduct = products.find((product) => product.id == selectedId);
    setSelectedProduct(selectedProduct);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(API_URL, {
  //         method: "get",
  //         headers: {
  //           "ngrok-skip-browser-warning": "true",
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMjA3OTI5LCJpYXQiOjE3MjE1Njc5MjksImp0aSI6ImQ0MThkNDdhNjFmZDQ3ZmQ5MzUxY2VkYTAwYjNjNTgzIiwidXNlcl9pZCI6MjF9.gklo0ESBBicwxAztwYUlrnBq5Fz_bXf_0co84JaR4dM",
  //         },
  //       });
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${Delete_URL}${id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            //'ngrok-skip-browser-warning': 'true',
          },

          body: JSON.stringify({
            Input,
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
            Delete Details
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
        <BoxContainer method="delete" onSubmit={handleSubmit}>
          <FormContainer>
          <Input
              type="text"
              placeholder="Product Detail ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <SubmitButton className="mt-1 " type="submit">
              DELETE
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <Marginer direction="vertical" margin="1em" />
        </BoxContainer>
      </div>
    </div>
  );
};

export default DeleteDetails;






// import React, { useState, useEffect, useContext } from "react";
// import { MdOutlineCancel } from "react-icons/md";
// import { Button } from "../../components";
// import {
//   BoldLink,
//   BoxContainer,
//   FormContainer,
//   Input,
//   MutedLink,
//   SubmitButton,
// } from "../../components/Style";
// import { Marginer } from "../../components/Marginer";
// import { Link } from "react-router-dom";
// const DeleteProducts = ({ setToken }) => {
//   const [name, setName] = useState([]);
//   const [selectedName, setSelectedName] = useState([]);
//   const [productss, setProductss] = useState([]);
//   const API_URL =
//   "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
//   const handleNameSelect = (event) => {
//     const nameselect = event.target.value;
//     const selectednames = name.find((names) => names.id == nameselect);

//     setSelectedName(selectednames);
//   };
//   //   const handleFileChange = (event) => {
//   //     setSelectedFile(event.target.files[0]);
//   // };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_URL, {
//           method: "get",
//           headers: {
//             //'Content-Type': 'application/json',
//             "ngrok-skip-browser-warning": "true",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//           },
//         });
//         const data = await response.json();
//         setProductss(data);
//         console.log(data); // This will log the entire response object for debugging
//         console.log(data.product_detail);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `${API_URL}/${selectedName.slug}`,
//         {
//           method: "delete",
//           headers: {
//             "Content-Type": "application/json",
//             'Authorization':
//                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI',
//           },
//           body: JSON.stringify({
//             name,
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Authentication Error");
//       }
//       const data = await response.json();
//       setToken(data.token);
//       if (data.token) {
//         localStorage.setItem("token", data.token);

//         const payload = JSON.parse(atob(data.token.split(".")[1]));
//         const userRole = payload.role;
//       }
//       console.log(data.token);
//     } catch (error) {
//       console.error("Authentication Error:", error);
//     }
//   };
//   return (
//     <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
//       <div className="flex justify-between items-center">
//         <div className="flex gap-3">
//           <p className="font-semibold text-lg dark:text-gray-200">
//             Delete Product
//           </p>
//         </div>
//         <Button
//           icon={<MdOutlineCancel />}
//           color="rgb(153, 171, 180)"
//           bgHoverColor="light-gray"
//           size="2xl"
//           borderRadius="50%"
//         />
//       </div>
//       <div className="mt-6">
//         <BoxContainer method="post" onSubmit={handleSubmit}>
//           <FormContainer>
           
//             <Input
//               type="text"
//               placeholder="Product Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />

//             <SubmitButton className="mt-1 " type="submit">
//               DELETE
//             </SubmitButton>
//           </FormContainer>
//           <Marginer direction="vertical" margin={10} />

//           <Marginer direction="vertical" margin="1em" />
//           {/* <MutedLink href="#">
//                 Go Back
//                 <BoldLink href="#" >
//                   <Link to='/'class="link" >Back</Link>
//                 </BoldLink>
//               </MutedLink> */}
//         </BoxContainer>
//       </div>
//     </div>
//   );
// };

// export default DeleteProducts;
