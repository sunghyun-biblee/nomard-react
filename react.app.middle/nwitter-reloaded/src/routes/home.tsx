import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import PostTweetForm from "../components/post-tweet-form";
import styled from "styled-components";

// 트윗을 올리는 컴포넌트 만들기

const Wrapper = styled.div``;
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
      </Wrapper>
    </>
  );
}
