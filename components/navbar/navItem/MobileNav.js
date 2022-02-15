import Link from "next/link";
import React from "react";
import { NavItem } from "./NavItems.styled";

const MobileNav = ({ toggle }) => {
   return (
      <>
         <NavItem>
            <Link href="/about-us">
               <a onClick={toggle}>About Us</a>
            </Link>
         </NavItem>
         <NavItem>
            <Link href="/contact-us">
               <a onClick={toggle}> Contact Us</a>
            </Link>
         </NavItem>
         <NavItem>
            <Link href="/terms">
               <a onClick={toggle}>Terms and Conditions</a>
            </Link>
         </NavItem>
         <NavItem>
            <Link href="/privacy">
               <a onClick={toggle}>Privacy Policy</a>
            </Link>
         </NavItem>
      </>
   );
};

export default MobileNav;
