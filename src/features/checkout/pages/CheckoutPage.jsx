import React, { useState } from "react";
import { useCartStore } from "../../cart/store/cartStore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CheckoutPage = () => {
  const { cart, clearCart } = useCartStore();

  console.log("محتوى السلة:", cart);

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("You must be logged in to access checkout");
      navigate("/login?next=/checkout");
    }
  }, []);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/order-success");

    clearCart();
    toast.success("Order placed successfully!");
    navigate("/order-success");
  };

  return (
    <div className="bg-white min-h-screen pt-0 px-4 lg:px-24 max-w-screen-xl mx-auto ">
      <div className="text-sm text-gray-500 mb-6 text-left relative top-[-60px]">
        <Link to="/" className="text-black hover:underline">
          Account
        </Link>{" "}
        /
        <Link to="/login" className="text-black hover:underline">
          My Account
        </Link>{" "}
        /
        <Link to="/products" className="text-black hover:underline">
          Product
        </Link>{" "}
        /
        <Link to="/cart" className="text-black hover:underline">
          View Cart
        </Link>{" "}
        /<span>Checkout</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[470px] flex flex-col gap-6">
          <h2 className="text-[24px] font-medium mb-2">Billing Details</h2>
          <form className="flex flex-col gap-6">
            {[
              { label: "First Name*", type: "text" },
              { label: "Company Name", type: "text" },
              { label: "Street Address*", type: "text" },
              { label: "Apartment, floor, etc. (optional)", type: "text" },
              { label: "Town/City*", type: "text" },
              { label: "Phone Number*", type: "text" },
              { label: "Email Address*", type: "email" },
            ].map((field, index) => (
              <div key={index} className="flex flex-col items-start gap-1">
                <label className="text-sm text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  className="w-full bg-[#f7f7f7] border border-gray-300 py-2 px-3 rounded focus:outline-none"
                />
              </div>
            ))}
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" className="accent-red-500" />
              <span className="text-sm text-gray-600">
                Save this information for faster check-out next time
              </span>
            </label>
          </form>
        </div>

        <div className="w-full lg:w-[480px] h-fit flex flex-col gap-4 p-6 rounded-md mt-6 lg:mt-[60px] lg:ml-[40px] bg-[#f9f9f9]">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 text-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.image ||
                    (item.images && item.images[0]) ||
                    item.thumbnail ||
                    item?.images?.[0]?.url ||
                    "/placeholder.png"
                  }
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                  alt={item.title || "Product"}
                  className="w-14 h-14 object-cover rounded"
                />

                <span className="text-gray-800">{item.title}</span>
              </div>
              <span className="text-gray-700 font-medium">
                {`$${(item.price * (item.quantity || 1)).toFixed(2)}`}
              </span>
            </div>
          ))}

          <div className="flex justify-between mb-2 text-sm font-medium text-gray-800">
            <span>Subtotal</span>
            <span>{`$${subtotal.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between mb-2 text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total</span>
            <span>{`$${total.toFixed(2)}`}</span>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  className="w-4 h-4 accent-red-500"
                />
                <span className="text-sm text-gray-800">Bank</span>
              </label>

              <div className="flex gap-2 pr-1">
                <img src="\imges\image 30.png" alt="Visa" className="w-6 h-4" />
                <img
                  src="\imges\image 31.png"
                  alt="MasterCard"
                  className="w-6 h-4"
                />
                <img
                  src="\imges\image 32.png"
                  alt="PayPal"
                  className="w-6 h-4"
                />
                <img
                  src="\imges\image 33.png"
                  alt="PayPal"
                  className="w-6 h-4"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cash"
                className="w-4 h-4 accent-red-500"
                defaultChecked
              />
              <span className="text-sm text-gray-800">Cash on delivery</span>
            </label>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon Code"
              className="bg-white w-2/3 border border-gray-300 py-2 px-3 rounded focus:outline-none"
            />
            <button
              type="button"
              className="w-1/3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
              onClick={() => toast.success("Coupon applied!")}
            >
              Apply Coupon
            </button>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 text-sm"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
