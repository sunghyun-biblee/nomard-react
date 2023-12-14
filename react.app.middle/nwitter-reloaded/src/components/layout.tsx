import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h2>layout</h2>
      {/* home! 이 출력되는 이유는 app.tsx 에서 children 안에있는 path 중 모든 경로에 <Home/>을 출력하도록 작성해 두었기 때문
       */}
      <Outlet />
    </>
  );
}
