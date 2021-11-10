import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { completeTodo, deleteTodo } from "../../../services/database";

const Todo = ({ todo, idx }) => {
  const { id, complete } = todo;
  return (
    <View style={style.container} key={idx}>
      {todo.complete ? (
        <AntDesign
          style={style.icon}
          name="checkcircle"
          color="green"
          size={24}
          onPress={() => completeTodo(id, complete)}
        />
      ) : (
        <AntDesign
          style={style.icon}
          name="checkcircleo"
          color="black"
          size={24}
          onPress={() => completeTodo(id, complete)}
        />
      )}
      <View>
        <AntDesign
          style={style.icon}
          name="minuscircle"
          size={24}
          color="red"
          onPress={() => deleteTodo(id)}
        />
      </View>
      <Text
        style={[todo.complete ? style.complete : style.incomplete, style.text]}
      >
        {todo.title}
      </Text>
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
