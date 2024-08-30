import React from "react";
import styled from "styled-components";

export const BoxContainer = styled.div`
  margin: 0;
    padding:0;
    box-sizing: border-box;
    background: url('../data/bg6.jpg') no-repeat;
    font-family: "Poppins", sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      
      /* margin-right: 10%;
      justify-content: right; */
      background-size: cover;
      background-position: center;
`;

export const FormContainer = styled.form`
 font-family: "Poppins", sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      
      /* margin-right: 10%;
      justify-content: right; */
      background-size: cover;
      background-position: center;
`;

export const MutedLink = styled.a`
  font-size: 12px;
  color: #333;
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color:#1eb2a6;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
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

export const SubmitButton = styled.button`
  width: 50%;
  padding: 11px 40%;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #03C9D7;
 

  &:hover {
    filter: brightness(1.03);
  }
`;



