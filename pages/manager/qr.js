import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('modern-react-qr-reader'), {
  ssr: false,
});
import Container from '../../components/manager/';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

export default function Index() {
  const [isHandlingScan, setIsHandlingScan] = useState(false);
  const [member, setMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleScan = async (data) => {
    if (data && !isHandlingScan) {
      setIsHandlingScan(true);

      try {
        const result = await axios(`/api/member/info?id=${data}`);
        const member = result.data;
        console.log(result);
        if (member) {
          setMember(member);
          setShowModal(true);
        }
      } catch (error) {
        toast.error('User not found');
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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container>
      <h2 className='text-4xl font-medium mb-2'>Visitor QR Scanner</h2>
      <div className='pb-10 pr-5'>
        <div className='h-full w-full flex items-center justify-center'>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: 500, height: 500 }}
          />
        </div>
        <div className='z-99'>
          <button onClick={openModal}>Open Modal</button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel='Example Modal'
          >
            <button onClick={closeModal} className='btn btn-primary'>
              close
            </button>
          </Modal>
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
                    // create visit
                    setIsHandlingScan(false);
                    setShowModal(false);
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
    </Container>
  );
}
