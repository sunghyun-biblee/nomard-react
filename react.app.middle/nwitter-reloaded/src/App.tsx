import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Createaccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path: "/", // 루트페이지
    element: <Layout />,
    // route에 넣을 또 다른 배열을 만드는 것
    // Outlet 구성 요소가 수행하는 작업 : / profile을 쓰면 layout과 children안에있는 path 가 profile 인 component를 출력 > <Layout/> 과 <Profile /> 차례대로 출력 > 이것이 outlet이 하는 기능 / layout.tsx에 <Outlet />를 <Profile />가 대체

    // children이 Layout에 감싸져있기때문에 "/"경로 뒤에 children 안에있는 path 경로가 들어오면 <Layout /> 컴포넌트는 무조건 출력되고 그다음 차례로 해당 경로 컴포넌트가 출력
    children: [
      {
        path: "",
        element: <Home />,
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
function App() {
  return (
    <>
      <GlobalStyles />
      {/* 위에서 만든 router를 RouterProvide에 전달 */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
