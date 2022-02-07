import { useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';

export default function Index({ children }) {
  useEffect(() => {}, []);

  return (
    <div className='p-4'>
      <Navbar />
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
