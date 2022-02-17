import React from 'react';

export default function DashboardCardColored({ title, value, icon }) {
  return (
    <div className='bg-primary dark:bg-gray-800 shadow-sm rounded-md flex items-center justify-between p-3 border-b-4 border-primary-focus dark:border-gray-600 text-white font-medium group'>
      <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
        <i className={icon + ' text-3xl text-gray-800'}></i>
      </div>
      <div className='text-right'>
        <p className='text-2xl'>
          {/* {(
          Math.round(data.total_membership_earnings * 100) / 100
        ).toFixed(2)} */}
          {value}
        </p>
        <p>{title}</p>
      </div>
    </div>
  );
}
