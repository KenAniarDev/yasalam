import Image from "next/image";
import React from "react";
import {
   Background,
   Container,
   ContentContainer,
   Form,
   Title,
   Wrapper,
} from "./Referral.styled";

const Referral = () => {
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
               <Title>Referral</Title>
               <Form action="/api/payment/update-with-referral" method="POST">
                  <input
                     type="text"
                     name="email"
                     required
                     placeholder="Enter email address"
                     className="w-full max-w-xs input"
                  />
                  <input
                     type="text"
                     name="code"
                     required
                     placeholder="Enter code"
                     className="w-full max-w-xs input"
                  />
                  <button className="btn btn-primary" type="submit">
                     Activate
                  </button>
               </Form>
            </ContentContainer>
         </Wrapper>
      </Container>
   );
};

export default Referral;
