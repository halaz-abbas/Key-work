import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Phone is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Contact form submitted:", data);
    reset();
  };

  return (
    <>
      <div className="relative top-[-50px]">
        <div className="max-w-[1440px] mx-auto px-11 pt-0 relative tpo-[-10px]">
          <nav className="text-sm text-gray-500 text-left">
            <Link to="/" className="hover:underline text-black">
              Home
            </Link>{" "}
            <span className="text-black font-semibold">Contact</span>
          </nav>
        </div>
      </div>
      <section className="max-w-[1440px] mx-auto px-4 py-12 pt-5  grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6 border border-gray-300 rounded-lg p-6">
          <div className="flex items-center gap-3 pl-10">
            <img
              src="/src/assets/icons-phone@2x.png"
              alt="Call Icon"
              className="w-9 h-9"
            />
            <h2 className="font-[Poppins] font-medium text-[16px] leading-[24px] tracking-[0] text-gray-800">
              Call To Us
            </h2>
          </div>

          <div className="pl-9">
            <p className="text-gray-800 text-left pl-10">
              We are available 24/7, 7 days a week.
            </p>
            <div className="my-4"></div>
            <p className="text-gray-800 font-medium text-left pl-10">
              Phone: +8801812222222
            </p>
          </div>

          <div className="my-4 border-t border-gray-300"></div>

          <div className="flex items-center gap-3 pl-10">
            <img
              src="/src/assets/icons-mail.png"
              alt="Mail Icon"
              className="w-10 h-10"
            />
            <h2 className="font-[Poppins] font-medium text-[16px] leading-[24px] tracking-[0] text-gray-800">
              Write To Us
            </h2>
          </div>

          <p className="text-gray-800 ">
            Fill out our form and we will contact
          </p>

          <p className="text-gray-800 ">you within 24 hours.</p>
          <p className="text-gray-800 font-medium ">customer@exclusive.com</p>
          <p className="text-gray-800 font-medium ">support@exclusive.com</p>
        </div>

        <div className="flex flex-col gap-6 border border-gray-300 rounded-lg p-6 pt-20 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  {...register("name")}
                  placeholder="Your Name"
                  className=" w-full md:flex-1 bg-[#f3f3f3] text-gray-800  px-4 py-2 rounded focus:outline-none focus:ring-2 "
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}

                <input
                  {...register("email")}
                  placeholder="Your Email"
                  className="w-full md:flex-1 bg-[#f3f3f3] text-gray-800  px-4 py-2 rounded focus:outline-none focus:ring-2 "
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}

                <input
                  {...register("phone")}
                  placeholder="Your Phone"
                  className="w-full md:flex-1 bg-[#f3f3f3] text-gray-800  px-4 py-2 rounded focus:outline-none focus:ring-2 "
                />
              </div>
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}

              <textarea
                {...register("message")}
                placeholder="Your Message"
                rows="5"
                className="w-full bg-[#f3f3f3] text-gray-800 px-4 py-2 rounded resize-none focus:outline-none focus:ring-2 "
              />
              {errors.message && (
                <span className="text-red-500 text-sm">
                  {errors.message.message}
                </span>
              )}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Send Message
                </button>
              </div>

              {isSubmitSuccessful && (
                <p className="text-green-600 mt-2">
                  Message sent successfully!
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
