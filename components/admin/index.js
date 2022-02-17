import { useEffect, useState } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import create from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default function Index({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return router.push('/admin/login');
      if (typeof user.reloadUserInfo.customAttributes === 'undefined')
        return router.push('/');
      if (!JSON.parse(user.reloadUserInfo.customAttributes).admin)
        return router.push('/');
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
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
  );
}
