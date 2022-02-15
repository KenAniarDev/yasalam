import styled from "styled-components";
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

export const UpdateTime = tw.small`
    text-sm
    mb-2
    text-gray-400
    font-medium
`;

export const Section = tw.section`
    py-4    
`;

export const SecondaryTitle = tw.h3`
    font-bold
    text-3xl
`;

export const SectionTitle = tw(SecondaryTitle)`
    my-4
    font-extrabold
`;

export const TermsTitle = tw(SecondaryTitle)`
    my-2
`;

export const List = styled.ol`
   &[type="I"] {
      list-style: upper-roman;
   }

   &[type="i"],
   & li ol {
      list-style: lower-roman;
   }

   &[type="1"] {
      list-style: decimal;
   }

   &[type="a"] {
      list-style: lower-alpha;
   }

   &[type="A"] {
      list-style: upper-alpha;
   }

   & li {
      margin-top: 20px;
      margin-left: 20px;
   }
   & li::marker {
      font-weight: bold;
   }
`;

export const TermsList = tw(List)`
    my-6
    list-decimal
`;
