import {
  Container,
  Content,
  SecondaryTitle,
  SubContainer,
  Title,
} from './LoyaltyReward.styled';

const LoyaltyReward = () => {
  return (
    <Container>
      <SubContainer>
        <Title>Royal Loyalty & Reward</Title>
        <SecondaryTitle>It’s a never ending excitement.</SecondaryTitle>
        <Content>
          As Royal member you will not only enjoy the unlimited access to the
          luxories hotels and state of the art fitness centers and Gym’s.
        </Content>

        <Content>
          You will enjoy earning points redeemable at our participating outlets
          every time you spend.
        </Content>
        <Content>
          Scan your Royal membership barcode after each purchase at any of the
          participating outlets to earn your Royal points.
        </Content>
      </SubContainer>
    </Container>
  );
};

export default LoyaltyReward;
