import Image from "next/image";
import React from "react";
import { RiUserUnfollowLine } from "react-icons/ri";
import {
   Background,
   Container,
   ContentContainer,
   Title,
   Wrapper,
} from "./ErrorUser.styled";

const ErrorUser = () => {
   return (
      <Container>
         <Image
            src="/pattern1920x1080.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="z-0"
            quality={100}
         />
         <Background></Background>
         <Wrapper>
            <ContentContainer>
               <RiUserUnfollowLine className="w-12 h-12 text-error" />
               <Title>User not found</Title>
            </ContentContainer>
         </Wrapper>
      </Container>
   );
};

export default ErrorUser;
