import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RiMailLine, RiPhoneLine } from 'react-icons/ri';
import {
  Background,
  ContactLinks,
  Container,
  ContentContainer,
  ImageContainer,
  LinkText,
  Title,
  Wrapper,
} from './Contact.styled';

const ContactUs = () => {
  return (
    <Container>
      <Image
        src='https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fbanner-img.jpg?alt=media&token=e60945e7-0cec-4c27-b63a-90c7539c56e8'
        alt='Background Image'
        layout='fill'
        objectFit='cover'
        className='z-0'
        quality={100}
        unoptimized
      />
      <Background></Background>
      <Wrapper>
        <ContentContainer>
          <ImageContainer>
            <Image
              src='/yasalamlogo.png'
              alt='Background Image'
              layout='responsive'
              width='100%'
              height='100%'
              objectFit='contain'
            />
          </ImageContainer>

          <Title>Contact Us</Title>
          <Link href='mailto:info@royalmembership.ae' passHref>
            <ContactLinks>
              <div className='flex justify-center items-center text-2xl'>
                <RiMailLine className='mr-2' />
                info@royalmembership.ae
              </div>
            </ContactLinks>
          </Link>
          <Link href='tel:+971 50 72 88 316' passHref>
            <ContactLinks>
              <div className='flex justify-center items-center text-2xl'>
                <RiPhoneLine className='mr-2' />
                +971 50 72 88 316
              </div>
            </ContactLinks>
          </Link>
          <Link href='tel:+971 50 90 12 030' passHref>
            <ContactLinks>
              <div className='flex justify-center items-center text-2xl'>
                <RiPhoneLine className='mr-2' />
                +971 50 90 12 030
              </div>
            </ContactLinks>
          </Link>
        </ContentContainer>
      </Wrapper>
    </Container>
  );
};

export default ContactUs;
