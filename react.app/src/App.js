import { useState, useEffect } from "react";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// router를 사용한 이후부터는 App.js는 router를 render 한다
//router는 url을 보고있는 component이다.
// url에 따라 home을 보여주거나 detail을 보여줄것이다.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* path="/" : / 부분은 루트페이지로 home 페이지로 이동한다는 뜻 */}
        <Route path="/movie/:movieid" element={<Detail />} />
        {/* : (콜론)을 통해 뒤에오는 페이지를 동적으로 구현가능하다.
        movie.js의 Link component에서 전달받은 파라미터값을 :(콜론)movieid 변수안에 저장
        그리고 detail component에서 useparams을 사용하여 전달받은 파라미터 값을 활용

        path경로에 변수의 경로를 작성하고싶다면 / : < 기호를 작성해주어야 한다. 
        ex)path="/movie/id로만 작성하면 /id 텍스트 경로로 가기때문에
        변수의값으로 지정 되지않음" 

        */}

        {/* path="/movie" 이 경로로 들어오면 detail 페이지로 이동 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* map을 사용하여 새로운 array로 변형 , items와 index를 사용 (index의 사용도는 key를 넣어주기 위해 
  react.js는 map을 사용할때 항상 key를 넣어주어야한다, key와 value가 한쌍이기때문에)
React Router는 페이지를 전환해주는 것 : npm install react-router-dom */
}
