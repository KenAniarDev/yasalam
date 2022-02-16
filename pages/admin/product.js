import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  storage,
} from '../../utils/firebase';
import Container from '../../components/admin/';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
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

        await addProduct(name, image, description, points, quantity);

        toast.success('Added new product');
      } else {
        if (id === null) return toast.error('Error select a product');
        await updateProduct(id, name, image, description, points, quantity);

        toast.success('Updated product');
      }

      setId(null);
      setName('');
      setImage(null);
      setDescription('');
      setPoints(1);
      setQuantity(1);

      fetchData();
    } catch (error) {
      toast.error('Error adding product');
    }
  };

  const uploadImage = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `products/${Date.now() + file.name}`);
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

    const product = products.find((prod) => prod.id === id);

    setName(product.name);
    setImage(product.image);
  };

  const deleteCat = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Product Deleted');
      fetchData();
    } catch (error) {
      toast.error('Product Delete Error');
    }
  };

  const filter = (text) => {
    console.log(text);
    const newData = products.filter((data) => {
      const regex = new RegExp(`${text}`, 'gi');
      return data.name.match(regex);
    });
    setFilteredProducts(newData);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setProducts([]);
      setLoading(false);
    };
  }, []);
  return (
    <Container>
      <div className='flex flex-wrap justify-between items-center p-2'>
        <h2 className='text-4xl font-medium mb-2'>Product</h2>
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
            {isEdit ? 'Edit Product' : ' Add New'}
          </h2>
          <form className='mt-6' onSubmit={(e) => handleSubmit(e)}>
            <div className='form-control flex-grow mr-4 mb-4'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                required
                placeholder='product name'
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

              <label className='label'>
                <span className='label-text'>Description</span>
              </label>
              <textarea
                name='employerDetails'
                className='textarea textarea-bordered h-24'
                placeholder='product description'
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label className='label'>
                <span className='label-text'>Points</span>
              </label>
              <input
                type='text'
                required
                placeholder='product points'
                className='input mb-2'
                value={points}
                min='1'
                onChange={(e) => {
                  if (e.target.value < 1) {
                    setPoints(1);
                  } else {
                    setPoints(e.target.value);
                  }
                }}
              />
              <label className='label'>
                <span className='label-text'>Quantity</span>
              </label>
              <input
                type='text'
                required
                placeholder='product quantity'
                className='input mb-2'
                value={quantity}
                min='1'
                onChange={(e) => {
                  if (e.target.value < 1) {
                    setQuantity(1);
                  } else {
                    setQuantity(e.target.value);
                  }
                }}
              />
            </div>

            <div className='mt-4'>
              <input
                type='submit'
                value={isEdit ? 'UPDATE PRODUCT' : ' ADD NEW'}
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
                <th>Points</th>
                <th>Quantity</th>
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
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className='flex justify-between'>
                      <div className='flex items-center'>
                        <div className='avatar mr-4'>
                          <div className='w-12 h-12 mask mask-squircle'>
                            <Image
                              src={product.image}
                              alt='Product Image'
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.points}</td>
                  <td>{product.quantity}</td>
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
                          <a onClick={() => editCat(product.id)}>Edit</a>
                        </li>
                        <li>
                          <a onClick={() => deleteCat(product.id)}>Delete</a>
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
