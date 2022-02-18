import CategoryOutletsGroup from "components/categoryGroup/CategoryOutletsGroup";
import NavFooter from "components/NavFooter";
import Search from "components/search/Search";
import React from "react";
import { getCategories, getFeatures, getOutlets } from "utils/firebase";

export async function getStaticProps() {
   const fetchOutlet = await getOutlets();
   const fetchCategory = await getCategories();
   const fetchRegion = await getFeatures();

   return {
      props: {
         outlet: JSON.parse(JSON.stringify(fetchOutlet)),
         category: JSON.parse(JSON.stringify(fetchCategory)).map(
            ({ name, id, yasalam }) => ({
               name,
               id,
               yasalam,
            })
         ),
         features: fetchRegion,
      },
      revalidate: 5,
   };
}

export default function index({ outlet, category, features }) {
   //    const listOutlist = [
   //       "st regis abu dhabi",
   //       "saadiyat beach club",
   //       "khalidiya palace",
   //       "intercontinental",
   //       "uaejj fitness",
   //       "ufc gym",
   //       "vogue fitness",
   //       "al raha beach hotel",
   //       "al forsan international sports resort",
   //       "abu dhabi ladies club",
   //    ];
   //    let modifiedOutlets = new Array(8);
   //    result.data.data.outlet.forEach((outlet) => {
   //       if (outlet.name.toLowerCase().includes(listOutlist[0])) {
   //          modifiedOutlets[0] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[1])) {
   //          modifiedOutlets[1] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[2])) {
   //          modifiedOutlets[2] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[3])) {
   //          modifiedOutlets[3] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[4])) {
   //          modifiedOutlets[4] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[5])) {
   //          modifiedOutlets[5] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[6])) {
   //          modifiedOutlets[6] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[7])) {
   //          modifiedOutlets[7] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[8])) {
   //          modifiedOutlets[8] = outlet;
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[9])) {
   //          modifiedOutlets[9] = outlet;
   //       }
   //    });
   //    modifiedOutlets = modifiedOutlets.filter(function (e) {
   //       return e;
   //    });
   //    result.data.data.outlet.forEach((outlet) => {
   //       if (outlet.name.toLowerCase().includes(listOutlist[0])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[1])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[2])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[3])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[4])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[5])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[6])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[7])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[8])) {
   //       } else if (outlet.name.toLowerCase().includes(listOutlist[9])) {
   //       } else {
   //          modifiedOutlets.push(outlet);
   //       }
   //    });
   console.log(category);
   return (
      <NavFooter>
         <div className="container">
            <Search
               category={category}
               //    setOutlets={setOutlets}
               //    url={`${baseUrl}/api/landing/outlet/search-outlet-filter`}
               isYasalam={true}
            />
         </div>
         <div className="outlet-page">
            <CategoryOutletsGroup data={outlet} />
         </div>
      </NavFooter>
   );
}
