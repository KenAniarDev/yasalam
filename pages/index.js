import { useEffect, useState } from 'react';
import CategoryList from 'components/categoryList/CategoryList';
import HeroSection from 'components/heroSection/HeroSection';
import NavFooter from 'components/NavFooter';
import OutletListSlider from 'components/outletListSlider/OutletListSlider';
import OutletLogo from 'components/outletLogo/OutletLogo';
import Pricing from 'components/pricing/Pricing';
import TextBlock from 'components/textBlock/TextBlock';
import {
  getCategories,
  getOutlets,
  getRegions,
  getFeatures,
} from 'utils/firebase';
import useStore from 'hooks/useStore';
import Loading from 'components/Loading';

function PageContent({ outlets, categories, newMember }) {
  return (
    <NavFooter>
      <HeroSection />
      <TextBlock />
      <OutletLogo data={outlets} />
      <CategoryList data={categories} heading='All Categories' />
      <OutletListSlider
        data={newMember}
        title='New to Royal'
        subTitle='outlets'
      />
      <Pricing />
    </NavFooter>
  );
}

export default function Home() {
  const setData = useStore((state) => state.setData);
  const outlets = useStore((state) => state.outlets);
  const categories = useStore((state) => state.categories);
  const regions = useStore((state) => state.regions);
  const features = useStore((state) => state.features);
  const newMember = outlets.slice(Math.max(outlets.length - 5, 0)).reverse();
  const [loading, setLoading] = useState(true);

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
        <PageContent
          outlets={outlets}
          categories={categories}
          newMember={newMember}
        />
      )}
    </>
  );
}
