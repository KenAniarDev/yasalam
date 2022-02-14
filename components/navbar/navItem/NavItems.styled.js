import { RiArrowDropDownLine } from "react-icons/ri";
import tw from "tailwind-styled-components";
export const NavList = tw.ul`
    flex
    list-none
    z-40
    transition-all

    md:px-2 
    md:mx-2  
    md:items-center
    md:flex-row
    ml-auto
    md:h-auto
    md:relative
    md:pt-0
    md:w-auto
    md:whitespace-normal
    md:shadow-none

    flex-col
    flex-nowrap
    fixed
    top-0
    right-0
    pt-16
    bg-white
    h-screen
    whitespace-nowrap
    shadow-2xl
    ${(p) => (p.open ? "w-72" : "w-0")}
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

`;
