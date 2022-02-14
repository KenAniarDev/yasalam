import { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router';

export default function Index({ children }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return router.push('/manager/login');
      if (typeof user.reloadUserInfo.customAttributes === 'undefined')
        return router.push('/');
      if (!JSON.parse(user.reloadUserInfo.customAttributes).manager)
        return router.push('/');
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='p-4'>
      <Navbar />
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
