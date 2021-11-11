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
      {todoList.length > 0 && (
        <ScrollView
          style={style.scrollView}
          showsHorizontalScrollIndicator="false"
        >
          {todoList ? (
            todoList
              .reverse()
              .map((todo, index) => (
                <Todo todo={todo} key={index} idx={index} />
              ))
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      )}

      {todoListDone?.length > 0 && <Text style={style.title}>DONE</Text>}
      <ScrollView
        style={style.scrollView}
        showsHorizontalScrollIndicator="false"
      >
        {todoListDone ? (
          todoListDone
            .reverse()
            .map((todo, index) => <Todo todo={todo} key={index} idx={index} />)
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
    height: "50%",
    // marginBottom: 100,
    // marginTop: 10,
    flex: 5,
    alignContent: "flex-start",
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 20,
    color: "green",
  },
  scrollView: {
    flex: 2,
    marginHorizontal: 40,
    maxHeight: "25%",
  },
});
