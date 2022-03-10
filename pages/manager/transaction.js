import Container from '../../components/manager/';
import { useEffect, useState } from 'react';
import {
  getAllTransactionsByOutlet,
  getAllTransactionsByMonthByOutlet,
  getAllTransactionsCurrentDayByOutlet,
} from '../../utils/firebase';
import toast from 'react-hot-toast';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import Table from '../../components/tables/Table';
import { useStore } from '../../components/manager/';

const COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Paid',
    accessor: 'totalPrice',
    Cell: ({ value }) => 'AED ' + (Math.round(value * 100) / 100).toFixed(2),
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
];

function PageContent({ outlet }) {
  const [transactions, setTransactions] = useState([]);
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
        data = await getAllTransactionsByMonthByOutlet(
          moment(new Date()).format('YYYY'),
          moment(new Date()).format('MM'),
          outlet.outlet
        );
      } else if (option === 'all') {
        data = await getAllTransactionsByOutlet(outlet.outlet);
      } else if (option === 'month') {
        data = await getAllTransactionsByMonthByOutlet(
          moment(month).format('YYYY'),
          moment(month).format('MM'),
          outlet.outlet
        );
      } else {
        const year = moment(date).format('YYYY');
        const month = moment(date).format('MM');
        const day = moment(date).format('DD');
        data = await getAllTransactionsCurrentDayByOutlet(
          year,
          month,
          day,
          outlet.outlet
        );
      }
      setTransactions(
        data.map((transaction) => {
          return {
            ...transaction,
            date:
              transaction.year +
              '-' +
              transaction.month +
              '-' +
              transaction.day,
          };
        })
      );
      setCSV(
        data.map((transaction) => {
          return {
            member: transaction.name,
            accountType: transaction.userType,
            amountPaid: transaction.amountPaid,
            date:
              transaction.year +
              '-' +
              transaction.month +
              '-' +
              transaction.day,
          };
        })
      );
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
      setTransactions([]);
      setLoading(false);
    };
  }, [useEffectTrigger]);

  return (
    <>
      <div className='flex justify-between flex-wrap'>
        <h2 className='text-4xl font-medium mb-2'>Transaction</h2>
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
            filename={'transactions.csv'}
            className='btn btn-primary'
            target='_blank'
          >
            DOWNLOAD TRANSACTIONS
          </CSVLink>
        </div>
      </div>
      {!loading && <Table dataDb={transactions} COLUMNS={COLUMNS} />}
    </>
  );
}
export default function TransactionPage() {
  const outlet = useStore((state) => state.outlet);

  return (
    <Container>
      <PageContent outlet={outlet} />
    </Container>
  );
}
