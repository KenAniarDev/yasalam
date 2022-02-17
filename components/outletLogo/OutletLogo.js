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

const OutletLogo = ({ data }) => {
   const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      arrows: false,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 4,
               slidesToScroll: 4,
               initialSlide: 4,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
               initialSlide: 3,
            },
         },
      ],
   };

   return (
      <Container>
         <SubContainer>
            <SectionTitle>Outlets</SectionTitle>
            <div>
               <Slider {...settings}>
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
