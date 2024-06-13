// src/Login.js

//1920  427.5 
import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import styled from 'styled-components';
import axios from 'axios';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
const Login = () => {
  // const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  //   const history = useNavigate();

  //   const handleLogin = async (e) => {
  //       e.preventDefault();
  //       const response = await fetch('http://localhost:8000/api/login/', {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ username, password }),
  //       });

  //       const data = await response.json();
  //       if (data.success) {
  //           history.push(data.redirectUrl);
  //       } else {
  //           alert('Login failed: ' + data.message);
  //       }
  //   };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //const 
  const baseURL = "https://6e8b-37-48-151-120.ngrok-free.app"


    const getCsrfToken = () => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, 10) === 'csrftoken=') {
                    cookieValue = decodeURIComponent(cookie.substring(10));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const csrfToken = getCsrfToken();

        try {
            const response = await fetch(baseURL+'/Users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);

                const payload = JSON.parse(atob(data.token.split('.')[1]));
                const userRole = payload.role;

                if (userRole === 'admin') {
                    navigate('/admin');
                } else if (userRole === 'user') {
                    navigate('/user');
                } else {
                    navigate('/unknown');
                }
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred: ' + error.message);
        }
    };
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
// const role1="supplier";

// const navigate  = useNavigate();
// if (role1 === 'admin') {
//   navigate('/admin');
//            } else if (role1 === 'suplier') {
//             navigate('/supplier');
//            } 
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
          <button type='submit'>Login</button>
          <div className="register-link">
            {/* <p>Dont have an account?<a href='#'>Register</a></p> */}
          </div>
        </form>

      </div>
      </div>
  );
};

export default Login;




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