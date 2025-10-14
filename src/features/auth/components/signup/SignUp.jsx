import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import React from "react";
import { Link } from "react-router-dom";
import signupVisual from "/src/assets/SideImage.png";

const SignUp = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),

    password: yup
      .string()
      .matches(
        /^[A-Za-z0-9]{8,}$/,
        "Password must contain only letters and numbers"
      )
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          avatar: "https://i.imgur.com/5cLDeiM.png",
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Account created!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
      console.error(
        "تفاصيل الخطأ:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white pt-20 bd-8">
      <div className="lg:w-1/2 flex items-start justify-start p-8 relative top-[-175px]">
        <img
          src={signupVisual}
          alt="Shopping Visual"
          className="w-[900px] h-auto"
        />
      </div>

      <div className="lg:w-1/2 flex items-center justify-center p-8 relative top-[-140px] mb-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[380px] text-left"
        >
          <div className="mb-6">
            <h2 className="text-[36px] leading-[30px] tracking-[0.5px] font-medium font-inter mb-2">
              Create an account
            </h2>
            <p className="text-[16px] leading-[24px] font-normal font-poppins text-gray-500 mb-6">
              Enter your details below
            </p>
          </div>

          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="mb-4 w-full px-0 py-2 border-b border-gray-400 focus:outline-none focus:border-black bg-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="Email or Phone Number"
            className="mb-4 w-full px-0 py-2 border-b border-gray-400 focus:outline-none focus:border-black bg-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="mb-4 w-full px-0 py-2 border-b border-gray-400 focus:outline-none focus:border-black bg-white"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm mb-4"
          >
            Create Account
          </button>

          <button className="w-full border border-gray-400 py-2 rounded text-sm flex items-center justify-center gap-2 bg-white text-black">
            <img
              src="\imges\Icon-Google.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="text-sm text-center mt-6">
            Already have account?{" "}
            <Link to="/login" className="underline text-black">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
