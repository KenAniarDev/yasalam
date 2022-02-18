import React from "react";
import Outlet from "../outletListSlider/Outlet";

const CategoryOutletsGroup = ({ data, logo }) => {
   return (
      <div className="outlet-list">
         <div className="container">
            {data.length > 0 ? (
               <div className="outlets">
                  {data.map((outlet, i) => {
                     return <Outlet key={i} outlet={outlet} logo={logo} />;
                  })}
               </div>
            ) : (
               <h4 className="text-2xl text-center">No Outlet</h4>
            )}
         </div>
      </div>
   );
};

export default CategoryOutletsGroup;
