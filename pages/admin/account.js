import { useState } from 'react';
import Container from '../../components/admin/';
import { useStore } from '../../components/admin/';
import axios from 'axios';
import toast from 'react-hot-toast';

function PageContent({ user }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idToken = await user.getIdToken(true);
      await axios.post('../api/admin/changepassword', {
        idToken,
        password,
      });

      setPassword('');
      setConfirmPassword('');
      toast.success('Password updated!');
    } catch (error) {
      toast.error('Error updating password');
    }
  };

  return (
    <>
      <h2 className='text-4xl font-medium mb-2'>Account</h2>
      <div>
        <form
          className='pt-6 w-80'
          onSubmit={(e) => {
            if (password !== confirmPassword) {
              toast.error('Passwords are not equal');
            } else {
              handleSubmit(e);
            }
          }}
        >
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              required
              placeholder='password'
              className='input input-bordered'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              required
              placeholder='confirm password'
              className='input input-bordered'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type='submit' className='btn btn-primary mt-4'>
            Change Password
          </button>
        </form>
      </div>
    </>
  );
}

export default function AccountPage() {
  const user = useStore((state) => state.user);

  return (
    <Container>
      <PageContent user={user} />
    </Container>
  );
}
