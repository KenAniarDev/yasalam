import Link from "next/link";
import React from "react";

const Outlet = ({ outlet, logo, category, link }) => {
   return (
      <div className="outle-item">
         <Link href={`/single-outlet/${outlet.id}`}>
            <a>
               <div className="body">
                  <div className="bg-gradient"></div>
                  <img src={logo ? logo : outlet.logo} alt="" />
                  <div className="content">
                     <div className="bottom-content">
                        <div className="badge badge-secondary outlet-category">
                           {category ? category : outlet.name}
                        </div>
                        <h3 style={{ margin: 0 }}>{outlet.name}</h3>
                     </div>
                  </div>
               </div>
            </a>
         </Link>
      </div>
   );
};

export default Outlet;
