import { useEffect, useState } from 'react';
import Container from '../../components/admin/';
import Table from '../../components/tables/Table';
import {
  getAllMembers,
  getAllMembersByMonth,
  getAllMembersCurrentDay,
} from '../../utils/firebase';
import toast from 'react-hot-toast';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import baseUrl from 'utils/baseUrl';
import { useStore } from '../../components/admin/';

// const COLUMNS = [
//   {
//     Header: 'Name',
//     accessor: 'name',
//   },
//   {
//     Header: 'Email',
//     accessor: 'email',
//   },
//   {
//     Header: 'Account Type',
//     accessor: 'userType',
//   },
//   {
//     Header: 'Paid',
//     accessor: 'paid',
//   },
//   {
//     Header: 'Issued Date',
//     accessor: 'issueDate',
//   },
//   {
//     Header: 'Expiry Date',
//     accessor: 'expiryDate',
//   },
//   {
//     Header: 'OTP',
//     accessor: 'otp',
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
//                 Delete Member
//               </a>
//             </li>
//             <li>
//               <a className='' onClick={() => {}}>
//                 Paid Member
//               </a>
//             </li>
//             <li>
//               <a className='' onClick={() => {}}>
//                 Reset OTP
//               </a>
//             </li>
//             <li>
//               <a className='' onClick={() => {}}>
//                 Resend OTP Email
//               </a>
//             </li>
//             <li>
//               <a className='' onClick={() => {}}>
//                 Resend Confirmation Email
//               </a>
//             </li>
//           </ul>
//         </div>
//       </>
//     ),
//   },
// ];

function getColumns(deleteUser, resendPaymentEmail, resetMember) {
  return [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Account Type',
      accessor: 'userType',
    },
    {
      Header: 'Paid',
      accessor: 'paid',
    },
    {
      Header: 'Issued Date',
      accessor: 'issueDate',
    },
    {
      Header: 'Expiry Date',
      accessor: 'expiryDate',
    },
    {
      Header: 'OTP',
      accessor: 'otp',
    },
    {
      accessor: 'id',
      disableFilters: true,
      Cell: ({ value, row }) => (
        <>
          <div className="dropdown dropdown-end">
            <div tabIndex="0" className="m-1 btn btn-sm">
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-72"
            >
              <li>
                <a className="" onClick={() => deleteUser(value)}>
                  Delete Member
                </a>
              </li>
              {/* <li>
                <a className='' onClick={() => {}}>
                  Paid Member
                </a>
              </li>
              <li>
                <a className='' onClick={() => {}}>
                  Reset OTP
                </a>
              </li>
              <li>
                <a className='' onClick={() => {}}>
                  Resend OTP Email
                </a>
              </li> */}
              <li>
                <a className="" onClick={() => resendPaymentEmail(value)}>
                  Resend Confirmation Email
                </a>
              </li>
              <li>
                <a className="" onClick={() => resetMember(value)}>
                  Reset Member
                </a>
              </li>
            </ul>
          </div>
        </>
      ),
    },
  ];
}

function PageContent({ user }) {
  const [members, setMembers] = useState([]);
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
        data = await getAllMembersByMonth(
          moment(new Date()).format('YYYY'),
          moment(new Date()).format('MM')
        );
      } else if (option === 'all') {
        data = await getAllMembers();
      } else if (option === 'month') {
        data = await getAllMembersByMonth(
          moment(month).format('YYYY'),
          moment(month).format('MM')
        );
      } else {
        const year = moment(date).format('YYYY');
        const month = moment(date).format('MM');
        const day = moment(date).format('DD');
        data = await getAllMembersCurrentDay(year, month, day);
      }
      setMembers(
        data.map((member) => {
          return {
            ...member,
            paid: member.isPaid.toString(),
          };
        })
      );
      setCSV(
        data.map((member) => {
          return {
            member: member.name,
            email: member.email,
            nationality: member.nationality,
            gender: member.gender,
            mobileNumber: member.mobileNumber,
            employerDetails: member.employerDetails,
            birthdate: member.birthdate,
            accountType: member.userType,
            points: member.points,
            savings: member.savings,
            isPaid: member.isPaid,
            expiryDate: member.expiryDate,
            issueDate: member.issueDate,
          };
        })
      );
      toast.success('Data fetching success!');
    } catch (error) {
      console.log(error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };
  const deleteUser = async (id) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this member? this action is irreversible.'
    );
    if (!confirm) {
      return;
    }
    try {
      const idToken = await user.getIdToken(true);
      await axios.post(`${baseUrl}/member/delete`, {
        id,
        idToken,
      });
      toast.success('Member deleted!');
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error('Error deleting new member');
    }
  };
  const resendPaymentEmail = async (id) => {
    const confirm = window.confirm('Confirm?');
    if (!confirm) {
      return;
    }
    try {
      await axios.post(`${baseUrl}/member/resend-payment-link-id`, {
        id,
      });
      toast.success('Email sent');
    } catch (error) {
      console.log('error');
      console.log(error);
      toast.error('Error resending email');
    }
  };
  const resetMember = async (id) => {
    const confirm = window.confirm('Confirm?');
    if (!confirm) {
      return;
    }
    try {
      const result = await axios.post(`${baseUrl}/member/reset`, {
        id,
      });
      toast.success('Member Reset');
      console.log(result);
      alert('Member Reset');
    } catch (error) {
      console.log('error');
      console.log(error);
      toast.error('Error Resetting Member');
    }
  };
  useEffect(() => {
    fetchData();

    return () => {
      setMembers([]);
      setLoading(false);
    };
  }, [useEffectTrigger]);
  return (
    <>
      <div className="flex justify-between flex-wrap">
        <h2 className="text-4xl font-medium mb-2">Member</h2>
        <div className="flex flex-wrap">
          <div className="flex justify-center mr-2">
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="select select-bordered select-accent w-full max-w-xs mb-3"
            >
              <option value="currentMonth">Current Month</option>
              <option value="all">All</option>
              <option value="month">Set Month and Year</option>
              <option value="date">Set Specific Date</option>
            </select>
          </div>
          {option === 'date' && (
            <input
              value={date}
              defaultValue={date}
              id="date"
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="flex-0 justify-self-start btn btn-accent pl-2 mb-3 mr-2"
            />
          )}
          {option === 'month' && (
            <input
              value={month}
              id="date"
              type="month"
              onChange={(e) => {
                console.log(e.target.value);
                setMonth(e.target.value);
              }}
              className="flex-0 justify-self-start btn btn-accent pl-2 mb-3 mr-2"
            />
          )}

          <button
            className="btn btn-accent mr-2"
            onClick={() => {
              setuseEffectTrigger(new Date());
            }}
          >
            FETCH DATA
          </button>
          <CSVLink
            data={CSV}
            filename={'members.csv'}
            className="btn btn-primary"
            target="_blank"
          >
            DOWNLOAD MEMBERS
          </CSVLink>
        </div>
      </div>
      {!loading && (
        <Table
          dataDb={members}
          COLUMNS={getColumns(deleteUser, resendPaymentEmail, resetMember)}
          hiddenColumns={['expiryDate', 'issueDate', 'otp']}
        />
      )}
    </>
  );
}

export default function MembersPage() {
  const user = useStore((state) => state.user);

  return (
    <Container>
      <PageContent user={user} />
    </Container>
  );
}
