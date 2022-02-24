import NavFooter from 'components/NavFooter';
import Referral from 'components/referral/Referral';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Background,
  Container,
  ContentContainer,
  Form,
  Title,
  Wrapper,
} from '../components/referral/Referral.styled';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PaymentForm() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`../api/payment/update-with-referral`, {
        code,
        email,
      });
      setEmail('');
      setCode('');
      console.log(result);
      return toast.success('Account Activated!!!');
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data);
    }
  };

  return (
    <NavFooter>
      <Container>
        <Image
          src='/pattern1920x1080.png'
          alt='Background Image'
          layout='fill'
          objectFit='cover'
          className='z-0'
          quality={100}
        />
        <Background></Background>
        <Wrapper>
          <ContentContainer>
            <Title>Referral</Title>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <input
                type='text'
                name='email'
                required
                placeholder='Enter email address'
                className='w-full max-w-xs input'
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
              <input
                type='text'
                name='code'
                required
                placeholder='Enter code'
                className='w-full max-w-xs input'
                value={code}
                onChange={(e) => setCode(e.target.value.trim())}
              />
              <button className='btn btn-primary' type='submit'>
                Activate
              </button>
            </Form>
          </ContentContainer>
        </Wrapper>
      </Container>
    </NavFooter>
  );
}
