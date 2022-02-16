import { useState, useEffect } from 'react';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';

import {
  getFeatures,
  addFeature,
  updateFeature,
  deleteFeature,
} from '../../utils/firebase';

export default function FeaturePage() {
  const [features, setFeatures] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState('');
  const [id, setId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getFeatures();
      setOrder(data.length + 1);
      setFeatures(data);
      setFilteredFeatures(data);
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
        await addFeature(name, icon, order);
        toast.success('Added new feature');
      } else {
        await updateFeature(id, name, icon, order);
        toast.success('Updated feature');
      }

      setName('');
      setIcon('');
      setId(null);
      fetchData();
    } catch (error) {
      toast.error('Error adding feature');
    }
  };

  const editFeat = (id) => {
    setId(id);
    setIsEdit(true);

    const feature = features.find((feature) => feature.id === id);

    setName(feature.name);
    setIcon(feature.icon);
  };

  const deleteFeat = async (id) => {
    try {
      await deleteFeature(id);
      toast.success('Feature Deleted');
      fetchData();
    } catch (error) {
      toast.error('Feature Delete Error');
    }
  };

  const filter = (text) => {
    const newData = features.filter((data) => {
      const regex = new RegExp(`${text}`, 'gi');
      return data.name.match(regex);
    });
    setFilteredFeatures(newData);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setFeatures([]);
      setOrder(0);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      <div className='flex flex-wrap justify-between items-center p-2'>
        <h2 className='text-4xl font-medium mb-2'>Feature</h2>
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
                placeholder='feature name'
                className='input mb-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-control flex-grow mr-4 mb-4'>
              <label className='label'>
                <span className='label-text'>Icon</span>
              </label>
              <input
                type='text'
                required
                placeholder='icon'
                className='input mb-2'
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <input
                type='submit'
                value={isEdit ? 'UPDATE CATEGORY' : ' ADD NEW'}
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
                <td>Icon</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <>
                  <tr>
                    <td>loading...</td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              )}
              {filteredFeatures.map((feature) => (
                <tr key={feature.id}>
                  <td>{feature.name}</td>
                  <td>
                    <i className={feature.icon}></i>
                  </td>
                  <td>
                    {feature.name.toString().toLowerCase() !== 'no feature' && (
                      <div className='dropdown dropdown-end ml-2'>
                        <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                          <i className='fas fa-ellipsis-v'></i>{' '}
                        </div>
                        <ul
                          tabIndex='0'
                          className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                        >
                          <li>
                            <a onClick={() => editFeat(feature.id)}>Edit</a>
                          </li>
                          <li>
                            <a onClick={() => deleteFeat(feature.id)}>Delete</a>
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
