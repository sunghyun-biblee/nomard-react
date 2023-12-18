import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-component";
import GithubButton from "../components/github-btn";

export default function Createaccount() {
  const navigate = useNavigate(); // react-rom에서 불러옴
  const [loading, setLoading] = useState(false);
  // input으로 받아온 name,email,password를 저장하기위한 state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event 타입은  React.ChangeEvent<HTMLInputElement> 이다
    const {
      target: { name, value },
    } = event;
    /* input component에 name 속성을 준 이유는 변경된 input의 name이 무엇인지 알 수있고, 각각의 state를 통해 값을 set 해주기 위해서 */
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (loading || email === "" || password === "") return;
    // 로딩중이거나 이름,이메일,패스워드 중 하나라도 공백이라면 함수종료해버림
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password); //로그인 확인
      navigate("/");
    } catch (error) {
      // setError
      console.log(error);
      if (error instanceof FirebaseError) {
        console.log(error.code, error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }

    // console.log(name, email, password);
  };
  // react로 form 생성하는 걸 도와주는 패키지가 있다.
  return (
    <Wrapper>
      <Title>Login 👪</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
          autoComplete="off"
        ></Input>
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="password of at least 6 characters"
          type="password"
          required
        ></Input>
        <Input type="submit" value={loading ? "Loading..." : "Login"}></Input>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요? <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <GithubButton></GithubButton>
    </Wrapper>
  );
}
/*  | 12/15 22:07 | css 로 계정생성 페이지 만들기 
                   이후 react.js나 eventListener 사용하여 input로직을 만들 예정 */
