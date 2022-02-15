import tw from "tailwind-styled-components";

export const Nav = tw.nav`
    navbar 
    shadow-lg 
    bg-neutral-content
    text-neutral
    sticky
    top-0
    z-50
`;

export const NavContainer = tw.div`
    flex
    py-1
    flex-1 
    max-w-screen-2xl
    mx-auto
    justify-between
`;

export const NavLogo = tw.div`
    px-2 
    md:px-5
    mx-2
    relative
    cursor-pointer
`;
