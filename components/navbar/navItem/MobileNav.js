import Link from "next/link";
import React from "react";
import { NavItem } from "./NavItems.styled";

const MobileNav = () => {
   return (
      <>
         <NavItem>
            <Link href="/about-us">About Us</Link>
         </NavItem>
         <NavItem>
            <Link href="/contact-us">Contact Us</Link>
         </NavItem>
         <NavItem>
            <Link href="/terms">Terms and Conditions</Link>
         </NavItem>
         <NavItem>
            <Link href="/privacy">Privacy Policy</Link>
         </NavItem>
      </>
   );
};

export default MobileNav;
