import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin-bottom: 10px;
`;
const Column = styled.div``;
const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  padding: 10px 0;
  font-size: 18px;
`;
const Photo = styled.img`
  height: 100px;
  width: 100px;
  border: 15px;
`;

export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo}></Photo>
        </Column>
      ) : null}
    </Wrapper>
  );
}
