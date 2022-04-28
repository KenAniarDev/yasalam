import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const Pricing = () => {
  const [havePromo, setHavePromo] = useState(false);
  const saleEnds = '2021-12-12';
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    let CurrentDate = new Date();
    let GivenDate = new Date(saleEnds);
    let miliseconds = GivenDate - CurrentDate;
    setDaysRemaining(convertMiliseconds(miliseconds));

    if (CurrentDate < GivenDate) {
      setHavePromo(true);
    }
  }, []);

  function convertMiliseconds(miliseconds) {
    var days, total_hours, total_minutes, total_seconds;
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));

    return days;
  }
  return (
    <div className='pricing' id='buyMembership'>
      <section className='overflow-hidden text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-col w-full mb-4 text-center'>
            <h1 className='mb-2 text-3xl font-semibold uppercase sm:text-4xl title-font'>
              Pricing
            </h1>
            <p className='mx-auto text-base leading-relaxed text-gray-500 capitalize lg:w-2/3'>
              Commit to our annual membership offer!
            </p>
            {daysRemaining > 0 && (
              <h4 className='mt-6 text-xl font-semibold text-primary'>
                {daysRemaining} days remaining before the sale ends
              </h4>
            )}
          </div>
          <div className='flex flex-wrap -m-4 md:justify-center'>
            <div className='w-full p-4 md:w-1/2'>
              <div className='relative flex flex-col h-full p-6 overflow-hidden border-2 rounded-lg border-primary'>
                <span className='absolute top-0 right-0 px-3 py-1 text-xs tracking-widest text-white rounded-bl bg-primary'>
                  POPULAR
                </span>
                <h2 className='mb-1 text-sm font-medium tracking-widest title-font'>
                  Individual Membership
                </h2>
                <h1 className='pb-4 mb-4 text-4xl leading-none border-b border-gray-200'>
                  <span className='flex items-center'>
                    {havePromo ? (
                      <span>
                        AED <span className='line-through'>4999</span> 2625
                      </span>
                    ) : (
                      <span>AED 4999</span>
                    )}
                    <span className='ml-1 text-lg font-normal text-gray-500'>
                      /year
                    </span>
                    <br />
                  </span>
                  {/* <div className='mt-2 text-lg'>
                    <span className='mr-1 animate-pulse text-primary'>
                      Limited Offer - Sale Ends in
                    </span>
                    <span className='px-2 py-1 text-white rounded bg-primary'>
                      <Countdown date={new Date(saleEnds)}>
                        <span></span>
                      </Countdown>
                    </span>
                  </div> */}
                </h1>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  Enjoy unlimited free access to all our Royal participating
                  outlets.
                </p>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  Enjoy special discount rate.
                </p>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  Get loyalty point for every AED spent.
                </p>
                <Link href='/register/individual'>
                  <a className='flex items-center w-full px-4 py-2 mt-auto text-white border-0 rounded bg-primary focus:outline-none hover:bg-primary'>
                    Buy Membership
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='w-4 h-4 ml-auto'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className='w-full p-4 md:w-1/2'>
              <div className='relative flex flex-col h-full p-6 overflow-hidden border-2 rounded-lg border-primary'>
                <h2 className='mb-1 text-sm font-medium tracking-widest title-font'>
                  Family Membership
                </h2>
                <h1 className='pb-4 mb-4 text-5xl leading-none border-b border-gray-200'>
                  <span className='flex items-center'>
                    {havePromo ? (
                      <span>
                        AED <span className='line-through'>7299</span> 3675
                      </span>
                    ) : (
                      <span>AED 7299</span>
                    )}
                    <span className='ml-1 text-lg font-normal text-gray-500'>
                      /year
                    </span>
                  </span>
                  {/* <h4 className='mt-2 text-lg'>
                    <span className='mr-1 animate-pulse text-primary'>
                      Limited Offer - Sale Ends in
                    </span>
                    <span className='px-2 py-1 text-white rounded bg-primary'>
                      <Countdown date={new Date(saleEnds)}>
                        <span></span>
                      </Countdown>
                    </span>
                  </h4> */}
                </h1>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  2 Adults
                </p>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  3 Children under 17.
                </p>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  Enjoy unlimited free access to all our Royal participating
                  outlets.
                </p>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  Enjoy special discount rate.
                </p>
                <p className='flex items-center mb-2 text-gray-600'>
                  <span className='inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-gray-400 rounded-full'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                      className='w-3 h-3'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20 6L9 17l-5-5'></path>
                    </svg>
                  </span>
                  Get loyalty point for every AED spent.
                </p>
                <Link href='/register/family'>
                  <a className='flex items-center w-full px-4 py-2 mt-auto text-white border-0 rounded bg-primary focus:outline-none hover:bg-primary'>
                    Buy Membership
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='w-4 h-4 ml-auto'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
