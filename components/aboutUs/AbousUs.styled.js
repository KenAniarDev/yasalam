import tw from "tailwind-styled-components";

export const Container = tw.div`
    container
    min-h-[calc(100vh_-_82px)]
`;

export const SubContainer = tw.div`
    text-center
`;

export const Section = tw.section`
    items-center 
    sm:flex
    py-16
`;

export const ImageContainer = tw.div`
    sm:w-1/2
`;

export const ImageSubContainer = tw.div`
    w-4/5 
    mx-auto 
    my-4 
    sm:w-full
`;

export const InformationContainer = tw.div`
    ml-10 
    text-left 
    sm:w-1/2
`;

export const InformationDetails = tw.p`
    text-xl
    text-left
`;

export const InformationHighlight = tw.h2`
    my-4 
    text-2xl 
    font-semibold
    text-left
`;

export const List = tw.ul`
    ${(props) => (props.$marginTop ? "mt-2" : "my-4 ")}
    text-xl 
    text-left 
    list-disc 
    list-inside
`;

export const PriceContainer = tw.div`
    flex 
    flex-col 
    items-center 
    my-6 
    text-white
`;

export const Price = tw.div`
    flex 
    flex-col 
    items-center 
    justify-center 
    h-20 
    mb-4 
    rounded-xl
    ${(props) => (props.$background ? "bg-secondary" : "bg-accent")}
    w-80
`;

export const PriceText = tw.p`
    text-xl 
    uppercase
`;

export const PriceLarge = tw.small`
    text-lg
`;
