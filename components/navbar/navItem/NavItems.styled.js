import { RiArrowDropDownLine } from "react-icons/ri";
import tw from "tailwind-styled-components";

export const NavList = tw.ul`
    flex
    list-none

    md:relative
    md:flex-row
    md:items-center
    md:pt-0
    md:whitespace-normal
    md:h-auto
    md:w-auto
    md:shadow-none
    
    flex-col
    fixed
    top-0
    right-0
    pt-16
    bg-white
    ${(props) => (props.open ? "w-64" : "w-0")}
    whitespace-nowrap
    h-screen
    shadow-2xl
    transition-all
    z-20
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

export const MobileNavContainer = tw.div`
   block
   md:hidden
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
    font-normal
`;
