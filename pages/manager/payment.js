import { useState } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('modern-react-qr-reader'), {
  ssr: false,
});
import Container from '../../components/manager/';
import axios from 'axios';
import baseUrl from 'utils/baseUrl';
import toast from 'react-hot-toast';
import { addTransaction } from '../../utils/firebase';
import { useStore } from '../../components/manager/';

function PageContent({ outlet }) {
  const [paymentDesciption, setPaymentDesciption] = useState('----');
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [member, setMember] = useState(null);
  const [isHandlingScan, setIsHandlingScan] = useState(false);

  const handleScan = async (data) => {
    if (data && !isHandlingScan) {
      setIsHandlingScan(true);

      try {
        const result = await axios.get(`${baseUrl}/member/get-info/${data}`);
        const member = result.data;
        console.log(member);

        if (member) {
          setMember(member);
          toast.success('Get Member Success');
        } else {
          throw new Error('Error');
        }
      } catch (error) {
        toast.error('Member not found');
      } finally {
        setTimeout(() => {
          setIsHandlingScan(false);
        }, 3000);
      }
    }
  };
  const handleError = () => {
    setIsHandlingScan(true);
    toast.error('User not found');
    setTimeout(() => {
      setIsHandlingScan(false);
    }, 3000);
  };

  const createTransaction = async (e) => {
    console.log('submit');
    e.preventDefault();
    setIsHandlingScan(true);

    const originalPrice = amount;
    const totalPrice = amount - amount * (discount / 100);
    const saveMoney = originalPrice - totalPrice;

    try {
      await addTransaction(
        member,
        outlet,
        originalPrice,
        discount,
        totalPrice,
        saveMoney,
        paymentDesciption
      );
      setPaymentDesciption('----');
      setAmount(0);
      setDiscount(0);
      setMember(null);

      toast.success('Member transaction success');
    } catch (error) {
      console.log(error);
      toast.error('Error Please Try Again');
    } finally {
      setTimeout(() => {
        setIsHandlingScan(false);
      }, 3000);
    }
  };

  return (
    <>
      <h2 className='text-4xl font-medium mb-2'>Payment Page</h2>
      <div className='pb-10 pr-5'>
        <div className='md:flex'>
          <div className='flex-grow md:w-1/2'>
            <form onSubmit={createTransaction}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Payment Description</span>
                </label>
                <input
                  type='text'
                  placeholder='Payment Description'
                  className='input input-bordered'
                  value={paymentDesciption}
                  onChange={(e) => setPaymentDesciption(e.target.value)}
                  required
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Amount</span>
                </label>
                <input
                  type='number'
                  placeholder='Amount'
                  className='input input-bordered'
                  value={amount}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setAmount(parseInt('0', 10));
                    } else {
                      let numstr = e.target.value.toString();
                      setAmount(parseInt(numstr, 10));
                    }
                  }}
                  min='0'
                  required
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>
                    Discount (Leave 0 if no discount)
                  </span>
                </label>
                <input
                  type='number'
                  placeholder='Discount'
                  className='input input-bordered'
                  value={discount}
                  max='100'
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setDiscount(parseInt('0', 10));
                    } else {
                      let numstr = e.target.value.toString();
                      setDiscount(parseInt(numstr, 10));

                      if (e.target.value > 100) {
                        setDiscount(parseInt('100', 10));
                      } else {
                        let numstr = e.target.value.toString();
                        setDiscount(parseInt(numstr, 10));
                      }
                    }
                  }}
                  required
                />
              </div>
              <div className='card shadow-lg compact side bg-base-100 mt-4'>
                <div className='space-x-4 card-body'>
                  <h2 className='text-3xl font-bold block mb-2 text-center'>
                    Payment
                  </h2>
                  <p className='text-xl flex justify-between border-2 border-b-0 p-2'>
                    <strong>Description: </strong>
                    <span>{paymentDesciption}</span>
                  </p>
                  <p className='text-xl flex justify-between border-2 border-b-0 p-2'>
                    <strong>Amount:</strong>
                    <span>{amount}</span>
                  </p>
                  <p className='text-xl flex justify-between border-2 border-b-0 p-2'>
                    <strong>Discount:</strong>
                    <span>{discount + '%'}</span>
                  </p>
                  <p className='text-xl flex justify-between border-2 p-2'>
                    <strong>Total Price:</strong>
                    <span>{amount - amount * (discount / 100)}</span>
                  </p>
                  <p className='text-xl pt-5'>
                    <strong>Customer Name:</strong>
                    {member && member.name}
                  </p>
                  <button
                    type='submit'
                    disabled={member ? false : true}
                    className='btn btn-primary mt-5'
                  >
                    Process Transaction
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='flex-grow md:w-1/2 md:ml-4'>
            <div className='mt-6 flex items-center justify-center'>
              <div className='w-full'>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PaymentPage() {
  const outlet = useStore((state) => state.outlet);
  return (
    <Container>
      <PageContent outlet={outlet} />
    </Container>
  );
}
