import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../../components/admin/';
import toast from 'react-hot-toast';

import { getOutlets, deleteOutlet } from '../../../utils/firebase';

export default function Index() {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getOutlets();
      setOutlets(data);
      toast.success('Data fetching success!');
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const deleteOut = (id) => {
    deleteOutlet(id);
    toast.success('Outlet Deleted');
    fetchData();
  };

  useEffect(() => {
    fetchData();

    return () => {
      setOutlets([]);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      {/* first row */}
      <div className='flex flex-wrap justify-between items-center p-2'>
        <div className='flex items-center mb-2'>
          <h2 className='text-4xl font-medium mr-2'>Outlets</h2>
          <Link href='/admin/outlet/add'>
            <a className='btn btn-primary'> Add New</a>
          </Link>
        </div>
        <div className='flex items-center mb-2'>
          <div className='form-control w-60'>
            <form className='relative' onSubmit={(e) => handleFilter(e)}>
              <input
                type='text'
                placeholder='Search'
                className='w-full pr-16 input input-primary input-bordered'
                // value={search}
                // onChange={(e) => {
                //   setSearch(e.target.value);
                //   filter(search);
                // }}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none btn btn-primary'
              >
                go
              </button>
            </form>
          </div>
          <button
            className='btn btn-square btn-primary ml-2'
            onClick={() => {
              filter('');
              setSearch('');
            }}
          >
            <i className='fad fa-sync-alt'></i>
          </button>
        </div>
      </div>
      {/* second row */}
      {outlets.length === 0 && (
        <p className='text-center text-2xl font-bold'>loading....</p>
      )}
      {outlets.length > 0 && (
        <table className='table w-full mt-4'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((outlet, i) => (
              <tr key={outlet.id}>
                <th>{i + 1}</th>
                <td>
                  <div className='flex items-center space-x-3'>
                    <div className='avatar'>
                      <div className='w-12 h-12 mask mask-squircle'>
                        <Image
                          src={outlet.logo}
                          alt='outlet logo'
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{outlet.name}</div>
                      <div className='text-sm opacity-50'>
                        {/* {outlet.region} */}Outlet Region
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='flex justify-between items-center'>
                    {/* {outlet.category.name} */}Category Name
                    <div className='dropdown dropdown-end ml-2'>
                      <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                        <i className='fas fa-ellipsis-v'></i>{' '}
                      </div>
                      <ul
                        tabIndex='0'
                        className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                      >
                        <li>
                          <Link href={`/outlet/${outlet.id}`}>
                            <a>View</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/admin/outlet/${outlet.id}`}>
                            <a>Edit</a>
                          </Link>
                        </li>
                        <li>
                          <a onClick={() => deleteOut(outlet.id)}>Delete</a>
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