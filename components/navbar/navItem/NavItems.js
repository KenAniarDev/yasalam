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

const NavItems = ({ open, toggle }) => {
   return (
      <NavList open={open}>
         <NavItem>
            <Link href="/">
               <a onClick={toggle}>Home</a>
            </Link>
         </NavItem>
         <NavItem>
            <Link href="/outlets">
               <a onClick={toggle}>YaSalam</a>
            </Link>
         </NavItem>
         <NavItem>
            <Link href="/experience">
               <a onClick={toggle}>Experience</a>
            </Link>
         </NavItem>
         <NavItem>
            <Link href="/loyaltyReward">
               <a onClick={toggle}>Loyalty & Reward</a>
            </Link>
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
            <MobileNav toggle={toggle} />
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
