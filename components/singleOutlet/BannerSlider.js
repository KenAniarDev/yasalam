import React from 'react'
import Slider from "react-slick";


export const BannerSlider = ({data}) => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="banner-slider">
            <Slider {...settings}>
            {data.map((image, i) => 
                <div key={i}>
                    <img src={image} alt="" />
                </div>
            )}
            </Slider>
      </div>
    )
}

export default BannerSlider