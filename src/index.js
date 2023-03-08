const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

import { legacy_createStore as createStore } from "redux";

const ADD = "add";
const DELETE = "delete";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((todo) => {
        console.log(`actionid : ${typeof action.id}`);
        console.log(`todo id: ${typeof todo.id}`);
        return todo.id !== action.id;
      });
    default:
      return state;
  }
};
const store = createStore(reducer);

const onClick = (event) => {
  event.preventDefault();
  store.dispatch({ type: ADD, text: input.value });
  input.value = "";
  console.log(store.getState());
  updateTodos();
};

const onDelete = (event) => {
  event.preventDefault();
  const id = parseInt(event.target.parentNode.id);
  store.dispatch({ type: DELETE, id });
  updateTodos();
};

form.addEventListener("submit", onClick);

const updateTodos = () => {
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

store.subscribe(() => {
  store.getState();
});
