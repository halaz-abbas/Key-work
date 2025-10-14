import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .matches(
      /^[A-Za-z0-9]{8,}$/,
      "Password must contain only letters and numbers"
    )
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Welcome back!");
      navigate(next || "/");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[380px] text-left"
    >
      <h2 className="text-[36px] leading-[30px] tracking-[0.5px] font-medium font-inter mb-2">
        Log in to Exclusive
      </h2>
      <p className="text-[16px] leading-[24px] font-normal font-poppins text-gray-500 mb-6">
        Enter your details below
      </p>

      <input
        type="email"
        placeholder="Email or Phone Number"
        {...register("email")}
        className="mb-4 w-full px-0 py-2 border-b border-gray-400 focus:outline-none focus:border-black bg-white"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="mb-4 w-full px-0 py-2 border-b border-gray-400 focus:outline-none focus:border-black bg-white"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
      )}

      <div className="flex justify-between items-center mt-4 mb-6 text-sm">
        <button
          type="submit"
          className="border border-red bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Log In
        </button>
        <Link to="/forgot-password" className="text-red-500 underline">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
