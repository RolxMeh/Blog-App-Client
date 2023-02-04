import React, { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../store/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });
  const { setAuthState } = useContext(AuthContext);

  const formInput = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const login = () => {
    Axios.post("http://localhost:4000/auth/login", {
      username: loginInput.username,
      password: loginInput.password,
    }).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="bg-[#202020] w-full h-screen flex justify-center items-center">
      <div className="w-80 flex flex-col border-2 p-10">
        <input
          type="text"
          onChange={formInput}
          value={loginInput.username}
          name="username"
          placeholder="Username"
          className="mb-5 pl-2 rounded-lg outline-none"
        />
        <input
          type="password"
          onChange={formInput}
          value={loginInput.value}
          name="password"
          placeholder="Password"
          className="mb-5 pl-2 rounded-lg outline-none"
        />
        <button type="submit" onClick={login} className=" bg-egg w-full mt-2">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
