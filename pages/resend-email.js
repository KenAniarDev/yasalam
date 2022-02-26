import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from 'utils/baseUrl';
import toast from 'react-hot-toast';

export default function CreateAccountPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/member/resend-payment-link`, {
        email,
      });
      toast.success('Success');
    } catch (error) {
      console.log(error);
      toast.error('Error resending email');
    }
  };

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
            <h1 className='text-white text-4xl font-semibold text-center mb-4 uppercase'>
              Resend Payment Link
            </h1>

            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col'>
              <input
                type='email'
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className='input input-bordered'
                required
              />
              <button type='submit' className='mt-6 uppercase btn btn-primary'>
                resend payment link
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
