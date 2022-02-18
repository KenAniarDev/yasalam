import NavFooter from "components/NavFooter";
import SingleOutlet from "components/singleOutlet/SingleOutlet";
import React from "react";
import { getOutlet, getOutlets } from "utils/firebase";

export async function getStaticPaths() {
   const fetchOutlet = await getOutlets();

   const paths = fetchOutlet.map((outlet) => {
      return {
         params: { singleOutletID: outlet.id.toString() },
      };
   });

   return {
      paths,
      fallback: false, // false or 'blocking'
   };
}

export async function getStaticProps(context) {
   const id = context.params.singleOutletID;
   console.log(id);
   const fetchOutlet = await getOutlet(id);

   return {
      props: {
         singleOutlet: JSON.parse(JSON.stringify(fetchOutlet)),
      },
      revalidate: 5,
   };
}

export default function SingleOutletPage({ singleOutlet }) {
   console.log(singleOutlet);
   return (
      <NavFooter>
         <SingleOutlet data={singleOutlet} />
      </NavFooter>
   );
}
