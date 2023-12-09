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
    </div>
  );
}

export default App;
