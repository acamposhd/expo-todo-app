import React from "react";
import { StyleSheet, View } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import CreateTodo from "../../components/Todos/CreateTodo";
import TodoList from "../../components/Todos/ListTodo";

const TodosPage = () => {
  const windowHeight = useWindowDimensions().height;
  return (
    <View style={{ minHeight: Math.round(windowHeight), ...styles.container }}>
      <CreateTodo />
      <TodoList />
    </View>
  );
};
export default TodosPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
