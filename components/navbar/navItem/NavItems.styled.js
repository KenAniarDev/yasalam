import { RiArrowDropDownLine } from "react-icons/ri";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const NavListMobile = styled.ul`
   display: flex;
   list-style: none;

   @media (max-width: 768px) {
      flex-flow: column nowrap;
      position: fixed;
      top: 0;
      right: 0;
      padding-top: 6rem;
      background-color: #fff;
      width: ${(props) => (props.open ? "15rem" : "0")};
      white-space: nowrap;
      overflow: hidden;
      height: 100vh;
      box-shadow: -9px 4px 73px -25px rgba(48, 48, 48, 0.75);
      -webkit-box-shadow: -9px 4px 73px -25px rgba(48, 48, 48, 0.75);
      -moz-box-shadow: -9px 4px 73px -25px rgba(48, 48, 48, 0.75);
      transition: width 0.3s ease-in-out;
   }
`;

export const NavList = tw(NavListMobile)`
    md:px-2 
    md:mx-2  
    md:items-center
    md:flex-row
    ml-auto
    
`;

export const NavItem = tw.li`
    py-3
    mx-4
    md:mx-0
    md:py-0
    px-3
    text-md
    hover:text-primary
`;

export const MobileNavContainer = styled.div`
   display: none;
   @media (max-width: 768px) {
      display: block;
   }
`;

export const DropDown = tw(NavItem)`
   hidden
   md:block
   dropdown
`;

export const DropDownList = tw.ul`
    p-2 
    shadow 
    menu 
    dropdown-content 
    bg-base-100  
    w-64
`;

export const DropDownText = tw.div`
    flex
    items-center
    cursor-pointer
`;

export const DropDownIcon = tw(RiArrowDropDownLine)`
    w-6
    h-6
`;

export const NavButton = tw.button`
    btn
    btn-primary
    capitalize

`;
