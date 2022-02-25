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
import Link from 'next/link';
import PhoneInput from 'react-phone-number-input';
import baseUrl from '../../utils/baseUrl';

export default function individual() {
  const router = useRouter();
  const date = new Date();
  const [isAccepted, setIsAccepted] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    mobileNumber: '',
    birthdate: new Date(
      date.getFullYear() - 18,
      date.getMonth(),
      date.getDate()
    ),
    nationality: nationalities[0].name,
    gender: gender[0].value,
    employerDetails: '',
    frontimageID: '',
    backimageID: '',
    userType: 'individual', // individual || family || secondary
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
    const confirm = window.confirm('Please Confirm the Details you entered');
    if (confirm) {
      if (typeof formValues.mobileNumber === 'undefined')
        return toast.error('Please add a mobile number');
      if (getAge(formValues.birthdate) < 18)
        return toast.error(
          'Please check your age. you must be atleast 18 years old'
        );

      if (formValues.frontimageID.length === 0)
        return toast.error('Please Upload Front Image ID');
      if (formValues.backimageID.length === 0)
        return toast.error('Please Upload Back Image ID');

      try {
        const existing = await axios.get(
          `${baseUrl}/member/${formValues.email}`
        );
        if (existing.data) {
          return toast.error('Email already exist');
        } else {
          await axios.post(`${baseUrl}/member/create`, formValues);
          return router.push(
            `/create-account-success?email=${formValues.email}`
          );
        }
      } catch (error) {
        return toast.error('Error! Please try again ');
      }
    }
  };

  return (
    <>
      <div className='container'>
        <img
          src={'/pattern1920x1080.png'}
          alt=''
          className='fixed top-0 left-0 right-0 bottom-0 h-full w-full object-cover'
        />
        <div
          className='fixed top-0 left-0 right-0 bottom-0 h-full overflow-x-scroll'
          style={{ backgroundColor: 'rgba(0,0,0, .4)' }}
        >
          <div
            className='w-full lg:w-2/3 max-w-3xl h-auto items-center md:my-10 mx-auto p-5 md:rounded-xl'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
          >
            <figure className='px-10 pt-10 flex justify-center'>
              <img
                src='/logo192.png'
                className='rounded-xl login-logo'
                alt=''
                style={{ width: '100px' }}
              />
            </figure>
            <h2 className='text-2xl text-center mt-4 font-semibold uppercase'>
              Register as Individual Member
            </h2>
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
                      setFormValues({
                        ...formValues,
                        firstname: e.target.value,
                      })
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
                      setFormValues({
                        ...formValues,
                        middlename: e.target.value,
                      })
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
                      setFormValues({
                        ...formValues,
                        lastname: e.target.value,
                      })
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
                        email: e.target.value.trim().toLocaleLowerCase(),
                      })
                    }
                  />
                </div>
                <div className='form-control flex-grow ml-1'>
                  <label className='label'>
                    <span className='label-text'>Mobile Number</span>
                  </label>
                  <PhoneInput
                    placeholder='Enter phone number'
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry='AE'
                    value={formValues.mobileNumber}
                    required
                    onChange={(value) =>
                      setFormValues({
                        ...formValues,
                        mobileNumber: value,
                      })
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
                    className='input input-bordered'
                  />
                </div>
                <div className='form-control flex-grow ml-1'>
                  <label className='label'>
                    <span className='label-text'>Nationality</span>
                  </label>
                  <select
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        nationality: e.target.value,
                      });
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
                      setFormValues({
                        ...formValues,
                        gender: e.target.value,
                      });
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
              <div className='flex flex-wrap justify-center mt-6'>
                <div className='flex flex-col justify-center items-center mt-4 mx-2'>
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
                      accept='image/*'
                      type='file'
                      className='invisible w-0'
                      onChange={(e) => {
                        uploadImage(e.target.files[0], 'front');
                      }}
                    />
                  </label>
                </div>
                <div className='flex flex-col justify-center items-center mt-4 mx-2'>
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
                      accept='image/*'
                      type='file'
                      className='invisible w-0'
                      onChange={(e) => {
                        uploadImage(e.target.files[0], 'back');
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className='flex items-center mt-6'>
                <input
                  type='checkbox'
                  checked={isAccepted}
                  onChange={() => setIsAccepted(!isAccepted)}
                  className='mr-1'
                />
                <p>
                  By creating an account, you agree to our
                  <Link href='/terms'>
                    <a className='font-semibold text-secondary mx-2'>
                      Terms of Service
                    </a>
                  </Link>{' '}
                  and
                  <Link href='/privacy'>
                    <a className='font-semibold text-secondary mx-1'>
                      Privacy Policy
                    </a>
                  </Link>
                </p>
              </div>
              <div className='flex justify-center mt-6'>
                <button
                  type='submit'
                  disabled={!isAccepted}
                  className='btn btn-primary'
                >
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div>
        <input
          type='checkbox'
          id='my-modal-2'
          className='modal-toggle'
          checked={isShow}
          onChange={() => {}}
        />
        <div className='modal'>
          <div className='modal-box flex flex-col items-center relative'>
            <h2 className='font-semibold text-xl text-center uppercase'>
              Please Confirm the Details you entered
            </h2>

            <div className='flex mt-10'>
              <button
                className='btn btn-primary mr-2'
                onClick={() => {
                  setIsShow(false);
                }}
              >
                Confirm
              </button>
              <button
                disabled={!isAccepted}
                className='btn btn-secondary'
                type='submit'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
