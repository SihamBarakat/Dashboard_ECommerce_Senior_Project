// src/Login.js

//1920  427.5 


// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import AuthContext from '../contexts/AuthContext'



// function Login() {

//   const {loginUser} = useContext(AuthContext)
//   const handleSubmit = e => {
//     e.preventDefault()
//     const email = e.target.email.value
//     const password = e.target.password.value

//     email.length > 0 && loginUser(email, password)

//     console.log(email)
//     console.log(password)
   
//   }

//   return (
//     <div>
//       <>
//   <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
//     <div className="container py-5 h-100">
//       <div className="row d-flex justify-content-center align-items-center h-100">
//         <div className="col col-xl-10">
//           <div className="card" style={{ borderRadius: "1rem" }}>
//             <div className="row g-0">
//               <div className="col-md-6 col-lg-5 d-none d-md-block">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
//                   alt="login form"
//                   className="img-fluid"
//                   style={{ borderRadius: "1rem 0 0 1rem" }}
//                 />
//               </div>
//               <div className="col-md-6 col-lg-7 d-flex align-items-center">
//                 <div className="card-body p-4 p-lg-5 text-black">
//                   <form onSubmit={handleSubmit}>
//                     <div className="d-flex align-items-center mb-3 pb-1">
//                       <i
//                         className="fas fa-cubes fa-2x me-3"
//                         style={{ color: "#ff6219" }}
//                       />
//                       <div className="d-flex align-items-center mb-3 pb-1">
//                         <i
//                           className="fas fa-cubes fa-2x me-3"
//                           style={{ color: "#ff6219" }}
//                         />
//                         <span className="h2 fw-bold mb-0">Welcome back 👋</span>
//                       </div>
//                     </div>
//                     <h5
//                       className="fw-normal mb-3 pb-3"
//                       style={{ letterSpacing: 1 }}
//                     >
//                       Sign into your account
//                     </h5>
//                     <div className="form-outline mb-4">
//                       <input
//                         type="email"
//                         id="form2Example17"
//                         className="form-control form-control-lg"
//                         name='email'
//                       />
//                       <label className="form-label" htmlFor="form2Example17">
//                         Email address
//                       </label>
//                     </div>
//                     <div className="form-outline mb-4">
//                       <input
//                         type="password"
//                         id="form2Example27"
//                         className="form-control form-control-lg"
//                         name='password'
//                       />
//                       <label className="form-label" htmlFor="form2Example27">
//                         Password
//                       </label>
//                     </div>
//                     <div className="pt-1 mb-4">
//                       <button
//                         className="btn btn-dark btn-lg btn-block"
//                         type="submit"
//                       >
//                         Login
//                       </button>
//                     </div>
//                     <a className="small text-muted" href="#!">
//                       Forgot password?
//                     </a>
//                     <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
//                       Don't have an account?{" "}
//                       <Link to="/register" style={{ color: "#393f81" }}>
//                         Register Now 
//                       </Link>
//                     </p>
//                     <a href="#!" className="small text-muted">
//                       Terms of use.
//                     </a>
//                     <a href="#!" className="small text-muted">
//                       Privacy policy
//                     </a>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
//   <footer className="bg-light text-center text-lg-start">
//     <div
//       className="text-center p-3"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
//     >
//       © 2019 - till date Copyright:
//       <a className="text-dark" href="https://mdbootstrap.com/">
//         desphixs.com
//       </a>
//     </div>
//   </footer>
// </>

//     </div>
//   )
// }

// export default Login



import React  ,{useContext,useEffect,useState} from 'react';
import { useSignIn } from 'react-auth-kit';
import styled from 'styled-components';
import axios from 'axios';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import AuthContext from '../contexts/AuthContext'

const Login2 =  ({ setToken })=> {

  const [email, setEmail ]= useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual authentication logic
    try {
      const response = await fetch('https://89dc-37-48-153-106.ngrok-free.app/Users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Authentication Error');
      }
      const data = await response.json();
      setToken(data.token); 
      
      console.log(data.token);
      navigate('/admin');
      // Assuming the token is returned from the server
    } catch (error) {
      console.error('Authentication Error:', error);
      // Handle error (e.g., show error message)
    }
  };
  
   


  return (
    <div className='login'>
      <div className='wrapper' >
        <form action='post 'onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder='email' required />
            <MdEmail className='icon'/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='password' required />
            <FaLock className='icon'/>
          </div>
          <div className="remember-forgot">
            <label ><input type="checkbox" />Remember me</label>
            <a href='#'>Forgot Password?</a>
          </div>
          <button type='submit' >Login</button>
          <div className="register-link">
            {/* <p>Dont have an account?<a href='#'>Register</a></p> */}
          </div>
        </form>

      </div>
      </div>
  );
};

export default Login2;
//const {loginUser} = useContext(AuthContext);
  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const email = e.target.email.value
  //   const password = e.target.password.value

  //   email.length > 0 && loginUser(email, password)

  //   console.log(email)
  //   console.log(password)
   
  // }

  
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
 //const navigate = useNavigate();
  // //const 
  // const baseURL = "https://6e8b-37-48-151-120.ngrok-free.app"


    // const getCsrfToken = () => {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         const cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             const cookie = cookies[i].trim();
    //             if (cookie.substring(0, 10) === 'csrftoken=') {
    //                 cookieValue = decodeURIComponent(cookie.substring(10));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const csrfToken = getCsrfToken();

    //     try {
    //         const response = await axios.post('https://89dc-37-48-153-106.ngrok-free.app/Users/login/', {
    //             headers: {
    //                 'Content-Type': 'application/json',  
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();

    //         if (data.token) {
    //             localStorage.setItem('token', data.token);

    //             const payload = JSON.parse(atob(data.token.split('.')[1]));
    //             const userRole = payload.role;

    //             if (userRole === 'admin') {
    //                 navigate('/admin');
    //             } else if (userRole === 'SUPPLIER') {
    //                 navigate('/supplier');
    //             } else {
    //                 navigate('/unknown');
    //             }
    //         } else {
    //             alert('Login failed');
    //         }
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //         alert('An error occurred: ' + error.message);
    //     }
    // };

    // const handleLogin = async () => {
    //     try {
    //       const response = await axios.post('https://89dc-37-48-153-106.ngrok-free.app/Users/login', {
            
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
           
    //       });
        
    //       if (!response.ok) {
    //         throw new Error('Login failed');
    //       }
    
    //       const data = await response.json();
    //       localStorage.setItem('token', data.token);
    //       // Redirect or navigate to another page upon successful login
    //     } catch (error) {
    //       console.error('Login error:', error);
    //     }
    //     console.log(localStorage)
    //   };

  // const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     const response = await fetch(baseURL+'/Users/login/', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ email, password })
  //     });

  //     const data = await response.json();

  //     if (data.token) {
  //         localStorage.setItem('token', data.token);
  //        //localStorage.setItem('role', data.role);
  //         // Assuming the token is a JWT and contains a user role
  //         const payload = JSON.parse(atob(data.role.split('.')[1]));
  //         const userRole = payload.role;

  //         if (userRole === 'admin') {
  //           navigate('/admin');
  //         } else if (userRole === 'SUPPLIER') {
  //           navigate('/supplier');
  //         } 
  //         // else {
  //         //     history.push('/unknown');
  //         // }
  //     } else {
  //         alert('Login failed');
  //     }
  // };
// 

//const role1="supplier";

// const navigate  = useNavigate();
// if (role1 === 'admin') {
//   navigate('/admin');
//            } else if (role1 === 'suplier') {
//             navigate('/supplier');
//            } 

//const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('https://6e8b-37-48-151-120.ngrok-free.app/Users/admin/suppliers', {
        
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
       
  //     });
    
  //     if (!response.ok) {
  //       throw new Error('Login failed');
  //     }

  //     const data = await response.json();
  //     localStorage.setItem('token', data.token);
  //     // Redirect or navigate to another page upon successful login
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  //   console.log(localStorage)
  // };

// import React, { useState, useEffect, useContext } from "react";
//  import { MdOutlineCancel } from "react-icons/md";

//  import { Button } from "../components";
//  import { chatData } from "../data/dummy";
//  import { useStateContext } from "../contexts/ContextProvider";
//  import axios, { AxiosError } from "axios";
//  import {
//    BoldLink,
//    BoxContainer,
//    FormContainer,
//    Input,
//    MutedLink,
//    SubmitButton,
//  } from "./common";
//  import { useSignIn } from "react-auth-kit";
//  import { useFormik } from "formik";
//  import { Marginer } from "../components/Marginer";
//  import { Link } from "react-router-dom";
//  import styled from "styled-components";
//  import avatar from "../data/avatar.jpg";
//  import { userProfileData } from "../data/dummy";
//  //import CategoryList from'./CategoryList'
//  import { MdOutlineAddCircleOutline } from "react-icons/md";
//  import { TooltipComponent } from "@syncfusion/ej2-react-popups";
//  //import UserProfile from './UserProfile'
//  const Login = () => {
  //  var url ="https:36bb-37-48-177-73.ngrok-free.app"
  //  const { switchToSignup } = useContext(AccountContext);
  //   const { currentColor } = useStateContext();
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
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const ProceedLogin = (e) => {
  //     e.preventDefault();
  //     if (validate()) {
  //       console.log("proceed");
  //     }
  //   };
  //   const validate = () => {
  //     let result = true;
  //     if (email === "" || email === null) {
  //       result = false;
  //       toast.warring('please enter email');
  //     }
  //     if (password === "" || password === null) {
  //       result = false;
  //       toast.warring('please enter password');
  //     }
  //     return result;
  //   };
  //   const emailupdate = () => {};
  //   const passwordupdate = () => {};
  //  var url ="https:36bb-37-48-177-73.ngrok-free.app"
  //  const [error, setError] = useState("");
  //  const signIn = useSignIn();
  //  const onSubmit = async (values: any) => {
  //    console.log("Values: ", values);
  //    setError("");

  //    try {
  //      const response = await axios.post(
  //        "$url/Users/login/",
  //        values
  //      );

  //      signIn({
  //        token: response.data.token,
  //        expiresIn: 3600,
  //        tokenType: "Bearer",
  //        authState: { email: values.email },
  //      });
  //    } catch (err) {
  //      if (err && err instanceof AxiosError)
  //        setError(err.response?.data.message);
  //      else if (err && err instanceof Error) setError(err.message);

  //      console.log("Error: ", err);
  //    }
  //  };

  //  const formik = useFormik({
  //    initialValues: {
  //      email: "",
  //      password: "",
  //    },
  //    onSubmit,
  //  });
  //  return (
  //    <>
       {/* <div className="nav-item absolute right-60 top-24 bg-[#bbbbbd] dark:bg-[#42464D] p-8 rounded-lg w-96">
         <div className="flex justify-between items-center">
           <p className="font-semibold text-lg dark:text-gray-200">Login</p>
           <Button
             icon={<MdOutlineCancel />}
             color="rgb(153, 171, 180)"
             bgHoverColor="light-gray"
             size="2xl"
             borderRadius="50%"
           />
         </div>
         <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
           <BoxContainer classname="col-sum-6">
             <FormContainer onSubmit={e.handleSubmit}>
               <Input
                 type="email"
                 value={e.values.email}
               onChange={e.handleChange}
                 placeholder="Email"
                 clearOnEscape
                 required
               />
               <Input
                 type="password"
                 value={e.values.password}
                 onChange={e.handleChange}
                 clearOnEscape
                 placeholder="Password"
                 required
               />
             </FormContainer>
             <Marginer direction="vertical" margin={10} />
             <Marginer direction="vertical" margin="1.6em" />
             <SubmitButton type="submit">
               <Link to="/dashAdminn" class="link" isLoading={formik.isSubmitting} >
                 Login
               </Link>
             </SubmitButton>
             <Marginer direction="vertical" margin="1em" />
           </BoxContainer>
         </div>

         <div className="mt-5">
          
         </div>
       </div> */}
//      </>
//    );
//  };

//  export default Login;












// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// //import Login, { Render } from 'react-login-page';
// import Logo from 'react-login-page/logo';

// const Login = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [passwordError, setPasswordError] = useState('')

//   const navigate = useNavigate()

//   const onButtonClick = () => {
//     // You'll update this function later...
//   }

//   return (
//     <div className={'mainContainer'}>
//       <div className={'titleContainer'}>
//         <div>Login</div>
//       </div>
//       <br />
//       <div className={'inputContainer'}>
//         <input
//           value={email}
//           placeholder="Enter your email here"
//           onChange={(ev) => setEmail(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{emailError}</label>
//       </div>
//       <br />
//       <div className={'inputContainer'}>
//         <input
//           value={password}
//           placeholder="Enter your password here"
//           onChange={(ev) => setPassword(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{passwordError}</label>
//       </div>
//       <br />
//       <div className={'inputContainer'}>
//         <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
//       </div>
//     </div>
//   );
// };
// export default Login;












// import { Button } from "baseui/button";
// import { Input } from "baseui/input";
// import styled from "styled-components";
// import {
//   HeadingXXLarge,
//   HeadingXLarge,
//   HeadingLarge,
//   HeadingMedium,
//   HeadingSmall,
//   HeadingXSmall,
// } from "baseui/typography";
// import {
//   Container,
//   ErrorText,
//   InnerContainer,
//   InputWrapper,
//   StyledInput,
// } from "./common";

// import { useSignIn } from "react-auth-kit";
// import { useFormik } from "formik";
// import axios, { AxiosError } from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login(props: any) {
//   //var url ="https://36bb-37-48-177-73.ngrok-free.app"
//   const [error, setError] = useState("");
//   const signIn = useSignIn();

//   const onSubmit = async (values: any) => {
//     console.log("Values: ", values);
//     setError("");

//     try {
//       const response = await axios.post(
//         "https://36bb-37-48-177-73.ngrok-free.app/Users/login/",
//         values
//       );

//       signIn({
//         token: response.data.token,
//         expiresIn: 3600,
//         tokenType: "Bearer",
//         authState: { email: values.email },
//       });
//     } catch (err) {
//       if (err && err instanceof AxiosError)
//         setError(err.response?.data.message);
//       else if (err && err instanceof Error) setError(err.message);

//       console.log("Error: ", err);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     onSubmit,
//   });

//   return (
//     <Container>
//       <InnerContainer>
//         <form onSubmit={formik.handleSubmit}>
//           <HeadingXXLarge>Welcome Back!</HeadingXXLarge>
//           <ErrorText>{error}</ErrorText>
//           <InputWrapper>
//             <StyledInput
//               name="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               placeholder="Email"
//               clearOnEscape
//               size="large"
//               type="email"
//             />
//           </InputWrapper>
//           <InputWrapper>
//             <StyledInput
//               name="password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               placeholder="Password"
//               clearOnEscape
//               size="large"
//               type="password"
//             />
//           </InputWrapper>
//           <InputWrapper>
//             <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
//               Login
//             </Button>
//           </InputWrapper>
//         </form>
//       </InnerContainer>
//     </Container>
//   );
// }

// export { Login };





















//