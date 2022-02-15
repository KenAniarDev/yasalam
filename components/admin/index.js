import { useEffect, useState } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router';

export default function Index({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) return router.push('/admin/login');
      if (typeof user.reloadUserInfo.customAttributes === 'undefined')
        return router.push('/');
      if (!JSON.parse(user.reloadUserInfo.customAttributes).admin)
        return router.push('/');
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='p-4'>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Navbar />
          <Sidebar>{children}</Sidebar>
        </>
      )}
    </div>
  );
}
