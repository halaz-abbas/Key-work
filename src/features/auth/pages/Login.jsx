import React from "react";
import LoginForm from "../components/login/LoginForm";
import loginVisual from "/src/assets/SideImage.png";

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-[0px]  px-4 gap-12 relative top-[-70px]">
      <div className="flex-1 flex justify-start">
        <img
          src={loginVisual}
          alt="Login Visual"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[400px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
