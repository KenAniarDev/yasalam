import useCategory from "hooks/useCategory";
import React from "react";
import Slider from "react-slick";
import Category from "./category/Category";

const CategoryList = ({ data, heading }) => {
   const categories = useCategory(data);

   const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      arrows: false,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };

   return (
      <div className="category-list">
         <div className="container">
            <h3 className="mb-2 text-3xl font-semibold uppercase ">
               {heading ? heading : "Popular Categories"}
            </h3>
            <div className="categories">
               <Slider {...settings}>
                  {categories?.map((category, i) => {
                     return <Category key={i} categoryInfo={category} />;
                  })}
               </Slider>
            </div>
         </div>
      </div>
   );
};

export default CategoryList;
