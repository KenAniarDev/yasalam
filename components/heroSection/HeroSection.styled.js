import tw from 'tailwind-styled-components';

export const Background = tw.div`
   opacity-80
   absolute
   inset-0
   z-10
`;
// bg-[#D25235]

export const Container = tw.div`
    relative 
    flex 
    items-center 
    py-40 
    min-h-[calc(100vh_-_82px)]
`;

export const Main = tw.div`
   container 
   z-10
`;
export const MainContent = tw.div`
    items-center 
    text-center 
    md:flex
`;

export const LeftContent = tw.div`
    bg-white
    bg-opacity-80
    flex 
    flex-col 
    items-center 
    p-10 
    md:ml-10 
    md:w-1/2 
    rounded-xl
`;

export const SecondaryText = tw.h2`
    my-6 
    text-2xl 
    font-semibold 
    md:text-3xl 
    lg:text-4xl
`;

export const PrimaryText = tw.h1`
    my-4 
    text-4xl 
    font-semibold 
    md:text-5xl 
    lg:text-6xl
`;

export const ImageLeft = tw.div`
    w-20 
    my-5 
    md:w-32 
    lg:w-40
    block
`;

export const RightContent = tw.div`
    flex-grow 
    mt-16 
    md:mt-0
`;

export const ImageRight = tw.div`
    w-4/5 
    mx-auto 
    md:w-full
    block
`;
