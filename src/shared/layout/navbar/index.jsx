import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { useCartStore } from "../../../features/cart/store/cartStore";
import { useWishlistStore } from "../../../features/wishlist/store/wishlistStore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import img from "../../../assets/wishlist (2).png";
import img3 from "../../../assets/Cart1@2x.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { cart } = useCartStore();
  const wishlistCount = useWishlistStore(
    (state) => state.wishlist?.length || 0
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const hideIconsPages = ["/login", "/signup"];
  const shouldHideIcons = hideIconsPages.includes(location.pathname);

  // Fetch search results (mobile and desktop)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      const fetchResults = async () => {
        try {
          const res = await fetch("https://api.escuelajs.co/api/v1/products");
          const data = await res.json();
          const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filtered.slice(0, 5));
        } catch (err) {
          console.error("Search error:", err);
        }
      };

      fetchResults();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
    setSearchQuery("");
    setSearchResults([]);
    setShowMobileSearch(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        {/* Top Banner */}
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

              {/* Desktop Search Input */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search.. (press /)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-3 py-2 text-sm bg-[#F5F5F5] font-poppins border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                {searchQuery && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md mt-1 z-50">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-3"
                      >
                        <img
                          src={item.image || "/placeholder.png"}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="truncate">
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-gray-500 text-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Icons + Mobile Search Icon */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Mobile Search Icon */}
                <div className="md:hidden flex items-center relative">
                  <button
                    onClick={() => setShowMobileSearch((prev) => !prev)}
                    className="p-1 rounded bg-gray-200"
                  >
                    <Search size={20} />
                  </button>
                </div>

                {/* Wishlist */}
                {!shouldHideIcons && (
                  <>
                    <Link
                      to="/wishlist"
                      className="relative p-1 sm:p-2 text-gray-600 hover:text-black bg-transparent"
                    >
                      <img src={img} className="h-5 w-5 sm:h-6 sm:w-6" />
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
                      <img src={img3} className="h-5 w-5 sm:h-6 sm:w-6" />
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
                  </>
                )}

                {/* Mobile Menu */}
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

          {/* Mobile Search Input + Popup */}
          {showMobileSearch && (
            <div className="md:hidden w-full px-4 py-2 bg-white border-b relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F5F5F5] font-poppins border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />

              {/* Search Popup */}
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md mt-1 z-50">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-3"
                    >
                      <img
                        src={item.image || "/placeholder.png"}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="truncate">
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-gray-500 text-xs">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Links */}
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
