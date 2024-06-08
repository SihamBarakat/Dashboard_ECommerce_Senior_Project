
import React,{  useState, useEffect, useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { chatData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

import { BoldLink, BoxContainer, FormContainer,  Input, MutedLink, SubmitButton,} from "./Style";
import { Marginer } from "../components";
import { Link } from "react-router-dom"
import styled from "styled-components";
//import CategoryList from'./CategoryList'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdEdit } from "react-icons/md";
//import UserProfile from './UserProfile'
const AddProduct2 = () => {
  const { currentColor ,handleClick,isClicked} = useStateContext();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const style1=styled.input`
 width: 100%;
 height: 42px;
 outline: none;
 border: 1px solid rgba(200, 200, 200, 0.3);
 padding: 0px 10px;
 border-bottom: 1.4px solid transparent;
 transition: all 200ms ease-in-out;
 font-size: 13px;

 &::placeholder {
   color: #333;
 }

 &:not(:last-of-type) {
   border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
 }

 &:focus {
   outline: none;
   border-bottom: 2px solid rgb(241, 196, 15);
 }
`;
  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  const handleImageSelect = (event) => {
    const images = event.target.files;
    const selectedImageList = Array.from(images);
    setSelectedImages(selectedImageList);
  };
  const [value,setValue]= useState('');
  const option=[
    {label:"Red",value:1},
    {label:"Green",value:2},
    {label:"Yellow",value:3},
    {label:"Blue",value:4},
    {label:"Black",value:5},
  ]
  const subcat=[
    {label:"personal",value:1},
    {label:"gaming",value:2},
    
  ]
  const category=[
    {name:"elcetronics",
    states:{
      name:"laptop",
      category3:["gamming","pc"]
    },
  },
    {name:"Clothes",
    states:{
      name:"man",
      category3:["tshirt","jaket"]
    },
  },
    {name:"Shose"},
   
  ]
  
  function handleSelect(event){
    setValue(event.target.value)
  }

  //const [category1 ,setCategory1] =useState('category1');
  //const [state ,setState] =useState('category2');
  //const [category3 ,setCategory3] =useState('category3');
  //const [states,setStates]=useState([]);
  // const changeCategory1=(event)=>{
  //   setCategory1(event.target.value);
  //   setStates(category1.find(cat=>cat.name === event.target.value).states)


  // }
  // const changeState=(event)=>{
  //   setState(event.target.value);

  // }
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission, e.g., uploading files to a server
    console.log(selectedFiles);
  };

 
const [values,setValues]=useState([])
const [options,setOptions]=useState([])
//// const [showInputs, setShowInputs] = useState(false);
// useEffect(()=>{
//   fetch("api").then((data)=>data.json()).then((val)=>setValue(val))
// },[])
const [showInputs, setShowInputs] = useState(true);
  const [inputVisibility, setInputVisibility] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.example.com/input-visibility') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setInputVisibility(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const [selectedValue, setSelectedValue] = useState('');
  const [inputCount, setInputCount] = useState(0);
  
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    }
  // Handle dropdown selection
  const handleSelectChange = (event) => {
  const value = event.target.value;
    setSelectedValue(value);

    // Determine the number of input boxes based on the selected value
    if (value === 'elcetronics') {
      setInputCount(1);
    } else if (value === 'cat22') {
      setInputCount(2);
    } else if (value === 'cat32') {
      setInputCount(3);
    } else {
      setInputCount(0);
    }
  };
console.log(values,"values")
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title}  position="BottomRight">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-2 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Add Product</p>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>
      <div className="mt-6">
        <BoxContainer>
              <FormContainer >
                <Input type="text" placeholder="Name" required/>
                <Input type="text" placeholder="Description"required />
                <Input type="text" placeholder="Price"required />
                {/*categories*/}
                <select on onChange={(e)=>setOptions(e.target.value)} placeholder="Category">
                    {values.map((opts,i)=><option>{opts.name}</option>)}
                    </select>
                  <h1>{options}</h1>
                  {/* Sub Category option 1 */}
                   {/* <div>
                    <button onClick={() => setShowInputs(!showInputs)}>
                      {showInputs ? 'Hide Inputs' : 'Show Inputs'}
                    </button>
                    {showInputs && (
                      <>
                         <Input type="text" placeholder="Type"required />
                    <select  onChange={handleSelect}>{
                          option.map(option=>(
                            <option value ={option.value}>{option.label}</option>
                          ))
                        }
                          </select>
                     
                <Input type="number" placeholder="Size" />
                <Input type="file"multiple accept="image/*"  onChange={handleFileChange} />
                  <div className="image-previews">
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        style={{ width: '100px', margin: '10px' }}
                      />
                    ))}
                  </div>
                <Input type="text" placeholder="Sale Price" />
                      </>
                    )}
                  </div> 
                   */}
     
       
        <select value={selectedValue} onChange={handleSelectChange} >
          <option value="">category</option>
          <option value="elcetronics">Elcetronics</option>
          <option value="fashion">Fashion</option>
          <option value="beauty and fragrance">Beauty And Fragrance</option>
          
        </select>
        
         
     
        {Array.from({ length: inputCount }).map((_, index) => (
          // <Input key={index} type="text" placeholder={`Input ${index + 1}`} />
          // {/* select subcat with api*/}
          //    {/* <select  onChange={handleSelect}>
          //    {
          //         subcat.map(subcat=>(
          //           <option value ={subcat.value}>{subcat.label}</option>
          //         ))
          //       }
                
          //    </select> */}
         <>
          <select value={selectedValue} onChange={handleSelectChange}>
          <option value="">Sub cat</option>
          <option value="cat1">Elcetronics</option>
          <option value="cat2">gaming</option>
          <option value="cat3 ">personal</option>
          
        </select>
        
          <select value={selectedValue} onChange={handleSelectChange}>
          <option value="">Sub cat2</option>
          <option value="cat12">1</option>
          <option value="cat22">2</option>
          <option value="cat32">3</option>
          
        </select>
             <Input type="text" placeholder="Type"required />
             
             
             
             <select  onChange={handleSelect} > <option>color</option>{
              
                  option.map(option=>(
                    <option value ={option.value}>{option.label}</option>
                  ))
                }
            </select>
            <label>
              select size
             
           
            
            </label>
            <label>
              <input type="checkbox" value="36"  checked={selectedOption === 'option1'} onChange={handleChange} />
              36
            </label>  
            <label>
              <input type="checkbox" value="option2"  checked={selectedOption === 'option2'} onChange={handleChange} />
              37
            </label>
            <label>
              <input type="checkbox" value="option3"  checked={selectedOption === 'option3'} onChange={handleChange} />
              38
            </label>
            <label>
              <input type="checkbox" value="option4"  checked={selectedOption === 'option4'} onChange={handleChange} />
              39
            </label>
            <label>
              <input type="checkbox" value="option5"  checked={selectedOption === 'option5'} onChange={handleChange} />
              40
            </label>
           
            <Input type="text" placeholder="Quantity"required />
            <label type="number" placeholder=""required  >
            Edit Quantity
            <BoldLink href="/editquantity" >
                 <Button margin="10" icon={<MdEdit />} color={currentColor}  size="xl" position="right" borderRadius="50%" />
              </BoldLink>
            
            </label>
            
           
           
            <Input type="file"multiple accept="image/*"  onChange={handleFileChange} />
                  <div className="image-previews">
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        style={{ width: '100px', margin: '10px' }}
                      />
                    ))}
                  </div>
                  
          </>
         
        ))}
      
   
                  {/*sub category with api */}
                  {/* <div>
      <button onClick={() => setShowInputs(!showInputs)}>
        {showInputs ? 'Hide Inputs' : 'Show Inputs'}
      </button>
      {showInputs && (
        <div>
          {inputVisibility.map((isVisible, index) => (
            isVisible && <input key={index} type="text" placeholder={`Input ${index + 1}`} />
          ))}
        </div>
      )}
    </div> */}
                <Input type="multiple" option={category.name} onChange={handleSelect}/>
                    {/* <select classname="form-select" onChange={handleSelect}>{
                      option.map(option=>(
                        <option value ={option.value}>{option.label}</option>
                      ))
                    }
                      </select> */}

              </FormContainer>
              <Marginer direction="vertical" margin={10} />
              <SubmitButton type="submit"><Link to='/Admin'class="link" >ADD</Link></SubmitButton>
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

export default AddProduct2;

















// import React,{  useState, useEffect, useContext } from 'react';
// import { MdOutlineCancel } from 'react-icons/md';
// import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

// import { useStateContext } from '../contexts/ContextProvider';
// import { cartData } from '../data/dummy';
// import { Button } from '.';




// import { BoldLink, BoxContainer, FormContainer,  Input, MutedLink, SubmitButton,} from "./Style";
// import { Marginer } from "./Style";
// //import { AccountContext } from "./accountContext";
// import axios from 'axios';
// import { Link } from "react-router-dom"


// const AddProduct = () => {
// //const { switchToSignup } = useContext(AccountContext);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/login', {
//         email,
//         password,
//       });

//       localStorage.setItem('authToken', response.data.token);
//       window.location.href = '/dashboard';
//     }
//      catch (error) {
//       console.error(error);
//       alert('Invalid email or password');
//     }
//   };
//   return (
//     <BoxContainer classname="col-sum-6">
//       <FormContainer>
//         <Input  type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//         <Input  type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
//       </FormContainer>
//       <Marginer direction="vertical" margin={10} />
//       <MutedLink href="/">Forget your password?</MutedLink>
//       <Marginer direction="vertical" margin="1.6em" />
//       <SubmitButton type="submit" ><Link to='/Admin'class="link" >Login</Link></SubmitButton>
//       <Marginer direction="vertical" margin="1em" />
//       <MutedLink href="#">
//         Don't have an accoun?{" "}
//         <BoldLink href="#" >
//           Signup
//         </BoldLink>
//       </MutedLink>
//       <MutedLink href="/">
//        Go Back To Home Page?{" "}
//         <BoldLink href="/" >
//           Back
//         </BoldLink>
//       </MutedLink>
//     </BoxContainer>
// );
// }


// export default AddProduct;
