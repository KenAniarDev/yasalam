import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';
import axios from 'axios';
import baseUrl from 'utils/baseUrl';
import { useStore } from '../../components/admin/';
import { getOutlets } from '../../utils/firebase';
import base from 'daisyui/dist/base';

function PageContent({ user }) {
  const [managers, setManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordShowModal, setPasswordShowModal] = useState(false);
  const [outlets, setOutlets] = useState([]);

  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [updateMember, setUpdateMember] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const idToken = await user.getIdToken(true);
      const users = await axios.post(`${baseUrl}/manager`, { idToken });
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

      const data = await getOutlets();
      setOutlets(data);
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
      setShowModal(false);

      let outlet;
      for (let index = 0; index < outlets.length; index++) {
        if (selectedOutlet === outlets[index].id) {
          outlet = outlets[index];
        }
      }

      const idToken = await user.getIdToken(true);
      await axios.post(`${baseUrl}/manager/create`, {
        idToken,
        email,
        password,
        outlet: outlet.id,
        outletName: outlet.name,
      });

      setEmail('');
      setPassword('');
      toast.success('Added new user!');
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error('Error adding new user');
    }
  };
  const handleUpdate = async (e) => {
    setPasswordShowModal(false);
    e.preventDefault();
    try {
      const idToken = await user.getIdToken(true);
      await axios.post(`${baseUrl}/manager/change-password`, {
        idToken,
        password,
        uid: updateMember,
      });

      setUpdateMember(null);
      setPassword('');
      toast.success('User password updated!');
      fetchData();
    } catch (error) {
      console.log('error');
      console.log(error);
      toast.error('Error updating user password');
    }
  };

  const deleteManager = async (uid) => {
    try {
      const idToken = await user.getIdToken(true);
      await axios.post(`${baseUrl}/manager/delete`, {
        idToken,
        uid,
      });
      toast.success('User deleted!');
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error('Error deleting new user');
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
    <>
      {/* first row */}
      <div className="flex flex-wrap justify-between items-center p-2">
        <div className="flex">
          <h2 className="text-4xl font-medium mb-2 mr-2">Manager</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            {' '}
            Add New
          </button>
        </div>
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
      {/* second row */}
      {filteredManagers.length === 0 && (
        <p className="text-center text-2xl font-bold">loading....</p>
      )}
      {filteredManagers.length > 0 && (
        <table className="table w-full mt-4">
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
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{manager.email}</div>
                      {/* <div className='text-sm opacity-50'>
                      
                      </div> */}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex justify-between items-center">
                    {typeof manager.customClaims !== 'undefined'
                      ? manager.customClaims.outletName
                      : 'Not Assigned'}
                    <div className="dropdown dropdown-end ml-2">
                      <div tabIndex="0" className="m-1 btn btn-xs btn-accent">
                        <i className="fas fa-ellipsis-v"></i>{' '}
                      </div>
                      <ul
                        tabIndex="0"
                        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a
                            onClick={() => {
                              setUpdateMember(manager.uid);
                              setPasswordShowModal(true);
                            }}
                          >
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a onClick={() => deleteManager(manager.uid)}>
                            Delete
                          </a>
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
      <div>
        <input
          type="checkbox"
          id="my-modal-2"
          className="modal-toggle"
          checked={showModal}
          readOnly
        />
        <div className="modal center-modal">
          <div className="modal-box">
            <h3 className="text-xl text-center font-bold uppercase">
              Add Manager
            </h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div name="feature" className="form-control mr-1">
                <label className="label">
                  <span className="label-text">Outlets</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    setSelectedOutlet(e.target.value);
                  }}
                >
                  {outlets.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-action flex justify-center">
                <button
                  htmlFor="my-modal-2"
                  className="btn btn-primary"
                  type="submit"
                >
                  ADD
                </button>
                <label
                  htmlFor="my-modal-2"
                  className="btn"
                  onClick={() => {
                    setShowModal(false);
                    setEmail('');
                    setPassword('');
                  }}
                >
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          id="my-modal-2"
          className="modal-toggle"
          checked={passwordShowModal}
          readOnly
        />
        <div className="modal center-modal">
          <div className="modal-box">
            <h3 className="text-xl text-center font-bold uppercase">
              UPDATE PASSWORD
            </h3>
            <form onSubmit={(e) => handleUpdate(e)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="modal-action flex justify-center">
                <button
                  htmlFor="my-modal-2"
                  className="btn btn-primary"
                  type="submit"
                >
                  UPDATE
                </button>
                <label
                  htmlFor="my-modal-2"
                  className="btn"
                  onClick={() => {
                    setPasswordShowModal(false);
                    setPassword('');
                  }}
                >
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ManagerPage() {
  const user = useStore((state) => state.user);

  return (
    <Container>
      <PageContent user={user} />
    </Container>
  );
}
