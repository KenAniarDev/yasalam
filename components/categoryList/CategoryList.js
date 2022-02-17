import useCategory from "hooks/useCategory";
import useSlider from "hooks/useSlider";
import React from "react";
import Slider from "react-slick";
import Category from "./Category";


const CategoryList = ({ data, heading }) => {
   const categories = useCategory(data);
   const {settings} = useSlider();

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
