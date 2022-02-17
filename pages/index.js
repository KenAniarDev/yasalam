import CategoryList from "components/categoryList/CategoryList";
import HeroSection from "components/heroSection/HeroSection";
import NavFooter from "components/NavFooter";
import OutletLogo from "components/outletLogo/OutletLogo";
import TextBlock from "components/textBlock/TextBlock";
import { getCategories, getOutlets, getOutlet, getAllOutletGroup } from "utils/firebase";
import OutletListSlider from 'components/outletListSlider/OutletListSlider';
import Pricing from 'components/pricing/Pricing';

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
export default function Home({ outlet, category, outletGroup }) {
   const newMember = outlet.slice(Math.max(outlet.length - 5, 0)).reverse()
   console.log(outlet[1].categoryName)
   console.log(category)

   return (
      <NavFooter>
         <HeroSection />
         <TextBlock />
         <OutletLogo data={outlet} />
         <CategoryList data={category} heading="All Categories" />
         <OutletListSlider data={newMember} title="New to YaSalam" subTitle="outlets"/>
         <Pricing/>
      </NavFooter>
   );

}
