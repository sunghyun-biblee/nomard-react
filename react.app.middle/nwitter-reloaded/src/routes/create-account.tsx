import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event 타입은  React.ChangeEvent<HTMLInputElement> 이다
    const {
      target: { name, value },
    } = event;
    /* input component에 name 속성을 준 이유는 변경된 input의 name이 무엇인지 알 수있고, 각각의 state를 통해 값을 set 해주기 위해서 */
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (loading || name === "" || email === "" || password === "") return;
    // 로딩중이거나 이름,이메일,패스워드 중 하나라도 공백이라면 함수종료해버림
    try {
      setLoading(true);
      // create an account
      // set the name of the user
      // redirect to the homepage
      // await을 하고 email과 password를 이용해서 사용자를 생성
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user); //user의 정보를 console에 출력

      // 함수를 사용하기위해 매개변수로 , 인증 인스턴스(auth),email,password가 필요
      /*  createUserWithEmailAndPassword 함수가 실행되면 <UserCredential>(자격증명)을 받을 수있다 
      > 계정생성에 성공하면 <UserCredential>(자격증명)을 받게 되며 즉시 로그인하게 된다. 실패하게된다면 error가 발생할 것이다.
      실패원인은 계정이 이미 존재하거나 ,패스워드가 유요하지않은 경우 (6자리 이상)  */

      // 계정 생성 후 사용자 이름을 설정하는 코드
      // updateProfile은 업데이트하기위한 유저 정보와 닉네임이나 프로필사진url 둘 중 하나의 값을 객체로 전달받아야한다.
      await updateProfile(credentials.user, { displayName: name });

      // 이후 모든 작업이 완료되면 index 페이지로 보내기 위해 useNavigate라는hook을 사용
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
      <Title>Join 👪</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        ></Input>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        ></Input>
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="password of at least 6 characters"
          type="password"
          required
        ></Input>
        <Input
          type="submit"
          value={loading ? "Loading..." : "Creat Account"}
        ></Input>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 있으신가요? <Link to="/login">Login &rarr;</Link>
      </Switcher>
      <GithubButton></GithubButton>
    </Wrapper>
  );
}
/*  | 12/15 22:07 | css 로 계정생성 페이지 만들기 
                   이후 react.js나 eventListener 사용하여 input로직을 만들 예정 */
