import Navbar from "components/navbar/Navbar";
import React from "react";
import Footer from "./footer/Footer";

const NavFooter = ({ children }) => {
   return (
      <>
         <Navbar />
         {children}
         <Footer />
      </>
   );
};

export default NavFooter;
