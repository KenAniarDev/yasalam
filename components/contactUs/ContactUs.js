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
              <LinkText>
                <RiMailLine />
                info@yasalamae.ae
              </LinkText>
            </ContactLinks>
          </Link>
          <Link href='tel:+971 50 72 88 316' passHref>
            <ContactLinks>
              <LinkText>
                <RiPhoneLine />
                +971 50 72 88 316
              </LinkText>
            </ContactLinks>
          </Link>
          <Link href='tel:+971 50 72 56 316' passHref>
            <ContactLinks>
              <LinkText>
                <RiPhoneLine />
                +971 50 72 56 316
              </LinkText>
            </ContactLinks>
          </Link>
          <Link href='tel:+971 56 54 74 636' passHref>
            <ContactLinks>
              <LinkText>
                <RiPhoneLine />
                +971 56 54 74 636
              </LinkText>
            </ContactLinks>
          </Link>
        </ContentContainer>
      </Wrapper>
    </Container>
  );
};

export default ContactUs;
