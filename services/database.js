import { database } from "../firebase";
import { getCurrentUser } from "./auth";


const createUser = (user) => {
  const userRef = database.ref("Profile");
  userRef.push(user);
};
const updateProfile = () => {
  const myUserId = getCurrentUser();
  const userRef = database.ref("Profile").orderByChild("id").equalTo(myUserId);
  let profileId;
  userRef.on("value", (snapshot) => {
    const profile = snapshot.val();
    for (let id in profile) {
      profileId = id;
    }
    const profileRef = database.ref("Profile").child(profileId);
    profileRef.update({
      image: myUserId + ".jpg",
    });
  });
};
const listProfile = (setProfile) => {
  const myUserId = getCurrentUser();
  const userRef = database.ref("Profile").orderByChild("id").equalTo(myUserId);
  let userProfile = {};
  userRef.on("value", (snapshot) => {
    const profile = snapshot.val();
    for (let id in profile) {
      userProfile = profile[id];
    }
    setProfile(userProfile);
  });
};
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
export {
  createTodo,
  listTodos,
  deleteTodo,
  completeTodo,
  createUser,
  listProfile,
  updateProfile,
};
