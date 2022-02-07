import React from 'react';
import Link from 'next/link';

const sidebarLinks = [
  {
    title: 'Dashboard',
    link: '/admin',
  },
  {
    title: 'Outlet',
    link: '/admin/outlet',
  },
  {
    title: 'Category',
    link: '/admin/category',
  },
  {
    title: 'Feature',
    link: '/admin/feature',
  },
  {
    title: 'Region',
    link: '/admin/region',
  },
  {
    title: 'Member',
    link: '/admin/member',
  },
  {
    title: 'Transaction',
    link: '/admin/transaction',
  },
  {
    title: 'Register Transaction',
    link: '/admin/registertransaction',
  },
  {
    title: 'Refferal',
    link: '/admin/refferal',
  },
  {
    title: 'Product',
    link: '/admin/product',
  },
  {
    title: 'Product History',
    link: '/admin/producthistory',
  },
  {
    title: 'Notification',
    link: '/admin/notification',
  },
  {
    title: 'Account Setting',
    link: '/admin/account',
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
