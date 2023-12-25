import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
const Button = styled.span`
  margin-top: 20px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
`;
const Logo = styled.img`
  height: 25px;
`;
export default function GithubButton() {
  const onClick = async () => {
    try {
      const provieder = new GithubAuthProvider();
      await signInWithRedirect(auth, provieder); // 창을 새로고침하여 github로그인페이지로 이동
      //   await signInWithPopup(auth, provieder); 팝업창을 출력하여 github로 로그인
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg" />
      contuniue with github
    </Button>
  );
}
