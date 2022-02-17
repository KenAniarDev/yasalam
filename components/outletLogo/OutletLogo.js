import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import {
   Container,
   DataContainer,
   ImageContainer,
   SectionTitle,
   SubContainer,
} from "./OutletLogo.styled";
import useSlider from "hooks/useSlider";

const OutletLogo = ({ data }) => {
   const {settingsLogo} = useSlider();

   return (
      <Container>
         <SubContainer>
            <SectionTitle>Outlets</SectionTitle>
            <div>
               <Slider {...settingsLogo}>
                  {data?.map((item, i) => {
                     return (
                        <DataContainer key={i}>
                           <ImageContainer>
                              <Image
                                 src={item.logo}
                                 alt="Outlets Logo"
                                 layout="responsive"
                                 width="100%"
                                 height="100%"
                              />
                           </ImageContainer>
                        </DataContainer>
                     );
                  })}
               </Slider>
            </div>
         </SubContainer>
      </Container>
   );
};

export default OutletLogo;
