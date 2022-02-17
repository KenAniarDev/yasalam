import { useEffect, useState } from 'react';
import Container from '../../components/manager/';
import { useStore } from '../../components/manager/';
import {
  getAllVisitsByOutlet,
  getAllTransactionsByOutlet,
} from '../../utils/firebase';
import toast from 'react-hot-toast';

function PageContent({ outlet }) {
  const [visits, setVisits] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [sales, setSales] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const visit = await getAllVisitsByOutlet(outlet.outlet);
      const transaction = await getAllTransactionsByOutlet(outlet.outlet);
      setVisits(visit.length);
      setTransactions(transaction.length);
      const sale = transaction.map((e) => {
        return e.totalPrice;
      });
      const sumWithInitial = sale.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      setSales(sumWithInitial);
      toast.success('Data fetching success!');
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setVisits([]);
      setLoading(false);
    };
  }, []);

  return (
    <>
      <h2 className='text-4xl font-medium mb-2'>Dashboard</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4'>
        <div className='bg-primary dark:bg-gray-800 shadow-sm rounded-md flex items-center justify-between p-3 border-b-4 border-primary-focus dark:border-gray-600 text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <svg
              width='30'
              height='30'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='stroke-current text-primary-focus dark:text-gray-800 transform transition-transform duration-500 ease-in-out'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              ></path>
            </svg>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{visits}</p>
            <p>Visitors</p>
          </div>
        </div>
        <div className='bg-primary dark:bg-gray-800 shadow-sm rounded-md flex items-center justify-between p-3 border-b-4 border-primary-focus dark:border-gray-600 text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <svg
              width='30'
              height='30'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='stroke-current text-primary-focus dark:text-gray-800 transform transition-transform duration-500 ease-in-out'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              ></path>
            </svg>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{transactions}</p>
            <p>Transactions</p>
          </div>
        </div>
        <div className='border-primary-focus dark:bg-gray-800 shadow-sm rounded-md flex items-center justify-between p-3 border-b-4 bg-primary dark:border-gray-600 text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <svg
              width='30'
              height='30'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='stroke-current text-primary-focus dark:text-gray-800 transform transition-transform duration-500 ease-in-out'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
              ></path>
            </svg>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{sales} AED</p>
            <p>Total Sales</p>
          </div>
        </div>
      </div>

      <div className='mt-2'>
        <h2 className='text-2xl'>Recent Transactions</h2>
        <div className='overflow-x-auto'>
          <table className='table w-full mt-4'>
            <thead>
              <tr>
                <th></th>
                <th>Member</th>
                <th>Description</th>
                <th>Paid</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Nestor Kenneth</td>
                <td>for pool</td>
                <td>100usd</td>
                <td>{Date.now().toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default function DashboardPage() {
  const outlet = useStore((state) => state.outlet);

  return (
    <Container>
      <PageContent outlet={outlet} />
    </Container>
  );
}
