import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useCartStore } from "../../../features/cart/store/cartStore";
import { useWishlistStore } from "../../../features/wishlist/store/wishlistStore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import img from "../../../assets/wishlist (2).png";
import img2 from "../../../assets/search (1).png";
import img3 from "../../../assets/Cart1@2x.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCartStore();
  const wishlistCount = useWishlistStore(
    (state) => state.wishlist?.length || 0
  );
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const hideIconsPages = ["/login", "/signup"];
  const shouldHideIcons = hideIconsPages.includes(location.pathname);

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <div className="bg-black text-white w-full">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-10 sm:h-12 gap-1 sm:gap-2">
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-[14px] font-poppins font-normal whitespace-nowrap">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF
                50%!
              </span>

              <Link
                to="/products"
                className="text-[10px] sm:text-xs md:text-sm font-poppins font-semibold underline hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Shop Now
              </Link>

              <select className="bg-black text-white text-[12px] pl-3 sm:text-xs md:text-sm font-poppins border-none outline-none cursor-pointer ml-2">
                <option value="en">English</option>
              </select>

              <img
                src="./src/assets/down-arrow.png"
                alt="Arrow"
                className="ml-1 h-2 w-3 sm:h-2 sm:w-3"
              />
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="border-b bg-white w-full">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-inter text-black">
                    Exclusive
                  </h1>
                </Link>
              </div>

              {/* Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-black px-3 py-2 text-sm font-poppins font-medium border-b-2 border-black"
                >
                  Home
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-black px-3 py-2 text-sm font-poppins font-medium"
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-black px-3 py-2 text-sm font-poppins font-medium"
                >
                  About
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-black px-3 py-2 text-sm font-poppins font-medium"
                >
                  Sign Up
                </Link>
              </div>

              {/* Search + Icons */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search.. (press /)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-28 sm:w-48 md:w-64 px-2 sm:px-3 md:px-4 py-1 sm:py-2 pr-8 text-xs sm:text-sm bg-[#F5F5F5] font-poppins border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <img
                      src={img2}
                     
                      className="h-7 w-7 sm:h-5 sm:w-4"
                    />
                  </div>
                </div>

                {!shouldHideIcons && (
                  <>
                    {/* Wishlist */}
                    <Link
                      to="/wishlist"
                      className="relative p-1 sm:p-2 text-gray-600 hover:text-black bg-transparent"
                    >
                      <img
                        src={img}
                       
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        style={{ background: "transparent" }}
                      />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full px-1">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    {/* Cart */}
                    <Link
                      to="/cart"
                      className="relative p-1 sm:p-2 text-gray-600 hover:text-black"
                    >
                      <img
                        src={img3}
                       
                        className="h-5 w-5 sm:h-6 sm:w-6"
                      />
                      {cart && cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full px-1">
                          {cart.length}
                        </span>
                      )}
                    </Link>

                    {/* Profile */}
                    <button
                      onClick={() => setShowProfileMenu((prev) => !prev)}
                      className="p-1 sm:p-2 text-gray-600 hover:text-black bg-transparent rounded"
                      aria-label="Profile"
                    >
                      <PersonOutlineIcon style={{ fontSize: 25 }} />
                    </button>

                    {showProfileMenu && (
                      <div className="absolute top-14 right-4 w-56 bg-gradient-to-b from-gray-700 to-gray-400 text-white rounded-lg shadow-lg p-4 z-50 space-y-3 font-poppins text-sm">
                        <Link
                          to="/account"
                          className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                        >
                          <img
                            src="\imges\user.png"
                            alt="Account"
                            className="w-5 h-5"
                          />
                          <span>Manage My Account</span>
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                        >
                          <img
                            src="\imges\Group.png"
                            alt="Orders"
                            className="w-5 h-5"
                          />
                          <span>My Order</span>
                        </Link>
                        <Link
                          to="/cancellations"
                          className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                        >
                          <img
                            src="\imges\icon-cancel.png"
                            alt="Cancellations"
                            className="w-5 h-5"
                          />
                          <span>My Cancellations</span>
                        </Link>
                        <Link
                          to="/reviews"
                          className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                        >
                          <img
                            src="\imges\Icon-Reviews.png"
                            alt="Reviews"
                            className="w-5 h-5"
                          />
                          <span>My Reviews</span>
                        </Link>
                        <button
                          onClick={() => {
                            localStorage.removeItem("user");
                            setShowProfileMenu(false);
                            navigate("/login");
                          }}
                          className="flex items-center gap-3 w-full text-left text-white hover:text-white/80 transition-colors bg-transparent p-0"
                        >
                          <img
                            src="\imges\Vector (1).png"
                            alt="Logout"
                            className="w-5 h-5"
                          />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-white p-1 rounded"
                  >
                    {isMenuOpen ? (
                      <X size={24} color="black" />
                    ) : (
                      <Menu size={24} color="black" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t px-3 py-3 space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-black"
              >
                Home
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-black"
              >
                Contact
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-black"
              >
                About
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
