import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { auth, database } from "../../../firebase";
import Todo from "../SingleTodo";

const TodoList = () => {
  const [todoList, setTodoList] = useState();
  useEffect(() => {
    const myUserId = auth.currentUser?.uid;
    const todoRef = database.ref("Todo/" + myUserId);
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setTodoList(todoList);
    });
  }, []);
  return (
    <KeyboardAvoidingView style={style.container}>
      <ScrollView style={style.scrollView}>
        {todoList ? (
          todoList.map((todo, index) => <Todo todo={todo} key={index} />)
        ) : (
          <Text>No TODOS yet</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default TodoList;
const style = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 100,
    marginTop: 10,
    flex: 3,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 40,
  },
});
