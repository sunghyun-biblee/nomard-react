import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 도메인 , api key 등 여러가지 키 값들이 포함된 config 개체
/* 이러한 config 옵션을 통해서 아래에 app을 생성하고, 
   그리고 그 app에 대한 인증서비스를 사용하고싶다는 것을 코드로 작성  */
const firebaseConfig = {
  apiKey: "AIzaSyBSvtL5MrR6y5Dlwc9Wx6VmQhh40BgbpGk",
  authDomain: "nwitter-reloaded-c311e.firebaseapp.com",
  projectId: "nwitter-reloaded-c311e",
  storageBucket: "nwitter-reloaded-c311e.appspot.com",
  messagingSenderId: "580039476964",
  appId: "1:580039476964:web:138e7c339a6305e056cef1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 로그인 기능을 추가하는 코드
// 기능을 사용할수 있도록 export 해주기
export const auth = getAuth(app);
