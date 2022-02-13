import Logo from "assets/images/yasalamlogo.png";
import useToggle from "hooks/useToggle";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HamburgerMenu from "./menu/Menu";
import { Nav, NavContainer, NavLogo } from "./Navbar.styled";
import NavItems from "./navItem/NavItems";

const Navbar = () => {
   const [state, toggle] = useToggle();

   return (
      <Nav>
         <NavContainer>
            <Link href="/" passHref>
               <NavLogo>
                  <Image
                     src={Logo}
                     alt="YaSalam Logo"
                     layout="fixed"
                     width={24}
                     height={34}
                  />
               </NavLogo>
            </Link>

            <NavItems open={state} />
            <HamburgerMenu toggle={toggle} open={state} />
         </NavContainer>
      </Nav>
   );
};

export default Navbar;
