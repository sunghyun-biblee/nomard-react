import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("i m here");

    // 처음실행될때 return은 왜 실행되지않는지 알아봐야할것같다.
    //      > 함수는 값을 내보기위해 return으로 내보내고, 그 값을 어딘가에서 출력해주도록 작성하게되는데 console.log(),document.write()의 경우는 자체 출력이 가능하기때문에 굳이 return 을 해 줄 필요가 없어서 실행되지않았음

    return () => console.log("i am delete"); //cleanup function
    //   clean function 같은 경우 잘 사용하지 않지만 , 필요할 상황(특정케이스)이 있기때문에 판단하에 적재적소 사용하면 좋다 (알아두면 좋다~)
  }, []); // h1태그가 생길때마다 console이 실행되는이유는 조건문에 의하여 Hello component를 지웠졌다가 다시 생성될때, useEffect도 다시 생성되기때문

  return <h1>hello</h1>;
}
//component가 사라질때 function을 실행하고싶으면 해당함수가 새로운 함수가 return 해야한다

function App() {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow((current) => !current);
  };
  return (
    <div>
      {/* return 안에 자바스크립트를 작성할땐 중괄호안에 작성 */}
      {show ? <Hello /> : null}{" "}
      {/* show(usestate)의 값이 변경될 때 render 되면서 자바스크립트의 조건물을 실행하여 각각의 값마다 다른 결과를 출력 */}
      <button onClick={onClick}>{show ? "hide" : "show"}</button>
    </div>
  );
}

export default App;
