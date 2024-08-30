import React, { useContext, useEffect, useState } from "react";
import { useSignIn } from "react-auth-kit";
import styled from "styled-components";
import axios from "axios";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual authentication logic
    try {
      const response = await fetch(
        "https://donkey-casual-python.ngrok-free.app/Users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();
      setToken(data.token);
      if (data.token) {
        localStorage.setItem("token", data.token);

        const payload = JSON.parse(atob(data.token.split(".")[1]));
        const userRole = payload.role;

        if (data.role === "ADMIN") {
          navigate("/dashAdminn");
        }
        if (data.role === "SUPPLIER") {
          navigate("/dashSupplier");
        }
      }
      console.log(data.token);
      console.log(data.role);
      // navigate("/admin");
      // Assuming the token is returned from the server
    } catch (error) {
      console.error("Authentication Error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form action="post " onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-forgot">
            {/* <label ><input type="checkbox" />Remember me</label> */}
            <button type="submit">Login</button>
          </div>

          <div className="register-link">
            <a href="/signup">Signup</a>
            {/* <p>Dont have an account?<a href='#'>Register</a></p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
