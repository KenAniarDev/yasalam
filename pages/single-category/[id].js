import CategoryBanner from "components/categoryGroup/CategoryBanner";
import CategoryOutletsGroup from "components/categoryGroup/CategoryOutletsGroup";
import NavFooter from "components/NavFooter";
import React from "react";
import { getCategories, getCategory, getOutlets } from "utils/firebase";
// import { getCategories } from "utils/firebase";

export async function getStaticPaths() {
   const fetchCategory = await getCategories();

   const paths = fetchCategory.map((category) => {
      return {
         params: { id: category.id.toString() },
      };
   });

   return {
      paths,
      fallback: false, // false or 'blocking'
   };
}

export async function getStaticProps(context) {
   const id = context.params.id;
   const fetchSingleCategory = await getCategory(id);
   const fetchOutlet = await getOutlets();
   const stringify = JSON.parse(JSON.stringify(fetchOutlet));

   return {
      props: {
         outlet: stringify.filter(
            (group) => group.categoryName === fetchSingleCategory.name
         ),
         image: fetchSingleCategory.image,
         title: fetchSingleCategory.name,
      },
      revalidate: 5,
   };
}

export default function SingleCategoryPage({ outlet, image, title }) {
   return (
      <NavFooter>
         <CategoryBanner title={title} image={image} />
         <div className="outlet-page">
            <CategoryOutletsGroup data={outlet} />
         </div>
      </NavFooter>
   );
}
