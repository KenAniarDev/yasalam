import React, { useEffect } from 'react';
import Link from 'next/link';

const sidebarLinks = [
  {
    title: 'Dashboard',
    link: '/manager',
  },
  {
    title: 'Visit',
    link: '/manager/visit',
  },
  {
    title: 'Transaction',
    link: '/manager/transaction',
  },
  {
    title: 'QR Page',
    link: '/manager/qr',
  },
  {
    title: 'Payment',
    link: '/manager/payment',
  },
];

export default function Sidebar({ children }) {
  return (
    <>
      <div
        className='rounded-lg shadow bg-base-200 drawer drawer-mobile h-52'
        style={{ height: 'calc(100vh - 110px)' }}
      >
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='p-4 drawer-content'>{children}</div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
          <ul className='menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content'>
            {sidebarLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.link}>
                  <a>{link.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
