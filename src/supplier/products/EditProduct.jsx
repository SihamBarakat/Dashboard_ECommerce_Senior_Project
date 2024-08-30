
import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../../components";
import {
  BoxContainer,
  FormContainer,
  SubmitButton,
  Input
} from "../../components/Style";
import { Marginer } from "../../components/Marginer";

const EditProduct = ({ setToken }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
  const Edit_URL = "https://donkey-casual-python.ngrok-free.app/catalog/products/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "get",
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      console.error("No product name provided");
      return;
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-'); // Convert name to slug

    try {
      const response = await fetch(
        `${Edit_URL}${slug}`,
        {
          method: "put", // Assuming you want to edit, use PUT method
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
          },
          body: JSON.stringify({
            // Include any data you need to update the product
            name: name,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit product");
      }
      const data = await response.json();
      setToken(data.token);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      console.log(data.token);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Edit Product
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
              placeholder="Enter product name"
              value={name}
              onChange={handleNameChange}
              required
            />
      
            
            <SubmitButton className="mt-1 " type="submit">
              EDIT
            </SubmitButton>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <Marginer direction="vertical" margin="1em" />
        </BoxContainer>
      </div>
    </div>
  );
};

export default EditProduct;










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
// const EditProduct = ({ setToken }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [colors, setColors] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [productTypes, setProductTypes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
  
//   const API_URL = "https://donkey-casual-python.ngrok-free.app/catalog/supplier/products/";
//   const Edit_URL = "https://donkey-casual-python.ngrok-free.app/catalog/products/";
//   const handleNameSelect = (event) => {
//     const selectedId = event.target.value;
//     const selectedProduct = products.find((product) => product.id == selectedId);
//     setSelectedProduct(selectedProduct);
//   };


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_URL, {
//           method: "get",
//           headers: {
//             "ngrok-skip-browser-warning": "true",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//           },
//         });
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   //   const handleFileChange = (event) => {
//   //     setSelectedFile(event.target.files[0]);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `${Edit_URL}/${selectedProduct.slug}`,
//         {
//           method: "put",
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             //'ngrok-skip-browser-warning': 'true',
//           },

//           body: JSON.stringify({
//             name,
//             description,
//             colors,
//             sizes,
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
//             Edit Discount
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
//               placeholder="Name"
//               value={name}
//               onChange={handleNameSelect}
//               required
//             />
//             <Input
//               type="text"
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />

//             <Input
//               type="number"
//               placeholder="Colors"
//               value={colors}
//               onChange={(e) => setColors(e.target.value)}
//               required
//             />
//             <Input
//               type="number"
//               placeholder="Sizes"
//               value={sizes}
//               onChange={(e) => setSizes(e.target.value)}
//               required
//             />

//             <SubmitButton className="mt-1 " type="submit">
//               Edit
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

// export default EditProduct;
