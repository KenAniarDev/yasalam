import tw from "tailwind-styled-components";

const Footer = tw.footer`
    relative
    footer
    bg-base-200 
    text-base-content 
`;

export const FooterLeft = tw(Footer)` 
    p-10  
`;

export const FooterRight = tw(Footer)`
    items-center 
    px-10 
    py-4
    border-t   
    border-base-300
`;

export const FooterTitle = tw.span`
    footer-title
`;

export const FooterLink = tw.a`
    flex
    items-center
    link 
    link-hover
    gap-2
`;

export const FooterLinkUnderline = tw.a`
    underline
`;

export const Wrapper = tw.div``;

export const GoogleTranslate = tw.div`
    
`;
