import React from "react";
import imgsend from "../../../assets/icon-send.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full mt-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
       
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-inter">Exclusive</h3>
            <h4 className="text-xl font-poppins">Subscribe</h4>
            <p className="text-sm font-poppins">Get 10% off your first order</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 transtion-colors">
                <img src={imgsend} alt="Send" className="w-4 h-4" />
              </button>
            </div>
          </div>

       
          <div className="space-y-4">
            <h3 className="text-2xl font-poppins">Support</h3>
            <p className="text-sm font-poppins">III Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p className="text-sm font-poppins">exclusive@gmail.com</p>
            <p className="text-sm font-poppins">+88015-88888-9999</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-poppins">Account</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">My Account</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">Login / Register</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">Cart</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">Wishlist</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">Shop</a></li>
            </ul>
          </div>

        
          <div className="space-y-4">
            <h3 className="text-2xl font-poppins">Quick Link</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">Terms Of Use</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-gray-300 font-poppins text-white">Contact</a></li>
            </ul>
          </div>

       
          <div className="space-y-4">
            <h3 className="text-2xl font-poppins">Download App</h3>
            <p className="text-[12px] text-[#FAFAFA] font-poppins">Save $3 with App New User Only</p>
            <div className="flex gap-4">
            
              <div className="w-[64px] h-[64px] bg-white flex items-center justify-center">
                <img src="../../../assets/Qr Code.png" alt="QR Code" className="w-full h-full" />
              </div>
            
              <div className="flex flex-col gap-2">
                <img src="../../../assets/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo (2).png" alt="Google Play" className="w-[120px] h-auto" />
                <img src="../../../assets/AppStore.png" alt="App Store" className="w-[120px] h-auto" />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <img src="../../../assets/Icon-Facebook.png" alt="Facebook" className="w-6 h-6" />
              <img src="../../../assets/Icon-Twitter.png" alt="Twitter" className="w-6 h-6" />
              <img src="../../../assets/icon-instagram.png" alt="Instagram" className="w-6 h-6" />
              <img src="../../../assets/Icon-Linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </div>
          </div>
        </div>

      
        <div className="border-t border-gray-600 mb-6"></div>

      
        <div className="text-center text-gray-500 text-sm font-poppins">
          © Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;