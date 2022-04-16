import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Container from '../../../components/admin/';
import Image from 'next/image';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../utils/firebase';
import ReactQuill from '../../../components/ReactQuill';
import GmapDragMarker from '../../../components/GmapDragMarker';
import toast from 'react-hot-toast';
import {
  getCategories,
  getFeatures,
  getRegions,
  updateOutlet,
  getOutlet,
  getAllOutletGroup,
} from '../../../utils/firebase';

export default function EditOutletPage() {
  const router = useRouter();
  const { id } = router.query;

  const [outletgroups, setOutletgroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [regions, setRegions] = useState([]);

  const [generalFields, setGeneralFields] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [outletgroup, setOutletgroup] = useState(null);
  const [category, setCategory] = useState(null);
  const [region, setRegion] = useState(null);
  const [feature, setFeature] = useState(null);
  const [logo, setLogo] = useState('/no-logo.jpg');
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState({
    lat: '',
    long: '',
  });
  const [socials, setSocials] = useState({
    video: '',
    website: '',
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: '',
    whatsapp: '',
  });

  const [yasalam, setYasalam] = useState(true);
  const [experience, setExperience] = useState(false);
  const [isBranch, setIsBranch] = useState(false);

  const uploadImage = (file, type) => {
    if (!file) return;

    const storageRef = ref(storage, `outlets/${Date.now() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        return err;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          if (type === 'multiple') {
            setGallery([...gallery, url]);
          } else {
            setLogo(url);
          }
        });
      }
    );
  };
  const removeImage = (url) => {
    const filterImages = gallery.filter((m) => m !== url);
    setGallery(filterImages);
  };

  const fetchData = async () => {
    try {
      const data = await getOutlet(id);
      const category = await getCategories();
      const feature = await getFeatures();
      const region = await getRegions();
      const outletgroup = await getAllOutletGroup();

      setGeneralFields({
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
      });
      setSocials({
        video: data.video,
        website: data.website,
        facebook: data.facebook,
        twitter: data.twitter,
        youtube: data.youtube,
        instagram: data.instagram,
        whatsapp: data.whatsapp,
      });

      setOutletgroup({ id: data.outletgroupId, name: data.outletgroupName });

      const cat = category.find((el) => el.id === data.categoryId);
      if (!cat) {
        setCategory(category[0].id);
      } else {
        setCategory(data.categoryId);
      }
      const feat = feature.find((el) => el.id === data.featureId);
      if (!feat) {
        setFeature(feature[0].id);
      } else {
        setFeature(data.featureId);
      }
      const reg = region.find((el) => el.id === data.regionId);
      if (!reg) {
        setRegion(region[0].id);
      } else {
        setRegion(data.regionId);
      }

      setLogo(data.logo);

      setGallery(data.gallery);

      setDescription(data.description);

      setCoords({
        lat: data.latitude,
        long: data.longitude,
      });

      setYasalam(data.yasalam);

      setExperience(data.experience);

      setIsBranch(data.isBranch);

      setCategories(category);
      setFeatures(feature);
      setRegions(region);
      setOutletgroups(outletgroup);
      toast.success('Data fetching success!');
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cat = categories.find((c) => c.id === category);
    const feat = features.find((f) => f.id === feature);
    const reg = regions.find((r) => r.id === region);
    const outlet = {
      ...generalFields,
      ...socials,
      logo,
      gallery,
      description,
      yasalam,
      experience,
      isBranch,
      categoryName: cat.name,
      categoryId: cat.id,
      categoryRef: cat.id,
      regionName: reg.name,
      regionId: reg.id,
      regionRef: reg.id,
      featureName: feat.name,
      featureId: feat.id,
      featureRef: feat.id,
      latitude: String(coords.lat),
      longitude: String(coords.long),
      outletgroupName: outletgroup.name,
      outletgroupId: outletgroup.id,
    };
    try {
      await updateOutlet(id, outlet);
      toast.success('Outlet updated');
    } catch (error) {
      console.log(error);
      toast.error('Error updating outlet');
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setCategories([]);
      setFeatures([]);
      setRegions([]);
    };
  }, []);

  return (
    <Container>
      <h2 className='text-4xl font-medium'>Update Outlet</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='md:flex'>
          <div name='feature' className='form-control mr-1'>
            <label className='label'>
              <span className='label-text'>Outlet Group</span>
            </label>
            <select
              className='select select-bordered w-full'
              onChange={(e) => {
                const og = outletgroups.find((og) => og.id === e.target.value);
                setOutletgroup(og);
                console.log(og);
              }}
            >
              {outletgroups.map((og, i) => (
                <option
                  key={i}
                  value={og.id}
                  selected={og.id === outletgroup.id}
                >
                  {og.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* first row */}
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              type='text'
              name='name'
              placeholder='name'
              className='input input-bordered'
              required
              value={generalFields.name}
              onChange={(e) =>
                setGeneralFields({ ...generalFields, name: e.target.value })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Address</span>
            </label>
            <input
              type='text'
              name='address'
              placeholder='address'
              className='input input-bordered'
              value={generalFields.address}
              onChange={(e) =>
                setGeneralFields({ ...generalFields, address: e.target.value })
              }
            />
          </div>
        </div>
        {/* second row */}
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Phone Number</span>
            </label>
            <input
              type='text'
              placeholder='phone'
              className='input input-bordered'
              value={generalFields.phone}
              onChange={(e) =>
                setGeneralFields({ ...generalFields, phone: e.target.value })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Email Address</span>
            </label>
            <input
              type='text'
              name='email'
              placeholder='email'
              className='input input-bordered'
              value={generalFields.email}
              onChange={(e) =>
                setGeneralFields({ ...generalFields, email: e.target.value })
              }
            />
          </div>
        </div>
        {/* third row */}
        <div className='md:flex items-end'>
          <div className='flex-grow'>
            <div className='form-control mr-1'>
              <label className='label'>
                <span className='label-text'>Category</span>
              </label>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className='select select-bordered w-full'
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat.id} selected={cat.id === category}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div name='region' className='form-control mr-1'>
              <label className='label'>
                <span className='label-text'>Region</span>
              </label>
              <select
                className='select select-bordered w-full'
                onChange={(e) => {
                  setRegion(e.target.value);
                }}
              >
                {regions.map((reg, i) => (
                  <option key={i} value={reg.id} selected={reg.id === region}>
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>
            <div name='feature' className='form-control mr-1'>
              <label className='label'>
                <span className='label-text'>Feature</span>
              </label>
              <select
                className='select select-bordered w-full'
                onChange={(e) => {
                  setFeature(e.target.value);
                }}
              >
                {features.map((feat, i) => (
                  <option
                    key={i}
                    value={feat.id}
                    selected={feat.id === feature}
                  >
                    {feat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* logo */}
          <div className='flex-grow'>
            <div className='flex flex-col justify-center items-center'>
              <Image
                src={logo}
                alt='Logo'
                width={150}
                height={150}
                className='object-cover'
                unoptimized
              />
              <label className='btn btn-primary mt-2'>
                Upload Logo
                <input
                  type='file'
                  className='invisible w-0'
                  onChange={(e) => {
                    uploadImage(e.target.files[0], 'single');
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        {/* gallery */}
        <div>
          <label className='label'>
            <span className='label-text'>Gallery</span>
          </label>
          <div className='flex flex-wrap'>
            {gallery.map((url, i) => (
              <div
                key={i}
                className='flex flex-col justify-center items-center mr-2 mb-2'
              >
                <Image
                  src={url}
                  alt='Logo'
                  width={150}
                  height={150}
                  className='object-cover'
                  unoptimized
                />
                <button
                  className='btn btn-primary mt-2'
                  onClick={() => removeImage(url)}
                >
                  remove
                </button>
              </div>
            ))}
            <div className='flex flex-col justify-center items-center mr-2'>
              <label className='btn btn-primary mt-2'>
                Add
                <input
                  type='file'
                  className='invisible w-0'
                  onChange={(e) => uploadImage(e.target.files[0], 'multiple')}
                />
              </label>
            </div>
          </div>
        </div>
        {/* wyswyg */}
        <div className='my-4'>
          <label className='label'>
            <span className='label-text'>Description</span>
          </label>
          <ReactQuill value={description} onChange={setDescription} />
        </div>
        {/* gmap */}
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1 mb-2'>
            <label className='label'>
              <span className='label-text'>Latitude</span>
            </label>
            <input
              type='text'
              placeholder='latitude'
              className='input input-bordered'
              value={coords.lat}
              onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
            />
          </div>
          <div className='form-control flex-grow ml-1 mb-2'>
            <label className='label'>
              <span className='label-text'>Longitude</span>
            </label>
            <input
              type='text'
              placeholder='longitude'
              className='input input-bordered'
              value={coords.long}
              onChange={(e) => setCoords({ ...coords, long: e.target.value })}
            />
          </div>
        </div>
        <GmapDragMarker setCoords={setCoords} />
        {/* youtube and socials */}
        <div className='md:flex'>
          <div className='form-control flex-grow'>
            <label className='label'>
              <span className='label-text'>Youtube Link</span>
            </label>
            <input
              type='text'
              name='video'
              placeholder='video'
              className='input input-bordered'
              value={socials.video}
              onChange={(e) =>
                setSocials({ ...socials, video: e.target.value })
              }
            />
          </div>
        </div>
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Website</span>
            </label>
            <input
              type='text'
              name='website'
              placeholder='website'
              className='input input-bordered'
              value={socials.website}
              onChange={(e) =>
                setSocials({ ...socials, website: e.target.value })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Facebook</span>
            </label>
            <input
              type='text'
              name='facebook'
              placeholder='facebook'
              className='input input-bordered'
              value={socials.facebook}
              onChange={(e) =>
                setSocials({ ...socials, facebook: e.target.value })
              }
            />
          </div>
        </div>
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Twitter</span>
            </label>
            <input
              type='text'
              name='twitter'
              placeholder='twitter'
              className='input input-bordered'
              value={socials.twitter}
              onChange={(e) =>
                setSocials({ ...socials, twitter: e.target.value })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Youtube</span>
            </label>
            <input
              type='text'
              placeholder='youtube'
              name='youtube'
              className='input input-bordered'
              value={socials.youtube}
              onChange={(e) =>
                setSocials({ ...socials, youtube: e.target.value })
              }
            />
          </div>
        </div>
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Instagram</span>
            </label>
            <input
              type='text'
              name='instagram'
              placeholder='instagram'
              className='input input-bordered'
              value={socials.instagram}
              onChange={(e) =>
                setSocials({ ...socials, instagram: e.target.value })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>WhatsApp</span>
            </label>
            <input
              type='text'
              name='whatsapp'
              placeholder='whatsapp'
              className='input input-bordered'
              value={socials.whatsapp}
              onChange={(e) =>
                setSocials({ ...socials, whatsapp: e.target.value })
              }
            />
          </div>
        </div>
        {/* show yasalam/experience */}
        <div className='card bordered mt-4'>
          <div className='form-control'>
            <label className='cursor-pointer label'>
              <span className='label-text text-xl'>Show in Yasalam?</span>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='toggle toggle-lg toggle-accent'
                  checked={yasalam && 'checked'}
                  name='yasalam'
                  value={yasalam}
                  onChange={(e) => setYasalam(!yasalam)}
                />
              </div>
            </label>
          </div>
        </div>
        <div className='card bordered'>
          <div className='form-control'>
            <label className='cursor-pointer label'>
              <span className='label-text text-xl'>Show in Experience?</span>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='toggle toggle-lg toggle-accent'
                  checked={experience && 'checked'}
                  name='experience'
                  value={experience}
                  onChange={(e) => setExperience(!experience)}
                />
              </div>
            </label>
          </div>
        </div>
        <div className='card bordered'>
          <div className='form-control'>
            <label className='cursor-pointer label'>
              <span className='label-text text-xl'>Is Branch?</span>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='toggle toggle-lg toggle-accent'
                  checked={isBranch && 'checked'}
                  name='isBranch'
                  value={isBranch}
                  onChange={(e) => setIsBranch(!isBranch)}
                />
              </div>
            </label>
          </div>
        </div>
        <button type='submit' className='btn btn-primary mt-4'>
          Submit
        </button>
      </form>
    </Container>
  );
}
