import tw from "tailwind-styled-components";

export const Container = tw.div`
    container
`;

export const SubContainer = tw.div`
    py-16 
`;

export const SectionTitle = tw.h1`
   mb-2
   text-3xl
   font-semibold
   uppercase
   flex
   items-center
   justify-center
   flex-col
   after:border-b-4
   after:border-primary
   after:mt-2
   after:mb-2
   after:w-16
`;

export const DataContainer = tw.div`
   py-4
`;

export const ImageContainer = tw.div`
    block 
    object-contain 
    w-40 
    h-40 
    px-4 
    mx-auto 
    md:w-44 
    md:h-44 
    md:px-2
`;
