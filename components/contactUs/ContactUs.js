import Image from "next/image";
import Link from "next/Link";
import React from "react";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";
import {
   Background,
   ContactLinks,
   Container,
   ContentContainer,
   ImageContainer,
   LinkText,
   Title,
   Wrapper
} from "./Contact.styled";

const ContactUs = () => {
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
               <ImageContainer>
                  <Image
                     src="/yasalamlogo.png"
                     alt="Background Image"
                     layout="responsive"
                     width="100%"
                     height="100%"
                     objectFit="contain"
                  />
               </ImageContainer>

               <Title>Contact Us</Title>
               <Link href="mailto:info@yasalamae.ae">
                  <ContactLinks>
                     <LinkText>
                        <RiMailLine />
                        info@yasalamae.ae
                     </LinkText>
                  </ContactLinks>
               </Link>
               <Link href="tel:+971 50 72 88 316">
                  <ContactLinks>
                     <LinkText>
                        <RiPhoneLine />
                        +971 50 72 88 316
                     </LinkText>
                  </ContactLinks>
               </Link>
               <Link href="tel:+971 50 72 56 316">
                  <ContactLinks>
                     <LinkText>
                        <RiPhoneLine />
                        +971 50 72 56 316
                     </LinkText>
                  </ContactLinks>
               </Link>
               <Link href="tel:+971 56 54 74 636">
                  <ContactLinks>
                     <LinkText>
                        <RiPhoneLine />
                        +971 56 54 74 636
                     </LinkText>
                  </ContactLinks>
               </Link>
            </ContentContainer>
         </Wrapper>
      </Container>
   );
};

export default ContactUs;
