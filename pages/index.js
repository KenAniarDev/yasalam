import CategoryList from "components/categoryList/CategoryList";
import HeroSection from "components/heroSection/HeroSection";
import NavFooter from "components/NavFooter";
import OutletListSlider from "components/outletListSlider/OutletListSlider";
import OutletLogo from "components/outletLogo/OutletLogo";
import Pricing from "components/pricing/Pricing";
import TextBlock from "components/textBlock/TextBlock";
import { getCategories, getOutlets } from "utils/firebase";

export async function getStaticProps() {
   const fetchOutlet = await getOutlets();
   const fetchCategory = await getCategories();
   const stringifyOutlet = JSON.parse(JSON.stringify(fetchOutlet));
   return {
      props: {
         outlet: stringifyOutlet.map(({ name, logo, id }) => ({
            name,
            logo,
            id,
         })),
         category: fetchCategory,
      },
      revalidate: 5,
   };
}
export default function Home({ outlet, category }) {
   const newMember = outlet.slice(Math.max(outlet.length - 5, 0)).reverse();

   return (
      <NavFooter>
         <HeroSection />
         <TextBlock />
         <OutletLogo data={outlet} />
         <CategoryList data={category} heading="All Categories" />
         <OutletListSlider
            data={newMember}
            title="New to YaSalam"
            subTitle="outlets"
         />
         <Pricing />
      </NavFooter>
   );
}
