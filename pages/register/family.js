import { useState, useEffect } from 'react';
import Image from 'next/image';
import nationalities from '../../utils/nationalities';
import gender from '../../utils/gender';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { getAge } from '../../utils/functionHelpers';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function family() {
  const router = useRouter();
  const date = new Date();
  const [formValues, setFormValues] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    mobileNumber: '',
    birthdate: new Date(
      date.getFullYear() - 18,
      date.getMonth(),
      date.getDay()
    ),
    nationality: nationalities[0].name,
    gender: gender[0].value,
    employerDetails: '',
    frontimageID: '',
    backimageID: '',
    userType: 'family', // individual || family || secondary
  });

  const uploadImage = (file, type) => {
    if (!file) return;

    const storageRef = ref(storage, `members/${Date.now() + file.name}`);
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
          console.log(url);
          if (type === 'front') {
            setFormValues({ ...formValues, frontimageID: url });
          } else {
            setFormValues({ ...formValues, backimageID: url });
          }
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getAge(formValues.birthdate) < 18)
      return toast.error(
        'Please check your age. you must be atleast 18 years old'
      );

    if (formValues.frontimageID.length === 0)
      return toast.error('Please Upload Front Image ID');
    if (formValues.backimageID.length === 0)
      return toast.error('Please Upload Back Image ID');

    try {
      const existing = await axios.get(`../api/member/${formValues.email}`);
      if (existing.data) {
        return toast.error('Email already exist');
      } else {
        await axios.post('../api/createMember', formValues);
        return router.push('/create-account-success');
      }
    } catch (error) {
      return toast.error('Error! Please try again ');
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Firstname</span>
            </label>
            <input
              type='text'
              name='firstname'
              placeholder='firstname'
              className='input input-bordered'
              required
              value={formValues.firstname}
              onChange={(e) =>
                setFormValues({ ...formValues, firstname: e.target.value })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Middlename</span>
            </label>
            <input
              type='text'
              name='middlename'
              placeholder='middlename'
              className='input input-bordered'
              value={formValues.middlename}
              onChange={(e) =>
                setFormValues({ ...formValues, middlename: e.target.value })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Lastname</span>
            </label>
            <input
              type='text'
              name='lastname'
              placeholder='lastname'
              className='input input-bordered'
              value={formValues.lastname}
              onChange={(e) =>
                setFormValues({ ...formValues, lastname: e.target.value })
              }
            />
          </div>
        </div>
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              name='email'
              placeholder='email'
              className='input input-bordered'
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  email: e.target.value.toLocaleLowerCase(),
                })
              }
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Mobile Number</span>
            </label>
            <input
              type='text'
              name='mobileNumber'
              placeholder='mobileNumber'
              className='input input-bordered'
              required
              value={formValues.mobileNumber}
              onChange={(e) =>
                setFormValues({ ...formValues, mobileNumber: e.target.value })
              }
            />
          </div>
        </div>
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Birthdate</span>
            </label>
            <DatePicker
              selected={formValues.birthdate}
              onChange={(val) =>
                setFormValues({ ...formValues, birthdate: val })
              }
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              className='btn btn-primary'
            />
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Nationality</span>
            </label>
            <select
              onChange={(e) => {
                setFormValues({ ...formValues, nationality: e.target.value });
              }}
              className='select select-bordered w-full'
            >
              {nationalities.map((nationality, i) => (
                <option key={i} value={nationality.name}>
                  {nationality.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='md:flex'>
          <div className='form-control flex-grow mr-1'>
            <label className='label'>
              <span className='label-text'>Gender</span>
            </label>
            <select
              onChange={(e) => {
                setFormValues({ ...formValues, gender: e.target.value });
              }}
              className='select select-bordered w-full'
            >
              {gender.map((el, i) => (
                <option key={i} value={el.value}>
                  {el.title}
                </option>
              ))}
            </select>
          </div>
          <div className='form-control flex-grow ml-1'>
            <label className='label'>
              <span className='label-text'>Employer Details</span>
            </label>
            <textarea
              name='employerDetails'
              className='textarea textarea-bordered h-24'
              placeholder='employer details'
              value={formValues.employerDetails}
              required
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  employerDetails: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-col justify-center items-center'>
            {formValues.frontimageID.length > 1 && (
              <Image
                src={formValues.frontimageID}
                alt='Logo'
                width={150}
                height={150}
                className='object-cover'
              />
            )}

            <label className='btn btn-primary mt-2'>
              Upload Image ID Front (Required)
              <input
                type='file'
                className='invisible w-0'
                onChange={(e) => {
                  uploadImage(e.target.files[0], 'front');
                }}
              />
            </label>
          </div>
          <div className='flex flex-col justify-center items-center'>
            {formValues.backimageID.length > 1 && (
              <Image
                src={formValues.backimageID}
                alt='Logo'
                width={150}
                height={150}
                className='object-cover'
              />
            )}

            <label className='btn btn-primary mt-2'>
              Upload Image ID Back (Required)
              <input
                type='file'
                className='invisible w-0'
                onChange={(e) => {
                  uploadImage(e.target.files[0], 'back');
                }}
              />
            </label>
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>
          REGISTER
        </button>
      </form>
    </>
  );
}
