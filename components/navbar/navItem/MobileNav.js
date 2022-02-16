import React from "react";
import Links from "../../link/Links";
import { NavItem } from "./NavItems.styled";

const MobileNav = ({ toggle }) => {
   return (
      <>
         <NavItem>
            <Links href={"/about-us"}>
               <a onClick={toggle}>About Us</a>
            </Links>
         </NavItem>
         <NavItem>
            <Links href={"/contact-us"}>
               <a onClick={toggle}> Contact Us</a>
            </Links>
         </NavItem>
         <NavItem>
            <Links href={"/terms"}>
               <a onClick={toggle}>Terms and Conditions</a>
            </Links>
         </NavItem>
         <NavItem>
            <Links href={"/privacy"}>
               <a onClick={toggle}>Privacy Policy</a>
            </Links>
         </NavItem>
      </>
   );
};

export default MobileNav;
