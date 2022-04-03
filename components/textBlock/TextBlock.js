import {
  Container,
  Content,
  HighlightContent,
  SubContainer,
} from './TextBlock.styled';

const TextBlock = () => {
  return (
    <Container>
      <SubContainer>
        <Content>
          Your newest convenient partner to access active places,engage and have
          fun with family-friendly vicinities, indulge with world-class dishes
          and more. It&apos; about creating a place for everyone!
        </Content>
        <HighlightContent>ALL IN ONE PLACE. THAT IS ROYAL</HighlightContent>
        <Content>
          With our passion for helping you stay emotionally engaged, active in
          fitness, sport and well-being, we work with our local authority
          partners to deliver places and activities that make a difference to
          the lives of people and their communities
        </Content>
      </SubContainer>
    </Container>
  );
};

export default TextBlock;
