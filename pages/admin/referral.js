import { useState, useEffect } from 'react';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';

import {
  getReferrals,
  addReferral,
  updateReferral,
  deleteReferral,
} from '../../utils/firebase';
import { async } from '@firebase/util';

export default function ReferralPage() {
  const [referrals, setReferral] = useState([]);

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getReferrals();
      setReferral(data);
      toast.success('Data fetching success!');
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReferral(count);
      setCount(1);
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error('Error generating referrals');
    }
  };

  const toggleChecked = async (id, state) => {
    try {
      await updateReferral(id, !state);
      toast.success('Referral Updated');
      fetchData();
    } catch (error) {
      toast.error('Referral  Not Updated');
    }
  };

  const deleteReg = async (id) => {
    try {
      await deleteReferral(id);
      toast.success('Referral Deleted');
      fetchData();
    } catch (error) {
      toast.error('Referral Delete Error');
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setReferral([]);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-medium mb-2'>Referrals</h2>
        <form className='flex' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-control w-20 mr-2'>
            <input
              type='number'
              className='input input-bordered mb-2'
              value={count}
              onChange={(e) => {
                if (e.target.value < 1) {
                  setCount(1);
                } else {
                  setCount(e.target.value);
                }
              }}
              min='1'
              required
            />
          </div>

          <input type='submit' value='GENERATE' className='btn btn-primary' />
        </form>
      </div>
      <div className='md:flex'>
        <div className='mt-6 flex-grow pr-2'>
          <table className='table w-full mt-4'>
            <caption>Available</caption>
            <thead>
              <tr>
                <td>Name</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <>
                  <tr>
                    <td>loading...</td>
                    <td></td>
                  </tr>
                </>
              )}
              {referrals.map((referral) => (
                <tr
                  key={referral.id}
                  className={!referral.available && 'hidden'}
                >
                  <td>{referral.id}</td>
                  <td>
                    <div className='dropdown dropdown-end ml-2'>
                      <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                        <i className='fas fa-ellipsis-v'></i>{' '}
                      </div>
                      <ul
                        tabIndex='0'
                        className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                      >
                        <li>
                          <a
                            onClick={() =>
                              toggleChecked(referral.id, referral.available)
                            }
                          >
                            Set to Not Available
                          </a>
                        </li>
                        <li>
                          <a onClick={() => deleteReg(referral.id)}>Delete</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-6 flex-grow'>
          <table className='table w-full mt-4'>
            <caption>Not Available</caption>
            <thead>
              <tr>
                <td>Name</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <>
                  <tr>
                    <td>loading...</td>
                    <td></td>
                  </tr>
                </>
              )}
              {referrals.map((referral) => (
                <tr
                  key={referral.id}
                  className={referral.available && 'hidden'}
                >
                  <td>{referral.id}</td>
                  <td>
                    <div className='dropdown dropdown-end ml-2'>
                      <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                        <i className='fas fa-ellipsis-v'></i>{' '}
                      </div>
                      <ul
                        tabIndex='0'
                        className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                      >
                        <li>
                          <a
                            onClick={() =>
                              toggleChecked(referral.id, referral.available)
                            }
                          >
                            Set to Not Available
                          </a>
                        </li>
                        <li>
                          <a onClick={() => deleteReg(referral.id)}>Delete</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
