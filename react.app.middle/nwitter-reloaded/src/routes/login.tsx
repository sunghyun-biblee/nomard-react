export default function Login() {
  return <h1>Login</h1>;

  /*로그인이랑 계정 만들기 route가 Layout안에 들어가지 않았으며 좋겠다.
    <Layout />은 로그인한 사용자만 사용하게 만들고 싶다 
    > login 과 create-account를 children route 안에 넣지 않으면 된다.
  */
}
