import Image from 'next/image';
import React from 'react';
import {
  Container,
  ImageContainer,
  ImageSubContainer,
  InformationContainer,
  InformationDetails,
  InformationHighlight,
  List,
  Price,
  PriceContainer,
  PriceLarge,
  PriceText,
  Section,
  SubContainer,
} from './AbousUs.styled';

const AboutUs = () => {
  return (
    <Container>
      <SubContainer>
        <Section>
          <ImageContainer>
            <ImageSubContainer>
              <Image
                src='/about-us-iphone.png'
                alt='SmartPhone Image'
                layout='responsive'
                width='100%'
                height='100%'
                objectFit='contain'
                unoptimized
              />
            </ImageSubContainer>
          </ImageContainer>
          <InformationContainer>
            <InformationDetails>
              Your newest convenient partner to access active places,engage and
              have fun with family-friendly vicinities, indulge with world-class
              dishes and more. It&apos;s about creating a place for everyone!
            </InformationDetails>
            <InformationHighlight>
              ALL IN ONE PLACE. THAT IS ROYAL
            </InformationHighlight>
            <InformationDetails>
              With our passion for helping you stay emotionally engaged, active
              in fitness, sport and well-being, we work with our local authority
              partners to deliver places and activities that make a difference
              to the lives of people and their communities
            </InformationDetails>
          </InformationContainer>
        </Section>
        <Section>
          <InformationContainer>
            <InformationHighlight>
              Royal will initially start in Abu Dhabi where we are partnered
              with:
            </InformationHighlight>
            <List>
              <li>Hotels</li>
              <li>Health Clubs and Fitness Centers</li>
              <li>Marine Sports</li>
              <li>Sports Club</li>
              <li>Restaurant</li>
              <li>Sport Academy</li>
              <li>Health Clubs</li>
              <li>Coffee Shops</li>
              <li>Spa</li>
              <li>Healthy Food</li>
              <li>Fitness Classes</li>
              <li>Sport Wear</li>
              <li>Sport Academies for kids 17 and below</li>
            </List>
            <InformationDetails>
              And we will soon be expanding to AlAin, Dubai and theNorthern
              Emirates
            </InformationDetails>
          </InformationContainer>
          <ImageContainer>
            <ImageSubContainer>
              <Image
                src='/yasalam2.PNG'
                alt='SmartPhone Image'
                layout='responsive'
                width='100%'
                height='100%'
                objectFit='contain'
                unoptimized
              />
            </ImageSubContainer>
          </ImageContainer>
        </Section>
        <Section>
          <ImageContainer>
            <ImageSubContainer>
              <Image
                src='/yasalam-map.jpg'
                alt='SmartPhone Image'
                layout='responsive'
                width='100%'
                height='100%'
                objectFit='contain'
                unoptimized
              />
            </ImageSubContainer>
          </ImageContainer>
          <InformationContainer>
            <InformationHighlight>
              Commit to our annual membership offer
            </InformationHighlight>
            <PriceContainer>
              <Price $background>
                <PriceText>AED 4,900 FAMILY</PriceText>
                <PriceLarge>(2 adults, 3 children under 17)</PriceLarge>
              </Price>
              <Price>
                <PriceText>AED 3,500 INDIVIDUAL</PriceText>
              </Price>
            </PriceContainer>
            <InformationDetails>
              With this membership, you&apos;ll have access:
            </InformationDetails>
            <List $marginTop>
              <li>
                To enjoy unlimited entry to our participating luxurious hotel
                resorts,sunny beaches,glistening pools,waterparks and premium
                fitness and wellness facilities in Abu Dhabi.
              </li>
              <li>Receive discounts from non-participating outlets.</li>
              <li>And get loyalty awards from every penny spent!</li>
            </List>
          </InformationContainer>
        </Section>
      </SubContainer>
    </Container>
  );
};

export default AboutUs;
