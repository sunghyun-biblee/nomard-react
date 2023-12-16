import styled from "styled-components";
// 로그인과 회원가입할때 공유하는 컴포넌트들을 모아서 하나의 파일만 import하여 사용가능하도록 코드를 최적화 > 중복코드 을 줄임

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`;
export const Title = styled.h1`
  font-size: 42px;
`;
export const Form = styled.form`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    //만약 타입이 submit인 input 태그일때
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const Error = styled.span`
  font-family: 600;
  color: tomato;
  padding-top: 50px;
`;
export const Switcher = styled.span`
  padding-top: 20px;
  a {
    color: #1d9bf0;
  }
`;
