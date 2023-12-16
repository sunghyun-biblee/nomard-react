import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Createaccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/", // 루트페이지
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    // route에 넣을 또 다른 배열을 만드는 것
    // Outlet 구성 요소가 수행하는 작업 : / profile을 쓰면 layout과 children안에있는 path 가 profile 인 component를 출력 > <Layout/> 과 <Profile /> 차례대로 출력 > 이것이 outlet이 하는 기능 / layout.tsx에 <Outlet />를 <Profile />가 대체

    // children이 Layout에 감싸져있기때문에 "/"경로 뒤에 children 안에있는 path 경로가 들어오면 <Layout /> 컴포넌트는 무조건 출력되고 그다음 차례로 해당 경로 컴포넌트가 출력
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <Createaccount />,
  },
]);
// 배열을 routers에 전달
// 내가 진짜 하고싶은건 route를 완~전 감싸고 싶은 것 > layout component를 사용해서

//GlobalStyles => 모든 페이지에 global하게 적용할 스타일 컴포넌트이다
const GlobalStyles = createGlobalStyle`
 ${reset};
 *{
  box-sizing: border-box;
 }
 body{
  background-color: black;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 }
 
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [loading, setLoading] = useState(true);
  const init = async () => {
    // wait for firebase
    // firebase를 기다리기 위해서 await을 시작
    /*  authStateReady() : 최종 인증 상태가 완료될 때 실행되는 promise를 return 해줌
        즉,firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인여부를 확인하는동안 기다리겠다는 
    */

    await auth.authStateReady();

    setLoading(false);
    // setTimeout(() => setLoading(false), 2000);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {/* 위에서 만든 router를 RouterProvide에 전달 */}
      {loading ? ( //loading이 true라면 로딩중이라는 화면을 출력하고 false라면 Router를 이용해 경로맞는 component를 출력한다 > setloading으로 인해 usestate값이 변경되면 rerender 되어 다시 한번 더 조건문을 확인함
        <LoadingScreen></LoadingScreen>
      ) : (
        <RouterProvider router={router} />
      )}
    </Wrapper>
  );
}

export default App;
