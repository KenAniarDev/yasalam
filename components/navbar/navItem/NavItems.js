import { useRouter } from "next/router";
import { Link } from "react-scroll";
import Links from "../../link/Links";
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
   const router = useRouter();
   return (
      <NavList open={open}>
         <NavItem>
            <Links href={"/"}>
               <a onClick={toggle}>Home</a>
            </Links>
         </NavItem>
         <NavItem>
            <Links href={"/outlets"}>
               <a onClick={toggle}>YaSalam</a>
            </Links>
         </NavItem>
         <NavItem>
            <Links href={"/experience"}>
               <a onClick={toggle}>Experience</a>
            </Links>
         </NavItem>
         <NavItem>
            <Links href={"/loyaltyReward"}>
               <a onClick={toggle}>Loyalty & Reward</a>
            </Links>
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
            {router.asPath === "/" ? (
               <Link to="buyMembership" smooth={true}>
                  <NavButton>Buy Membership</NavButton>
               </Link>
            ) : (
               <Links href="/">
                  <NavButton>Buy Membership</NavButton>
               </Links>
            )}
         </NavItem>
      </NavList>
   );
};

export default NavItems;
