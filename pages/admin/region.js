import { useState, useEffect } from 'react';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';

import {
  getRegions,
  addRegion,
  updateRegion,
  deleteRegion,
} from '../../utils/firebase';

export default function Region() {
  const [regions, setRegions] = useState([]);

  const [name, setName] = useState('');
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState('');
  const [id, setId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRegions();
      setOrder(data.length + 1);
      setRegions(data);
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
        if (order === 0) return toast.error('Please Wait');
        await addRegion(name, order);
        toast.success('Added new region');
      } else {
        await updateRegion(id, name);
        toast.success('Updated region');
      }

      setName('');
      setId(null);
      fetchData();
    } catch (error) {
      toast.error('Error adding feature');
    }
  };

  const editReg = (id) => {
    setId(id);
    setIsEdit(true);

    const region = regions.find((region) => region.id === id);

    setName(region.name);
  };

  const deleteReg = (id) => {
    deleteRegion(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();

    return () => {
      setRegions([]);
      setOrder(0);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      <h2 className='text-4xl font-medium mb-2'>Feature</h2>
      <div className='md:flex'>
        <div className='mt-6 flex-grow pl-1' style={{ maxWidth: '400px' }}>
          <h2 className='text-2xl font-medium'>
            {isEdit ? 'Edit Feature' : ' Add New'}
          </h2>
          <form className='mt-6' onSubmit={(e) => handleSubmit(e)}>
            <div className='form-control flex-grow mr-4 mb-4'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                required
                placeholder='region name'
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
              {regions.map((region) => (
                <tr key={region.id}>
                  <td>{region.name}</td>
                  <td>
                    {region.name.toString().toLowerCase() !== 'no region' && (
                      <div className='dropdown dropdown-end ml-2'>
                        <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                          <i className='fas fa-ellipsis-v'></i>{' '}
                        </div>
                        <ul
                          tabIndex='0'
                          className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                        >
                          <li>
                            <a onClick={() => editReg(region.id)}>Edit</a>
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
