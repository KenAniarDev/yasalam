import CategoryList from "components/categoryList/CategoryList";
import HeroSection from "components/heroSection/HeroSection";
import NavFooter from "components/NavFooter";
import OutletLogo from "components/outletLogo/OutletLogo";
import TextBlock from "components/textBlock/TextBlock";
import { getCategories, getOutlets } from "utils/firebase";

export async function getStaticProps() {
   const fetchOutlet = await getOutlets();
   const fetchCategory = await getCategories();

   return {
      props: {
         outlet: JSON.parse(JSON.stringify(fetchOutlet)),
         category: fetchCategory,
      },
      revalidate: 5,
   };
}
export default function Home({ outlet, category }) {
   return (
      <NavFooter>
         <HeroSection />
         <TextBlock />
         <OutletLogo data={outlet} />
         <CategoryList data={category} heading="All Categories" />
      </NavFooter>
   );

}
