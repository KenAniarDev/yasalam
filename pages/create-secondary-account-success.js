import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreateAccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState(null);

  const resend = async () => {
    try {
      await axios.post(`../api/member/resend`, {
        email,
      });
      toast.success('Success');
    } catch (error) {
      console.log(error);
      toast.error('Error resending email');
    }
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      setEmail(router.query.email);
    }
  }, [router]);
  return (
    <>
      <div className='container'>
        <img
          src={'/pattern1920x1080.png'}
          alt=''
          className='fixed top-0 left-0 right-0 bottom-0 h-full w-full object-cover'
        />
        <div className='h-screen w-full flex justify-center items-center'>
          <div className='card shadow-lg compact side bg-accent p-5 my-2'>
            <h1 className='text-white text-4xl font-semibold text-center mb-4'>
              ACCOUNT CREATED
            </h1>
            <p className='text-center text-xl'>Secondary Account Created</p>
          </div>
        </div>
      </div>
    </>
  );
}
