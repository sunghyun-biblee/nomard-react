import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import PostTweetForm from "../components/post-tweet-form";
import styled from "styled-components";
import Timeline from "../components/timeline";

// 트윗을 올리는 컴포넌트 만들기

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  // 게시글 작성 양식은 그대로 고정되어 있는 상태에서 트윗들을 스크롤 할 수 있게
  grid-template-rows: 1fr 5fr;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default function Home() {
  const navigate = useNavigate();
  const logout = () => {
    auth.signOut();
    navigate("/login");
  };
  return (
    <>
      <Wrapper>
        <PostTweetForm></PostTweetForm>
        <Timeline></Timeline>
      </Wrapper>
    </>
  );
}
