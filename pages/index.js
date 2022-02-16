import HeroSection from 'components/heroSection/HeroSection';
import Navbar from 'components/navbar/Navbar';
import TextBlock from 'components/textBlock/TextBlock';
import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getCategories } from '../utils/firebase';
import toast from 'react-hot-toast';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
      console.log(data);
      toast.success('Data fetching success!');
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setCategories([]);
      setLoading(false);
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <TextBlock />
    </>
  );
}
