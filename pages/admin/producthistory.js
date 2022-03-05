import { useEffect, useState } from 'react';
import Container from '../../components/admin/';
import Table from '../../components/tables/Table';
import {
  getAllProductHistory,
  getAllProductHistoryByMonth,
  getAllProductHistoryCurrentDay,
} from '../../utils/firebase';
import toast from 'react-hot-toast';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import baseUrl from 'utils/baseUrl';
import { useStore } from '../../components/admin/';

// const COLUMNS = [
//   {
//     Header: 'Product',
//     accessor: 'name',
//   },
//   {
//     Header: 'Member Name',
//     accessor: 'memberName',
//   },
//   {
//     Header: 'Member Email',
//     accessor: 'memberEmail',
//   },
//   {
//     Header: 'Bought At',
//     accessor: 'boughtAt',
//   },
//   {
//     Header: 'Claimed',
//     accessor: 'claimed',
//   },
//   {
//     accessor: 'id',
//     disableFilters: true,
//     Cell: ({ value, row }) => (
//       <>
//         <div className='dropdown dropdown-end'>
//           <div tabIndex='0' className='m-1 btn btn-sm'>
//             <i className='fas fa-ellipsis-v'></i>
//           </div>
//           <ul
//             tabIndex='0'
//             className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-72'
//           >
//             <li>
//               <a className='' onClick={() => {}}>
//                 Claimed
//               </a>
//             </li>
//             <li>
//               <a className='' onClick={() => {}}>
//                 Unclaimed
//               </a>
//             </li>
//           </ul>
//         </div>
//       </>
//     ),
//   },
// ];
const getColumns = (claimVoucher, unclaimVoucher) => {
  return [
    {
      Header: 'Product',
      accessor: 'name',
    },
    {
      Header: 'Member Name',
      accessor: 'memberName',
    },
    {
      Header: 'Member Email',
      accessor: 'memberEmail',
    },
    {
      Header: 'Bought At',
      accessor: 'boughtAt',
    },
    {
      Header: 'Claimed',
      accessor: 'claimed',
    },
    {
      accessor: 'id',
      disableFilters: true,
      Cell: ({ value, row }) => (
        <>
          <div className='dropdown dropdown-end'>
            <div tabIndex='0' className='m-1 btn btn-sm'>
              <i className='fas fa-ellipsis-v'></i>
            </div>
            <ul
              tabIndex='0'
              className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-72'
            >
              <li>
                <a className='' onClick={() => claimVoucher(value)}>
                  Claimed
                </a>
              </li>
              <li>
                <a className='' onClick={() => unclaimVoucher(value)}>
                  Unclaimed
                </a>
              </li>
            </ul>
          </div>
        </>
      ),
    },
  ];
};
function PageContent({ user }) {
  const [vouchers, setVouchers] = useState([]);
  const [CSV, setCSV] = useState([]);
  const [loading, setLoading] = useState(false);

  const [useEffectTrigger, setuseEffectTrigger] = useState(new Date());
  const [option, setOption] = useState('date');
  const [month, setMonth] = useState(moment(new Date()).format('YYYY-MM'));
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (option === 'currentMonth') {
        data = await getAllProductHistoryByMonth(
          moment(new Date()).format('YYYY'),
          moment(new Date()).format('MM')
        );
      } else if (option === 'all') {
        data = await getAllProductHistory();
      } else if (option === 'month') {
        data = await getAllProductHistoryByMonth(
          moment(month).format('YYYY'),
          moment(month).format('MM')
        );
      } else {
        const year = moment(date).format('YYYY');
        const month = moment(date).format('MM');
        const day = moment(date).format('DD');
        data = await getAllProductHistoryCurrentDay(year, month, day);
      }
      setVouchers(
        data.map((voucher) => {
          return {
            ...voucher,
            claimed: voucher.claimed.toString(),
          };
        })
      );
      setCSV(
        data.map((voucher) => {
          return {
            product: voucher.name,
            productDescription: voucher.description,
            memberName: voucher.memberName,
            boughtAt: voucher.boughtAt,
            claimed: voucher.claimed.toString(),
          };
        })
      );
      console.log(data.length);
      toast.success('Data fetching success!');
    } catch (error) {
      console.log(error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const claimVoucher = async (id) => {
    const confirm = window.confirm('Confirm!');
    if (!confirm) {
      return;
    }
    try {
      const idToken = await user.getIdToken(true);
      await axios.post(`${baseUrl}/vouchers/claim`, {
        id,
        idToken,
      });
      toast.success('Success');
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error('Error and Failed');
    }
  };
  const unclaimVoucher = async (id) => {
    const confirm = window.confirm('Confirm!');
    if (!confirm) {
      return;
    }
    try {
      const idToken = await user.getIdToken(true);
      await axios.post(`${baseUrl}/vouchers/unclaim`, {
        id,
        idToken,
      });
      toast.success('Success');
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error('Error and Failed');
    }
  };

  useEffect(() => {
    setOption('date');
    fetchData();
    return () => {
      setVouchers([]);
      setLoading(false);
    };
  }, [useEffectTrigger]);
  return (
    <>
      <div className='flex justify-between flex-wrap'>
        <h2 className='text-4xl font-medium mb-2'>Product History</h2>
        <div className='flex flex-wrap'>
          <div className='flex justify-center mr-2'>
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className='select select-bordered select-accent w-full max-w-xs mb-3'
            >
              <option value='currentMonth'>Current Month</option>
              <option value='all'>All</option>
              <option value='month'>Set Month and Year</option>
              <option value='date'>Set Specific Date</option>
            </select>
          </div>
          {option === 'date' && (
            <input
              value={date}
              defaultValue={date}
              id='date'
              type='date'
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className='flex-0 justify-self-start btn btn-accent pl-2 mb-3 mr-2'
            />
          )}
          {option === 'month' && (
            <input
              value={month}
              id='date'
              type='month'
              onChange={(e) => {
                console.log(e.target.value);
                setMonth(e.target.value);
              }}
              className='flex-0 justify-self-start btn btn-accent pl-2 mb-3 mr-2'
            />
          )}

          <button
            className='btn btn-accent mr-2'
            onClick={() => {
              setuseEffectTrigger(new Date());
            }}
          >
            FETCH DATA
          </button>
          <CSVLink
            data={CSV}
            filename={'members.csv'}
            className='btn btn-primary'
            target='_blank'
          >
            DOWNLOAD MEMBERS
          </CSVLink>
        </div>
      </div>
      {!loading && (
        <Table
          dataDb={vouchers}
          COLUMNS={getColumns(claimVoucher, unclaimVoucher)}
          hiddenColumns={[]}
        />
      )}
    </>
  );
}

export default function VouchersPage() {
  const user = useStore((state) => state.user);

  return (
    <Container>
      <PageContent user={user} />
    </Container>
  );
}
