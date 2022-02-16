import Image from "next/image";
import PhoneImage from "public/banner-image-new.png";
import {
   Background,
   Container,
   ImageLeft,
   ImageRight,
   LeftContent,
   Main,
   MainContent,
   PrimaryText,
   RightContent,
   SecondaryText,
} from "./HeroSection.styled";

const HeroSection = () => {
   return (
      <Container>
         <Image
            src="/pattern1920x1080.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="z-0"
            quality={75}
         />
         <Background></Background>
         <Main>
            <MainContent>
               <LeftContent>
                  <SecondaryText>Level up your life style with</SecondaryText>
                  <ImageLeft>
                     <Image
                        src="/yasalamlogo.png"
                        alt="Yasalam Logo"
                        layout="responsive"
                        width={160}
                        height={270}
                     />
                  </ImageLeft>
                  <PrimaryText>YaSalam</PrimaryText>
               </LeftContent>
               <RightContent>
                  <ImageRight>
                     <Image
                        src={PhoneImage}
                        alt="Phone Image"
                        layout="responsive"
                        width="100%"
                        height="100%"
                        objectFit="contain"
                     />
                  </ImageRight>
               </RightContent>
            </MainContent>
         </Main>
      </Container>
   );
};

export default HeroSection;
