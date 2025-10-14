import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center  px-10 pt-1 pb-2 text-center bg-white">
      <div className="w-full px-6 pt-0 text-sm text-gray-500 text-left">
        <Link to="/" className="text-black hover:underline">
          Home
        </Link>{" "}
        / 404 Error
      </div>

      <h1 className="text-[60px] sm:text-[80px] font-bold text-black-500 leading-none mb-2 pt-20 ">
        404 Not Found
      </h1>

      <p className="text-gray-600 mb-6 max-w-[90%] sm:max-w-md text-sm sm:text-base">
        Your visited page not found. You may go home page.
      </p>

      <Link
        to="/"
        className="bg-red-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded hover:bg-red-600 transition-colors text-sm font-medium"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
