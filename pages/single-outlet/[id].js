import Loading from "components/Loading";
import NavFooter from "components/NavFooter";
import SingleOutlet from "components/singleOutlet/SingleOutlet";
import useStore from "hooks/useStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getOutlets } from "utils/firebase";

function PageContent({ outlets, id }) {
   const [currentOutlet, setCurrentOutlet] = useState({
      address: "",
      categoryId: "",
      categoryName: "",
      description: "",
      email: "",
      facebook: "",
      featureName: "",
      gallery: [],
      id: "",
      instagram: "",
      logo: "",
      longitude: "",
      name: "",
      outletgroupName: "",
      phone: "",
      regionName: "",
      twitter: "",
      video: "",
      visits: 1,
      website: "",
      whatsapp: "",
      yasalam: true,
      youtube: "",
   });

   useEffect(() => {
      const currCat = outlets.find((e) => e.id === id);
      setCurrentOutlet(currCat);
      console.log(id);
   }, []);

   return (
      <NavFooter>
         <SingleOutlet data={currentOutlet} />
      </NavFooter>
   );
}

export default function SingleOutletPage() {
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
      const outletDb = await getOutlets(id);
      setData(outletDb);
      setLoading(false);
      console.log(outletDb);
   };
   useEffect(() => {
      if (router.asPath !== router.route) {
         const id = router.query.id;
         setId(id);
         console.log("main", id);
      }
      if (outlets.length === 0) {
         fetchData();
      } else {
         setLoading(false);
      }
   }, [router]);

   return (
      <>{loading ? <Loading /> : <PageContent outlets={outlets} id={id} />}</>
   );
}
