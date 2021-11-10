import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { listTodos } from "../../../services/database";
import Todo from "../SingleTodo";

const TodoList = () => {
  const [todoList, setTodoList] = useState();
  const [todoListDone, setTodoListDone] = useState();
  useEffect(() => {
    listTodos(setTodoList, setTodoListDone);
  }, []);
  return (
    <View style={style.container}>
      <ScrollView
        style={style.scrollView}
        showsHorizontalScrollIndicator="false"
      >
        {todoList ? (
          todoList.map((todo, index) => (
            <Todo todo={todo} key={index} idx={index} />
          ))
        ) : (
          <Text></Text>
        )}
        {todoListDone?.length > 0 && <Text style={style.title}>DONE</Text>}

        {todoListDone ? (
          todoListDone.map((todo, index) => (
            <Todo todo={todo} key={index} idx={index} />
          ))
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    </View>
  );
};
export default TodoList;
const style = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 100,
    marginTop: 10,
    flex: 3,
    alignContent: "center",
  },
  title: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 18,
    color: "green",
  },
  scrollView: {
    marginHorizontal: 40,
  },
});
