import styled from "styled-components";
import tw from "tailwind-styled-components";

export const Background = styled.div`
   background: rgba(0, 0, 0, 0.5);
   width: 100%;
   min-height: 100vh;
   position: absolute;
   z-index: 1;
`;

export const Container = tw.div`
    min-h-screen 
    relative
`;

export const Main = tw.div`
    min-h-screen 
    justify-between
    items-center
    hero-content
    lg:flex-col
    z-10
`;
export const MainContent = tw.div`
    flex-col 
    hero-content 
    lg:flex-row
    justify-between
`;

export const leftContentBackground = styled.div`
   background-color: rgba(255, 255, 255, 0.85);
`;

export const LeftContent = tw(leftContentBackground)`
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
`;

export const RightContent = tw.div`
    flex-grow 
    mt-16 
    md:mt-0
`;

export const ImageRightSize = styled.div`
   max-height: 500px;
`;

export const ImageRight = tw(ImageRightSize)`
object-contain
    w-4/5 
    mx-auto 
    md:w-full 
    max-h-96 
`;
