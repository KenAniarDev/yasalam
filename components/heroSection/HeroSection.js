import Image from 'next/image';
import {
  Background,
  Container,
  ImageLeft,
  ImageRight,
  LeftContent,
  Main,
  MainContent,
  PrimaryText,
  RightContent,
  SecondaryText,
} from './HeroSection.styled';

const HeroSection = () => {
  return (
    <Container>
      <Image
        src='/pattern1920x1080.jpg'
        alt='Background Image'
        layout='fill'
        objectFit='cover'
        className='z-0'
        quality={75}
        priority
        unoptimized
      />
      <Background></Background>
      <Main>
        <MainContent>
          <LeftContent>
            <SecondaryText>Level up your life style with</SecondaryText>
            <ImageLeft>
              <Image
                className='object-contain'
                src='/yasalamlogo.png'
                alt='Yasalam Logo'
                layout='responsive'
                width={220}
                height={250}
                unoptimized
              />
            </ImageLeft>
            <PrimaryText>Royal</PrimaryText>
          </LeftContent>
          <RightContent>
            <ImageRight>
              <Image
                src='/banner-image-new.png'
                alt='Phone Image'
                layout='responsive'
                width='100%'
                height='100%'
                objectFit='contain'
                unoptimized
              />
            </ImageRight>
          </RightContent>
        </MainContent>
      </Main>
    </Container>
  );
};

export default HeroSection;
