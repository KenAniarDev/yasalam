import tw from "tailwind-styled-components";

export const Container = tw.div`
    container
`;

export const SubContainer = tw.div`
    py-16
    terms
    text-neutral-focus
    neutral-focus
`;

export const Header = tw.div`
   mb-5
`;

export const Title = tw.h2`
    font-extrabold
    text-5xl    
`;

export const Section = tw.section`
    py-4    
`;

export const SecondaryTitle = tw.h3`
    my-2
    font-extrabold
    text-4xl
`;

export const SecondaryTitleSpace = tw(SecondaryTitle)`
    mt-14
    mb-4
`;

export const TertiaryTitle = tw(SecondaryTitle)`
    font-medium
    text-2xl
`;

export const List = tw.ul`
   list-disc
   list-inside
   mt-4
`;

export const Content = tw.p`
    mb-2
`;
export const Wrapper = tw.div`
    mb-4
`;
