import { useState, useEffect } from 'react';
import CategoryBanner from 'components/categoryGroup/CategoryBanner';
import CategoryOutletsGroup from 'components/categoryGroup/CategoryOutletsGroup';
import NavFooter from 'components/NavFooter';
import React from 'react';
import { useRouter } from 'next/router';

import {
  getCategories,
  getOutlets,
  getRegions,
  getFeatures,
} from 'utils/firebase';
import useStore from 'hooks/useStore';
import Loading from 'components/Loading';

function PageContent({ outlets, categories, id }) {
  const [currentCategory, setCurrentCategory] = useState({
    name: '',
    image: '/pattern1920x1080.png',
  });
  const [catOutlets, setCatOutlets] = useState([]);

  useEffect(() => {
    const currCat = categories.find((e) => e.id === id);
    setCurrentCategory(currCat);

    const catOutlet = outlets.filter((e) => e.categoryId === id);
    setCatOutlets(catOutlet);
  }, []);

  return (
    <NavFooter>
      <CategoryBanner
        title={currentCategory.name}
        image={currentCategory.image}
      />
      <div className='outlet-page'>
        <CategoryOutletsGroup data={catOutlets} />
      </div>
    </NavFooter>
  );
}

export default function SingleCategory() {
  const router = useRouter();
  const setData = useStore((state) => state.setData);
  const outlets = useStore((state) => state.outlets);
  const categories = useStore((state) => state.categories);
  const regions = useStore((state) => state.regions);
  const features = useStore((state) => state.features);
  const newMember = outlets.slice(Math.max(outlets.length - 5, 0)).reverse();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    const outletDb = await getOutlets();
    const categoryDb = await getCategories();
    const regionDb = await getRegions();
    const featureDb = await getFeatures();
    setData(outletDb, categoryDb, regionDb, featureDb);
    setLoading(false);
  };
  useEffect(() => {
    if (router.asPath !== router.route) {
      const id = router.query.id;
      setId(id);
    }
    if (outlets.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [router]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PageContent outlets={outlets} categories={categories} id={id} />
      )}
    </>
  );
}
