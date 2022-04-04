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
        src='/pattern1920x1080.png'
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
          <Link href='mailto:info@yasalamae.ae' passHref>
            <ContactLinks>
              <div className='flex justify-center items-center text-2xl'>
                <RiMailLine className='mr-2' />
                info@yasalamae.ae
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
        </ContentContainer>
      </Wrapper>
    </Container>
  );
};

export default ContactUs;
