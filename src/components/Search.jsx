// import react from "react";
// import { useState } from "react";
// import { MdOutlineCancel } from "react-icons/md";
// import {
//   BoldLink,
//   BoxContainer,
//   FormContainer,
//   Input,
//   MutedLink,
//   SubmitButton,
// } from "./Style";
// import { Button } from ".";
// import { chatData } from "../data/dummy";
// import { useStateContext } from "../contexts/ContextProvider";
// const Search = () => {
//   const { currentColor } = useStateContext();
//   const [input, setInput] = useState("");
//   const handleChange = (value) => {
//     setInput(value);
//     // fetchData(value);
//   };
//   const [inputValue, setInputValue] = useState("");
//   const [fetchedData, setFetchedData] = useState(null);

//   const API_URL =
//     "https://donkey-casual-python.ngrok-free.app/supplier/search/";

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const sendInputValue = () => {
//     const url = `${API_URL}/${inputValue}`;

//     fetch(`${API_URL}/${inputValue}`, {
//       method: "get",
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODcxODEyLCJpYXQiOjE3MTYyMzE4MTIsImp0aSI6IjRhOTg3ZGFiZWRlNzQ3M2E4MDM0ODAwMWJjMjU5NWI0IiwidXNlcl9pZCI6Mn0.VqSIa4ar6CuNQvWdeT8pRcRvINfmTNyqJVsfB4XZXUI",
//       },
//     }).catch((error) => {
//       console.error("There was an error sending the request!", error);
//     });
//   };

//   return (

//     <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">

//         {" "}
//         <div className="flex justify-between items-center">
//           <div className="flex gap-3">
//             <p className="font-semibold text-lg dark:text-gray-200">Search</p>
//           </div>
//           <Button
//             icon={<MdOutlineCancel />}
//             color="rgb(153, 171, 180)"
//             bgHoverColor="light-gray"
//             size="2xl"
//             borderRadius="50%"
//           />
//         </div>
//         <div className="mt-5 ">
//           <Input
//             placeholder="Type to search..."
//             value={inputValue}
//             onChange={handleInputChange}
//           />

//           <div className="mt-5">
//             <Button
//               type="submit"
//               color="white"
//               bgColor={currentColor}
//               text="Search"
//               borderRadius="10px"
//               onClick={sendInputValue}
//               width="full"
//             />
//           </div>
//           {fetchedData && (
//             <div>
//               <h3>Fetched Data:</h3>
//               <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
//             </div>
//           )}
//         </div>

//     </div>

//   );
// };
// export default Search;

// i found this code on chatgpt for search
import React, { useState, useEffect } from 'react';
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
  } from "../components/StyleFilter";
  import { Link, useNavigate } from "react-router-dom";
const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMTYwMTI4LCJpYXQiOjE3MjE1MjAxMjgsImp0aSI6IjRjZDE5N2M3Mjg4ZjQ1NDQ5ZmI5YWQ2ZTRlNzhjOWEzIiwidXNlcl9pZCI6MX0.LoE509njnzXW-mJ9fhssQGj8GJUO9deaSZiJNIE4O-w';
    const navigate = useNavigate();
    const goback = (action) => {
      navigate(-1); // Navigate to the add page
  
      // Handle other actions if necessary
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://donkey-casual-python.ngrok-free.app/supplier/search/${query}`, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });

            console.log('Fetching data for query:', query); // Log the query
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('API Response:', data);
            // Check the response structure
            if (data && data && Array.isArray(data)) {
                console.log('Setting results:', data.items);
                setResults(data);
                setError(null);
            } else {
                console.warn('No items array found in the response');
                setResults([]);
                setError('No items found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        console.log('Results state updated:', results);
    }, [results]);

    return (
        <div className='mt-32'>
            <BoxContainer>
            <FormContainer onSubmit={handleSearch}>
           
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items..."
                   
                />
                 <div className="text-center">
                    <SubmitButton className="mt-1 " type="submit">
                    Search
                    </SubmitButton>
                    <SubmitButton
                      className="mt-1 "
                      type="submit"
                      onClick={goback}
                    >
                      GoBack
                    </SubmitButton>
                  </div>
                
              
            {error && <p>{error}</p>}
            <div className="results">
                {Array.isArray(results) && results.length > 0 ? (
                    results.map((item) => (
                        <div key={item.id} className="result-item">
                            <img src={item.main_image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h2>{item.name}</h2>
                                <p>Price: {item.main_price}</p>
                                <p>Sale Price: {item.main_sale_price}</p>
                                <p>Rating: {item.average_rating}</p>
                                <p>Reviews: {item.reviews_count}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
            </FormContainer>
            </BoxContainer>
        </div>
    );
};

export default Search;




