import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Todo = ({ todo, idx }) => {
  return (
    <View style={style.container} key={idx}>
      <Text>{todo.title}</Text>
    </View>
  );
};
export default Todo;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  icon: { marginLeft: 5, marginBottom: 10 },
  text: {
    fontSize: 22,
    marginLeft: 10,
  },
  complete: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  incomplete: {
    fontWeight: "500",
  },
});
