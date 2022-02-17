import React from 'react';

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className='flex items-center justify-around p-6 bg-white rounded-xl space-x-2 shadow-sm'>
      <div>
        <span className='text-sm font-semibold text-gray-400'>{title}</span>
        <h1 className='text-2xl font-bold'>{value}</h1>
      </div>
      <div>
        <i className={icon + ' text-3xl'}></i>
      </div>
    </div>
  );
}
