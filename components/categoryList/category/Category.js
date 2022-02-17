import Link from "next/Link";
import React from "react";

const Category = ({ categoryInfo }) => {
   return (
      <div className="category-item">
         <Link href="/">
            <>
               <img src={categoryInfo.image} alt="" />
               <div className="bg-overlay"></div>
               <div className="category-info">
                  <h4>{categoryInfo.count ? categoryInfo.count + "+" : 0}</h4>
                  <span>{categoryInfo.name}</span>
                  <br />
                  <button>View</button>
               </div>
            </>
         </Link>
      </div>
   );
};

export default Category;
