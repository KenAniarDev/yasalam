import Link from "next/link";
import React from "react";

const Category = ({ categoryInfo }) => {
   return (
      <div className="category-item">
         <Link href={`/single-category/${categoryInfo.id}`}>
            <a>
               <img src={categoryInfo.image} alt={categoryInfo.name} />
               <div className="bg-overlay"></div>
               <div className="category-info">
                  <h4>{categoryInfo.count ? categoryInfo.count + "+" : 0}</h4>
                  <span>{categoryInfo.name}</span>
                  <br />
                  <button>View</button>
               </div>
            </a>
         </Link>
      </div>
   );
};

export default Category;
