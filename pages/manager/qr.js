import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('modern-react-qr-reader'), {
  ssr: false,
});
import Container from '../../components/manager/';
import axios from 'axios';
import toast from 'react-hot-toast';
import { addVisit, db, decreaseIncreaseVisit } from '../../utils/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useStore } from '../../components/manager/';

function PageContent({ outlet }) {
  const [latestOutlet, setLatestOutlet] = useState(null);
  const [isHandlingScan, setIsHandlingScan] = useState(false);
  const [member, setMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleScan = async (data) => {
    if (data && !isHandlingScan) {
      setIsHandlingScan(true);

      try {
        const result = await axios(`/api/member/info?id=${data}`);
        const member = result.data;
        if (member) {
          setMember(member);
          setShowModal(true);
        } else {
          throw new Error('Error');
        }
      } catch (error) {
        toast.error('Member not found');
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

  const createVisit = async () => {
    setIsHandlingScan(true);
    try {
      await addVisit(member, outlet);
      toast.success('Member visit success');
    } catch (error) {
      toast.error('Error Please Try Again');
    } finally {
      setShowModal(false);
      setTimeout(() => {
        setIsHandlingScan(false);
      }, 3000);
    }
  };
  const decreaseIncrease = async (type) => {
    try {
      await decreaseIncreaseVisit(outlet, type);
      toast.success('success');
    } catch (error) {
      console.log(error);
      toast.error('Error Please Try Again');
    }
  };

  useEffect(() => {
    let unsub;
    const docRef = doc(db, 'outlets', outlet.outlet);

    unsub = onSnapshot(docRef, (doc) => {
      setLatestOutlet(doc.data());
    });

    return () => unsub();
  }, [outlet]);

  return (
    <>
      <div className='flex flex-wrap justify-between mb-10'>
        <h2 className='text-4xl font-medium mb-2'>Visitor QR Scanner</h2>
        {latestOutlet !== null && (
          <div className='flex items-center'>
            {latestOutlet.visits !== undefined && (
              <>
                <button
                  disabled={latestOutlet.visits <= 0 ? true : false}
                  className='btn btn-primary'
                  onClick={() => decreaseIncrease('sub')}
                >
                  DECREASE
                </button>
                <h3 className='mx-2 text-2xl font-bold bg-primary text-white py-2 px-5 rounded-lg'>
                  {latestOutlet.visits}
                </h3>
                <button
                  disabled={latestOutlet.visits >= 10 ? true : false}
                  className='btn btn-primary'
                  onClick={() => decreaseIncrease('add')}
                >
                  INCREASE
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className='pb-10 pr-5'>
        <div className='h-full w-full flex items-center justify-center'>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: 500, height: 500 }}
          />
        </div>
        <div>
          <input
            type='checkbox'
            id='my-modal-2'
            className='modal-toggle'
            checked={showModal}
            readOnly
          />
          <div className='modal'>
            <div className='modal-box'>
              <h3 className='text-xl text-center font-bold'>Confirm Visitor</h3>
              <p className='mt-2 text-2xl text-center'>
                {member && 'Welcome! ' + member.name}
              </p>
              <div className='modal-action flex justify-center'>
                <label
                  htmlFor='my-modal-2'
                  className='btn btn-primary'
                  onClick={() => {
                    createVisit();
                  }}
                >
                  Accept
                </label>
                <label
                  htmlFor='my-modal-2'
                  className='btn'
                  onClick={() => {
                    setIsHandlingScan(false);
                    setShowModal(false);
                  }}
                >
                  Cancel
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default function QrPage() {
  const outlet = useStore((state) => state.outlet);
  return (
    <Container>
      <PageContent outlet={outlet} />
    </Container>
  );
}
