import tw from "tailwind-styled-components";

export const Container = tw.div`
    relative 
    flex 
    flex-col 
    items-center 
    justify-center 
    w-full
    min-h-[calc(100vh_-_82px)]
`;

export const Background = tw.div`
   bg-black
   opacity-50
   absolute
   inset-0
   z-10
`;

export const Wrapper = tw.div`
    relative
    z-20
`;

export const ContentContainer = tw.div`
    flex 
    flex-col 
    items-center 
    px-2
    py-4 
    md:px-10
    md:py-10
    bg-white 
    rounded-xl
    bg-opacity-80
    text-neutral
`;

export const ImageContainer = tw.div`
    w-40
`;

export const Title = tw.div`
    mt-4
    mb-2
    text-3xl 
    font-bold 
    text-center 
    text-success
`;
