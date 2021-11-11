import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { completeTodo, deleteTodo } from "../../../services/database";
import COLORS from "../../../constants/colors";

const Todo = ({ todo, idx }) => {
  const { id, complete } = todo;
  const iconSize = 30;
  return (
    <View style={style.container} key={idx}>
      <Text
        style={[todo.complete ? style.complete : style.incomplete, style.text]}
      >
        {todo.title}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {todo.complete ? (
          <AntDesign
            style={style.icon}
            name="checkcircle"
            color="#1EB55C"
            size={iconSize}
            onPress={() => completeTodo(id, complete)}
          />
        ) : (
          <AntDesign
            style={style.icon}
            name="checkcircleo"
            color="black"
            size={iconSize}
            onPress={() => completeTodo(id, complete)}
          />
        )}

        <AntDesign
          style={style.icon}
          name="minuscircle"
          size={iconSize}
          color="red"
          onPress={() => deleteTodo(id)}
        />
      </View>
    </View>
  );
};
export default Todo;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    borderColor: COLORS.dark,
  },
  icon: { marginLeft: 5, marginBottom: 0 },
  text: {
    maxWidth: 200,
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
