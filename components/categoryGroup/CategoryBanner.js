import Image from "next/image";
import React from "react";

const CategoryBanner = ({ image, title }) => {
   return (
      <div className="banner">
         <div className="banner-image">
            <Image
               src={image}
               alt="Banner Image"
               layout="fill"
               objectFit="cover"
            />
         </div>
         <div className="bg-overlay"></div>
         <div className="container">
            <div className="text-contents">
               <h2
                  className="text-4xl text-center uppercase"
                  style={{ fontSize: 60, lineHeight: 1 }}
               >
                  {title}
               </h2>
            </div>
         </div>
      </div>
   );
};

export default CategoryBanner;
