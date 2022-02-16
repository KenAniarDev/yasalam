import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';
import { auth } from '../../utils/firebase';
import axios from 'axios';

export default function ManagerPage() {
  const [managers, setManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const idToken = await auth.currentUser.getIdToken(true);

      const users = await axios.post('../api/manager', { idToken });
      const userManager = users.data.users.filter((element) => {
        if (
          typeof element.customClaims !== 'undefined' &&
          typeof element.customClaims.admin !== 'undefined'
        ) {
          return false;
        }

        return true;
      });
      setManagers(userManager);
      setFilteredManagers(userManager);
      toast.success('Data fetching success!');
    } catch (error) {
      console.log(error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const deleteManager = async (id) => {
    try {
      await deleteOutlet(id);
      toast.success('Manager Deleted');
      fetchData();
    } catch (error) {
      toast.success('Manager Delete Error');
    }
  };

  const filter = (text) => {
    const newData = managers.filter((data) => {
      const regex = new RegExp(`${text}`, 'gi');
      return data.email.match(regex);
    });
    setFilteredManagers(newData);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setManagers([]);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      {/* first row */}
      <div className='flex flex-wrap justify-between items-center p-2'>
        <div className='flex'>
          <h2 className='text-4xl font-medium mb-2 mr-2'>Manager</h2>
          <Link href='/admin/outlet/add'>
            <a className='btn btn-primary'> Add New</a>
          </Link>
        </div>
        <div className='flex items-center mb-2'>
          <div className='form-control w-60'>
            <form
              className='relative'
              onSubmit={(e) => {
                e.preventDefault();
                filter(searchText);
              }}
            >
              <input
                type='text'
                placeholder='Search'
                className='w-full pr-16 input input-primary input-bordered'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none btn btn-primary'
              >
                SEARCH
              </button>
            </form>
          </div>
          <button
            className='btn btn-square btn-primary ml-2'
            onClick={() => {
              filter('');
              setSearchText('');
            }}
          >
            <i className='fad fa-sync-alt'></i>
          </button>
        </div>
      </div>
      {/* second row */}
      {filteredManagers.length === 0 && (
        <p className='text-center text-2xl font-bold'>loading....</p>
      )}
      {filteredManagers.length > 0 && (
        <table className='table w-full mt-4'>
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredManagers.map((manager, i) => (
              <tr key={manager.uid}>
                <th>{i + 1}</th>
                <td>
                  <div className='flex items-center space-x-3'>
                    <div>
                      <div className='font-bold'>{manager.email}</div>
                      {/* <div className='text-sm opacity-50'>
                      
                      </div> */}
                    </div>
                  </div>
                </td>
                <td>
                  <div className='flex justify-between items-center'>
                    {typeof manager.customClaims !== 'undefined'
                      ? manager.customClaims.outletName
                      : 'Not Assigned'}
                    <div className='dropdown dropdown-end ml-2'>
                      <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                        <i className='fas fa-ellipsis-v'></i>{' '}
                      </div>
                      <ul
                        tabIndex='0'
                        className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                      >
                        <li>
                          <Link href={`/outlet/${manager.id}`}>
                            <a>View</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/admin/outlet/${manager.id}`}>
                            <a>Edit</a>
                          </Link>
                        </li>
                        <li>
                          <a onClick={() => deleteOut(manager.id)}>Delete</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}
