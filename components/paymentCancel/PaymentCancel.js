import Image from "next/image";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import {
   Background,
   Container,
   ContentContainer,
   Title,
   Wrapper,
} from "./PaymentCancel.styled";

const PaymentSuccess = () => {
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
               <RiCloseCircleLine className="w-12 h-12 text-error" />
               <Title>Payment Canceled</Title>
            </ContentContainer>
         </Wrapper>
      </Container>
   );
};

export default PaymentSuccess;
