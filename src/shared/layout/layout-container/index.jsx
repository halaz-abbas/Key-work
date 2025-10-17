import Navbar from "../navbar";
import Footer from "../footer";
import { useState, useEffect } from "react";
import SearchModal from "../../../features/search/components/SearchS";
import { SearchSlashIcon } from "lucide-react";
import SearchS from "../../../features/search/components/SearchS";
export default function LayoutContainer({ children }) {

const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);
return (
<> 
<Navbar /> 
<div className="flex-1 flex flex-col min-h-screen bg-white"> 
  <main className="flex-grow pt-[0px]"> 
    {children} 
    <SearchS
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
    </main> 
    <Footer /> 
    </div> 
    </> 
    ); 
  }