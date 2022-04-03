import React from 'react';
import { signOutUser } from '../../utils/firebase';

export default function Navbar() {
  return (
    <>
      <div className='navbar mb-2 shadow-lg rounded-box'>
        <div className='flex-none'>
          <label
            htmlFor='my-drawer-2'
            className='btn btn-square btn-ghost drawer-button lg:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-6 h-6 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </label>
        </div>
        <div className='flex-1 px-2 mx-2'>
          <span className='text-lg font-bold'>ROYAL</span>
        </div>
        <div className='flex-none'>
          <button className='btn btn-primary mr-2' onClick={signOutUser}>
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
}
