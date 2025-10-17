import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import signupVisual from "/src/assets/SideImage.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // التحقق من الحقول
  const schema = yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email("Email not valid").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("https://api.escuelajs.co/api/v1/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: "https://i.imgur.com/5cLDeiM.png",
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Error creating account:", err);
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white pt-20">
      {/* الصورة الجانبية */}
      <div className="lg:w-1/2 flex justify-center items-start p-8 relative top-[-150px]">
        <img src={signupVisual} alt="Visual" className="w-[800px] h-auto" />
      </div>

      {/* النموذج */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 relative top-[-120px]">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full max-w-[400px]"
        >
          <h2 className="text-3xl font-medium mb-2">Create an account</h2>
          <p className="text-gray-500 mb-6">Enter your info below</p>

          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="w-full bg-[#fafafa] border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full bg-[#fafafa] border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full bg-[#fafafa] border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-500 text-white py-2 rounded-md mt-4 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-red-600"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <button
            type="button"
            className="w-full border border-gray-400 py-2 rounded-md mt-3 flex items-center justify-center gap-2 bg-[#f9f9f9] hover:bg-[#f1f1f1] transition"
          >
            <img src="/images/Icon-Google.png" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
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
