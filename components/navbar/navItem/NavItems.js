import Link from "next/link";
import MobileNav from "./MobileNav";
import {
   DropDown,
   DropDownIcon,
   DropDownList,
   DropDownText,
   MobileNavContainer,
   NavButton,
   NavItem,
   NavList,
} from "./NavItems.styled";

const NavItems = ({ open }) => {
   return (
      <NavList open={open}>
         <NavItem>
            <Link href="/">Home</Link>
         </NavItem>
         <NavItem>
            <Link href="/outlets">YaSalam</Link>
         </NavItem>
         <NavItem>
            <Link href="/experience">Experience</Link>
         </NavItem>
         <NavItem>
            <Link href="/loyalty-reward">Loyalty & Reward</Link>
         </NavItem>
         <DropDown>
            <DropDownText tabIndex="0">
               More
               <DropDownIcon />
            </DropDownText>
            <DropDownList tabIndex="0">
               <MobileNav />
            </DropDownList>
         </DropDown>
         <MobileNavContainer>
            <MobileNav />
         </MobileNavContainer>

         <NavItem>
            <Link href="/buy-membership" passHref>
               <NavButton>Buy Membership</NavButton>
            </Link>
         </NavItem>
      </NavList>
   );
};

export default NavItems;
