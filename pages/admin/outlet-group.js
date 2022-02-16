import { useState, useEffect } from 'react';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';

import {
  getAllOutletGroup,
  addOutletGroup,
  updateOutletGroup,
  deleteOutletGroup,
} from '../../utils/firebase';
import { async } from '@firebase/util';

export default function OutletGroupPage() {
  const [outletgroup, setOutletGroup] = useState([]);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState('');
  const [id, setId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllOutletGroup();
      setOutletGroup(data);
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
      if (!isEdit) {
        await addOutletGroup(name);
        toast.success('Added new outlet group');
      } else {
        await updateOutletGroup(id, name);
        toast.success('Updated outlet group');
      }

      setName('');
      setId(null);
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error('Error adding outlet group');
    }
  };

  const editOutGroup = (id) => {
    setId(id);
    setIsEdit(true);

    const group = outletgroup.find((group) => group.id === id);

    setName(group.name);
  };

  const deleteReg = async (id) => {
    try {
      await deleteOutletGroup(id);
      toast.success('Outlet Group Deleted');
      fetchData();
    } catch (error) {
      toast.error('Outlet Group Delete Error');
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setOutletGroup([]);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      <h2 className='text-4xl font-medium mb-2'>Outlet Group</h2>
      <div className='md:flex'>
        <div className='mt-6 flex-grow pl-1' style={{ maxWidth: '400px' }}>
          <h2 className='text-2xl font-medium'>
            {isEdit ? 'Edit Outlet Group' : ' Add New'}
          </h2>
          <form className='mt-6' onSubmit={(e) => handleSubmit(e)}>
            <div className='form-control flex-grow mr-4 mb-4'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                required
                placeholder='outlet group name'
                className='input mb-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <input
                type='submit'
                value={isEdit ? 'UPDATE REGION' : ' ADD NEW'}
                className='btn btn-primary'
              />
            </div>
          </form>
        </div>
        <div className='mt-6 flex-grow'>
          <table className='table w-full mt-4'>
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
              {outletgroup.map((region) => (
                <tr key={region.id}>
                  <td>{region.name}</td>
                  <td>
                    {region.name.toString().toLowerCase() !== 'single' && (
                      <div className='dropdown dropdown-end ml-2'>
                        <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                          <i className='fas fa-ellipsis-v'></i>{' '}
                        </div>
                        <ul
                          tabIndex='0'
                          className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                        >
                          <li>
                            <a onClick={() => editOutGroup(region.id)}>Edit</a>
                          </li>
                          <li>
                            <a onClick={() => deleteReg(region.id)}>Delete</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
