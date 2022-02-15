import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInUser } from '../../utils/firebase';

export default function login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await signInUser(email, password);
      console.log(user);
      toast.success('Login success!');
    } catch (error) {
      toast.error('Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push('/admin');
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-96 h-auto flex items-center'>
        <div className='card text-center shadow-2xl w-full'>
          <figure className='px-10 pt-10 flex justify-center'>
            <Image
              src='/yasalamlogo.png'
              className='rounded-xl login-logo object-contain'
              alt='Logo'
              width={100}
              height={100}
            />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>Welcome Back</h2>
            {/* {error && <p className='text-error font-semibold'>{error}</p>} */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='form-control flex-grow mr-1'>
                <label className='label'>
                  <span className='label-text'>Username</span>
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='username'
                  className='input input-bordered'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-control flex-grow mr-1'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  name='name'
                  placeholder='password'
                  className='input input-bordered'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className={
                  !isLoading
                    ? 'btn btn-primary mt-6'
                    : 'btn btn-primary mt-6 loading'
                }
                type='submit'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
