import CategoryOutletsGroup from "components/categoryGroup/CategoryOutletsGroup";
import Loading from "components/Loading";
import NavFooter from "components/NavFooter";
import Search from "components/search/Search";
import useStore from "hooks/useStore";
import React, { useEffect, useState } from "react";
import {
    getCategories,
    getFeatures,
    getOutlets,
    getRegions
} from "utils/firebase";

function Yasalam({ outlets, categories, regions, features }) {
   const [filterItem, setFilterItem] = useState(outlets);

   return (
      <NavFooter>
         <div className="container">
            <Search
               category={categories}
               isYasalam={true}
               regions={regions}
               features={features}
               setFilterItem={setFilterItem}
               outlets={outlets}
            />
         </div>
         <div className="outlet-page">
            <CategoryOutletsGroup data={filterItem} />
         </div>
      </NavFooter>
   );
}

export default function ExperiencePage() {
   const setData = useStore((state) => state.setData);
   const outlets = useStore((state) => state.outlets);
   const categories = useStore((state) => state.categories);
   const regions = useStore((state) => state.regions);
   const features = useStore((state) => state.features);
   const [loading, setLoading] = useState(true);

   const isYasalam = outlets.filter((items) => items.experience === true);

   const fetchData = async () => {
      const outletDb = await getOutlets();
      const categoryDb = await getCategories();
      const regionDb = await getRegions();
      const featureDb = await getFeatures();
      setData(outletDb, categoryDb, regionDb, featureDb);
      setLoading(false);
   };
   useEffect(() => {
      if (outlets.length === 0) {
         fetchData();
      } else {
         setLoading(false);
      }
   }, []);

   return (
      <>
         {loading ? (
            <Loading />
         ) : (
            <Yasalam
               outlets={isYasalam}
               categories={categories}
               regions={regions}
               features={features}
            />
         )}
      </>
   );
}
