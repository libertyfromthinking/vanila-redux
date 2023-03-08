import { legacy_createStore as createStore } from "redux";

const ADD = "add";
const DELETE = "delete";

const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

const addTodo = (text) => {
  return {
    type: ADD,
    text,
  };
};
const deleteTodo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((todo) => {
        return todo.id !== action.id;
      });
    default:
      return state;
  }
};
const store = createStore(reducer);

const addTodoDispatch = (text) => {
  store.dispatch(addTodo(text));
};
const deleteTodoDispatch = (id) => {
  store.dispatch(deleteTodo(id));
};

const onDelete = (event) => {
  event.preventDefault();
  const id = parseInt(event.target.parentNode.id);
  deleteTodoDispatch(id);
  paintTodos();
};

const paintTodos = () => {
  const todos = store.getState();
  ul.innerHTML = "";
  todos.map((todo) => {
    const li = document.createElement("li");
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "remove";
    removeBtn.addEventListener("click", onDelete);
    li.innerText = todo.text;
    li.id = todo.id;
    ul.appendChild(li);
    li.appendChild(removeBtn);
  });
};

store.subscribe(paintTodos);

const onSubmit = (event) => {
  event.preventDefault();
  addTodoDispatch(input.value);
  input.value = "";
  paintTodos();
};

form.addEventListener("submit", onSubmit);
