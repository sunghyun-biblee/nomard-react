import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 50px 0;
  width: 100%;
  max-width: 860px;
  background-color: gray;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #484545;
`;
const Menuitem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: white;
  }
  &.logout {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
`;
//Layout 메뉴만들기
export default function Layout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    const test = confirm("로그아웃 하시겠습니까?"); // 로그아웃하기전에 확인창
    if (test) {
      await auth.signOut();
      navigate("/login"); // 결과값을 반환하면 useNavigate 를 사용하여 페이지이동
    }
    // auth.signOut;
  };
  return (
    //heroicons.dev 사이트에서 원하는 아이콘의 svg를 복사하여 컴포넌트 안에 넣어줌
    <Wrapper>
      <Menu>
        <Link to="/">
          <Menuitem>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              />
            </svg>
          </Menuitem>
        </Link>
        <Link to="/profile">
          <Menuitem>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Menuitem>
        </Link>
        <Link to="/">
          <Menuitem onClick={onLogout} className="logout">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              />
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
              />
            </svg>
          </Menuitem>
        </Link>
      </Menu>
      {/* <h2>layout</h2> */}
      {/* home! 이 출력되는 이유는 app.tsx 에서 children 안에있는 path 중 모든 경로에 <Home/>을 출력하도록 작성해 두었기 때문
       */}
      <Outlet />
    </Wrapper>
  );
}
