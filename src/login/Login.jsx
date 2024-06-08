
import React,{  useState, useEffect, useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';


import { Button } from '../components';
import { chatData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { BoldLink, BoxContainer, FormContainer,  Input, MutedLink, SubmitButton,} from "./common";
import { Marginer } from "../components/Style";
import { Link } from "react-router-dom"
import styled from "styled-components";
import avatar from '../data/avatar.jpg';
import { userProfileData } from '../data/dummy';
//import CategoryList from'./CategoryList'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
//import UserProfile from './UserProfile'
const Login = () => {
  //const { switchToSignup } = useContext(AccountContext);
  const { currentColor } = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      window.location.href = '/dashboard';
    }
     catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };
  return (

<>

    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
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
      <FormContainer>
        <Input  type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  placeholder="Email" required />
        <Input  type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}className="pt-2" placeholder="Password" required/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="/">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" ><Link to='/customers'class="link" >Login</Link></SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      
    </BoxContainer>
      
    </div>
    
    <div className="mt-5">
      {/* <Button
        color="white"
        bgColor={currentColor}
        text="Logout"
        borderRadius="10px"
        width="full"
      /> */}
    </div>
  </div>


    </>
  );
   
};

export default Login;









