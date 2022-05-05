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
  const [outletgroups, setOutletGroups] = useState([]);
  const [filteredOutletGroups, setFilteredOutletGroups] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState('');
  const [id, setId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllOutletGroup();
      setOutletGroups(data);
      setFilteredOutletGroups(data);
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

    const group = outletgroups.find((group) => group.id === id);

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

  const filter = (text) => {
    const newData = outletgroups.filter((data) => {
      const regex = new RegExp(`${text}`, 'gi');
      return data.name.match(regex);
    });
    setFilteredOutletGroups(newData);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setOutletGroups([]);
      setFilteredOutletGroups([]);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      <div className="flex flex-wrap justify-between items-center p-2">
        <h2 className="text-4xl font-medium mb-2">Outlet Group</h2>
        <div className="flex items-center mb-2">
          <div className="form-control w-60">
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                filter(searchText);
              }}
            >
              <input
                type="text"
                placeholder="Search"
                className="w-full pr-16 input input-primary input-bordered"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
              >
                SEARCH
              </button>
            </form>
          </div>
          <button
            className="btn btn-square btn-primary ml-2"
            onClick={() => {
              filter('');
              setSearchText('');
            }}
          >
            <i className="fad fa-sync-alt"></i>
          </button>
        </div>
      </div>
      <div className="md:flex">
        <div className="mt-6 flex-grow pl-1" style={{ maxWidth: '400px' }}>
          <h2 className="text-2xl font-medium">
            {isEdit ? 'Edit Outlet Group' : ' Add New'}
          </h2>
          <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-control flex-grow mr-4 mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                required
                placeholder="outlet group name"
                className="input mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <input
                type="submit"
                value={isEdit ? 'UPDATE OUTLET GROUP' : ' ADD NEW'}
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
        <div className="mt-6 flex-grow">
          <table className="table w-full mt-4">
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
              {filteredOutletGroups.map((region) => (
                <tr key={region.id}>
                  <td>{region.name}</td>
                  <td>
                    {region.name.toString().toLowerCase() !== 'single' && (
                      <div className="dropdown dropdown-end ml-2">
                        <div tabIndex="0" className="m-1 btn btn-xs btn-accent">
                          <i className="fas fa-ellipsis-v"></i>{' '}
                        </div>
                        <ul
                          tabIndex="0"
                          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
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
