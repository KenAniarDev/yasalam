import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  storage,
} from '../../utils/firebase';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [yasalam, setYasalam] = useState(true);
  const [experience, setExperience] = useState(true);
  const [order, setOrder] = useState(0);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setOrder(data.length + 1);
      setCategories(data);
      setFilteredCategories(data);
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
        if (!image) return toast.error('Image Required');

        if (order === 0) return toast.error('Please Wait');

        await addCategory(name, image, yasalam, experience, order);

        toast.success('Added new category');
      } else {
        if (id === null) return toast.error('Error select a category');
        await updateCategory(id, name, image, yasalam, experience);

        toast.success('Updated category');
      }

      setId(null);
      setName('');
      setImage(null);

      fetchData();
    } catch (error) {
      toast.error('Error adding category');
    }
  };

  const uploadImage = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `categories/${Date.now() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (err) => {
        return err;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
        });
      }
    );
  };

  const editCat = (id) => {
    setId(id);
    setIsEdit(true);

    const category = categories.find((category) => category.id === id);

    setName(category.name);
    setImage(category.image);
    setYasalam(category.yasalam);
    setExperience(category.experience);
  };

  const deleteCat = async (id) => {
    try {
      await deleteCategory(id);
      toast.success('Category Deleted');
      fetchData();
    } catch (error) {
      toast.error('Category Delete Error');
    }
  };

  const filter = (text) => {
    const newData = categories.filter((data) => {
      const regex = new RegExp(`${text}`, 'gi');
      return data.name.match(regex);
    });
    setFilteredCategories(newData);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setCategories([]);
      setFilteredCategories([]);
      setOrder(0);
      setLoading(false);
    };
  }, []);
  return (
    <Container>
      <div className='flex flex-wrap justify-between items-center p-2'>
        <h2 className='text-4xl font-medium mb-2'>Category</h2>
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
        <div className='mt-6 max-w-2xl pl-1'>
          <h2 className='text-2xl font-medium'>
            {isEdit ? 'Edit Category' : ' Add New'}
          </h2>
          <form className='mt-6' onSubmit={(e) => handleSubmit(e)}>
            <div className='form-control flex-grow mr-4 mb-4'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                required
                placeholder='category name'
                className='input mb-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className='label-text'>Image</span>
              {image !== null && (
                <Image
                  src={image}
                  alt='Category Image'
                  width={100}
                  height={100}
                  layout='responsive'
                />
              )}
              <input
                type='file'
                id='image'
                name='image'
                className='input'
                onChange={(e) => uploadImage(e.target.files[0])}
              />
            </div>
            <div className='form-control flex-grow mr-4'>
              <label className='cursor-pointer label'>
                <span className='label-text'>Show/Hide Yasalam</span>
                <input
                  type='checkbox'
                  checked={yasalam}
                  onChange={(e) => setYasalam(!yasalam)}
                  className='toggle'
                />
              </label>
            </div>
            <div className='form-control flex-grow mr-4'>
              <label className='cursor-pointer label'>
                <span className='label-text'>Show/Hide Experience</span>
                <input
                  type='checkbox'
                  checked={experience}
                  onChange={(e) => setExperience(!experience)}
                  className='toggle'
                />
              </label>
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
                <th>Name</th>
                <th>Yasalam</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <>
                  <tr>
                    <td>loading....</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              )}
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className='flex justify-between'>
                      <div className='flex items-center'>
                        <div className='avatar mr-4'>
                          <div className='w-12 h-12 mask mask-squircle'>
                            <Image
                              src={category.image}
                              alt='Category Image'
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                          {category.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {category.yasalam ? (
                      <i className='fas fa-eye mr-2'></i>
                    ) : (
                      <i className='far fa-eye-slash mr-2'></i>
                    )}
                  </td>
                  <td>
                    {category.experience ? (
                      <i className='fas fa-eye mr-2'></i>
                    ) : (
                      <i className='far fa-eye-slash mr-2'></i>
                    )}
                  </td>
                  <td>
                    {category.name.toString().toLowerCase() !==
                      'uncategorized' && (
                      <div className='dropdown dropdown-end ml-2'>
                        <div tabIndex='0' className='m-1 btn btn-xs btn-accent'>
                          <i className='fas fa-ellipsis-v'></i>{' '}
                        </div>
                        <ul
                          tabIndex='0'
                          className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
                        >
                          <li>
                            <a onClick={() => editCat(category.id)}>Edit</a>
                          </li>
                          <li>
                            <a onClick={() => deleteCat(category.id)}>Delete</a>
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
