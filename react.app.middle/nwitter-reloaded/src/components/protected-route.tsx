// 로그인한 사용자는 route 페이지를 아닌사람은 로그인또는 생성페이지로 이동

import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// app.tsx에서 작성했듯이 프로필 페이지와 홈페이즈는 모두 ProtectedRoute의 children으로 보내짐
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser; //유저가 로그인했는지 알수있다. 로그인했다면 user 아니면null
  console.log(user);
  if (user === null) {
    //true가 아니면  로그인페이지로 이동
    return <Navigate to="/login" />;
  }

  return children; //children에는 <Layout/> or <Home/> or <Profile/> 컴포넌트가 들어가있다.
  /*  app.tsx에서 ProtectedRoute 컴포넌트안에 자식태그로 들어가있기때문에
    즉, children은 component 내부의 모든것을 말한다.
    만약 Layout 컴포넌트를 ProtectedRoute 컴포넌트로 감싸면 하위 children으로 지정된 Home, Profile 컴포넌트도 보호된다.
*/
}
