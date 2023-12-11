import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]); // todo를 저장하기위한 배열
  const [todo, setTodo] = useState("");
  const onChange = (event) => {
    setTodo(event.target.value);
    console.log(todo);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }

    setTodo("");

    setTodos((currentArray) => [todo, ...currentArray]);
    //ex) > setTodos(["hello"])=>["bye"],...["bye","hello"]
  };
  return (
    <div>
      <h1>my to dos - {todos.length}</h1>
      <div>{todos + ""}</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Write your to do.."
          value={todo}
          onChange={onChange}
        />
        <button>Add to Do</button>
      </form>
      <hr />
      {/* map은 array안에있는 element를 가져오고싶을때 사용 
      > 예전 array를 가져와서 가공하여(변형) 사용함
      map을 사용하면 react.js는 element에 key를 주어야 한다.
      리액트는 기본적으로 list에 있는 모든 item을 인식하기 때문에 
      key를 넣어 고유하게 만들어줘야함
      map() 의 매개변수는 value 와 index가 들어가야한다. 
      index > key 역할 , value =value
      */}

      <ul>
        {todos.map((items, index) => (
          <li key={index}>{items}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
