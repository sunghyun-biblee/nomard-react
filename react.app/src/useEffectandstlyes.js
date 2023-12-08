import Button from "./Button.module.css";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
//css파일만 다르다면 클래스이름이 동일하여도 상관없다 > html내에서는 클래스이름이 랜덤하게 지어지기때문에

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => {
    setCounter((prev) => prev + 1);
  };
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  //첫번째 render에만 코드가 실행되고 다른 state변화에는 실행되지 않도록하는법
  // 필요상황 ex) api를 호출하여 값을 가져올때 한번만 가져와도되는데 state가 변할떄마다 호출하게되는 경우 > useEffect 를 사용함

  useEffect(() => {
    console.log("나는 한번만 실행돼요");
  }, []); // 빈 배열을 작성하는 이유는 코드가 한번만 실행되게 하기위함 > React가 감시(지켜볼)해야할 요소가 아무것도 없기때문에 한번만 실행됨
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      //공백이 아니면서 길이가 5 이상일때만 실행 > keyword값이 변경되더라도 조건이 만족되어야 실행됨
      console.log(
        "나는 keyword가 공백이아니면서 길이가 5 이상 일때만 실행돼요",
        keyword
      );
    }
  }, [keyword]); // 배열안에는 원하는 usestate값이 변경될때 코드를 실행하고싶다면 해당 usestate의 이름을 넣어주면 된다. / ex)keyword가 변경되지않으면 해당 함수는 실행되지않는다.
  useEffect(() => {
    console.log("나는 counter가 변경될때 실행돼요");
  }, [counter]);
  useEffect(() => {
    console.log("나는 counter나 keyword가 변경될때 실행돼요");
  }, [counter, keyword]);
  return (
    <div>
      <h1 className={styles.title}>{counter}</h1>
      <button className={Button.btn} onClick={onClick}>
        text1={counter}
      </button>
      <input
        type="text"
        placeholder="Search here..."
        onChange={onChange}
        value={keyword}
      />
      {/* counter,keyword의 값이 변경될때마다 render하게되니, 만약 api호출기능이 있더라면 매우 불편하고 비효율적일것이다. */}
    </div>
  );
}

export default App;
