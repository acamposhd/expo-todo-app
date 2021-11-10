import { database } from "../firebase";
import { getCurrentUser } from "./auth";

const createTodo = (newTodo) => {
  const myUserId = getCurrentUser();
  const todo = { uid: myUserId, ...newTodo };
  const todoRef = database.ref("Todo/" + myUserId);
  todoRef.push(todo);
};

const listTodos = (setTodoList, setTodoListDone) => {
  const myUserId = getCurrentUser();
  const todoRef = database.ref("Todo/" + myUserId);
  // .orderByChild("complete")
  // .equalTo(false);
  todoRef.on("value", (snapshot) => {
    const todos = snapshot.val();
    const todoList = [];
    for (let id in todos) {
      todoList.push({ id, ...todos[id] });
    }
    const pending = todoList.filter((item) => !item.complete);
    const complete = todoList.filter((item) => item.complete);
    setTodoList(pending);
    setTodoListDone(complete);
  });
};
const deleteTodo = (id) => {
  const myUserId = getCurrentUser();
  const todoRef = database.ref("Todo/" + myUserId).child(id);
  todoRef.remove();
};
const completeTodo = (id, status) => {
  const myUserId = getCurrentUser();
  const todoRef = database.ref("Todo/" + myUserId).child(id);
  todoRef.update({
    complete: !status,
  });
};
export { createTodo, listTodos, deleteTodo, completeTodo };
