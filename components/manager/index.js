import { useEffect, useState, cloneElement } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router';
import create from 'zustand';
import Loading from '../Loading';

export const useStore = create((set) => ({
  outlet: null,
  changeOutlet: (outlet) => set({ outlet }),
}));

export default function Index({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const changeOutlet = useStore((state) => state.changeOutlet);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return router.push('/manager/login');
      if (typeof user.reloadUserInfo.customAttributes === 'undefined')
        return router.push('/');
      if (!JSON.parse(user.reloadUserInfo.customAttributes).manager)
        return router.push('/');
      changeOutlet(JSON.parse(user.reloadUserInfo.customAttributes));
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className='p-4'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <Sidebar>{children}</Sidebar>
          </>
        )}
      </div>
    </>
  );
}
