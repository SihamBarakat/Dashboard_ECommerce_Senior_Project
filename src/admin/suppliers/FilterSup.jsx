
// import React, { useState ,useEffect} from 'react';

// const FilterSup = () => {
//   const [filterCriteria, setFilterCriteria] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const [supplier,setSupplier]=useState([]);
//   const [is_approve,setIsapprove] = useState([])
//   const API_URL =
//   "https://donkey-casual-python.ngrok-free.app/supplier/all";

//   const data = [
//     { id: 1, name: 'Alice', age: 25 },
//     { id: 2, name: 'Bob', age: 30 },
//     { id: 3, name: 'Charlie', age: 35 },
//   ];
  
//   const handleFilterChange = (event) => {
//    // setFilterCriteria(event.target.value);
//     setIsapprove(event.target.value);
//   };
  
//   const handleFilterClick = () => {
//     const filtered = supplier.filter(item => item.is_approve.includes(filterCriteria));
//     setFilteredData(filtered);
//   };


//  const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch(
//         API_URL,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MTk1OTI3LCJpYXQiOjE3MTY1NTU5MjcsImp0aSI6IjE1NDg0MWEwNTkzZjRlOWM5OTg4M2QxYmFkN2QxMDYwIiwidXNlcl9pZCI6MX0.8iIGe-3IYmmr4zYT7qfCO4HSxdb6hoLmJ7cEGZi1FKM'
//           },
//           body:JSON.stringify({
//             is_approve,
            
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Authentication Error");
//       }
//       const data = await response.json();
      
      
//       console.log(data.token);
//     } catch (error) {
//       console.error("Authentication Error:", error);
//     }
//   };


//   return (
//     <div>
//       <input
//         type="text"
//         value={is_approve}
//         onChange={handleFilterChange}
//         placeholder="Enter name to filter"
//       />
//       <button onClick={handleFilterClick}>Filter</button>
      
//       <ul>
//         {filteredData.map(item => (
//           <li key={item.id}>{item.name} - {item.age}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FilterSup;












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
import { Link,useNavigate } from "react-router-dom";
const FilterSup = ({ setToken }) => {
  const [is_approve, setIsapprove] = useState([]);
  const[supplier,setSupplier]=useState([])
  const API_URL =
  "https://donkey-casual-python.ngrok-free.app/supplier/all";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        API_URL,
        {
          method: "post",
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
             //'Authorization':
               //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NzgxOTE3LCJpYXQiOjE3MTkxNDE5MTcsImp0aSI6Ijc5YTg4NzM1ZTY0YTRjZjBhM2RjNGVmMjQzMTRkMzJkIiwidXNlcl9pZCI6MTB9.4A6b0JF9MM6rVeOFzm9ITxY-F--nRRVYxWdS6TCq8NI',
          },

          body: JSON.stringify({
            is_approve,
           
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();
setSupplier(data);
      console.log(data);
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };
  
  const navigate = useNavigate();
  const goto = () => {
    navigate('/resultfiltersup');
  };
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Filter Promotion
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
              placeholder="Is active"
              value={is_approve}
              onChange={(e) => setIsapprove(e.target.value)}
              required
            />
           
            <SubmitButton className="mt-1 " type="submit" onClick={goto}>
              Filter
            </SubmitButton>
          </FormContainer>
         
          <Marginer direction="vertical" margin={10} />
        
          <Marginer direction="vertical" margin="1em" />
          {/* <MutedLink href="#">
                Go Back
                <BoldLink href="#" >
                  <Link to='/'class="link" >Back</Link>
                </BoldLink>
              </MutedLink> */}
        </BoxContainer>
      </div>
    </div>
  );
};

export default FilterSup;
