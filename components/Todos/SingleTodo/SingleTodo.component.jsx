import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth, database } from "../../../firebase";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Todo = ({ todo }) => {
  const myUserId = auth.currentUser.uid;
  const deleteTodo = () => {
    const todoRef = database.ref("Todo/" + myUserId).child(todo.id);
    todoRef.remove();
  };
  const completeTodo = () => {
    const todoRef = database.ref("Todo/" + myUserId).child(todo.id);
    todoRef.update({
      complete: !todo.complete,
    });
  };
  return (
    <View style={style.container}>
      {todo.complete ? (
        <AntDesign
          style={style.icon}
          name="checkcircle"
          color="green"
          size={24}
          onPress={completeTodo}
        />
      ) : (
        <AntDesign
          style={style.icon}
          name="checkcircleo"
          color="black"
          size={24}
          onPress={completeTodo}
        />
      )}
      <View>
        <AntDesign
          style={style.icon}
          name="minuscircleo"
          size={24}
          color="black"
          onPress={deleteTodo}
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
    backgroundColor: "white",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  incomplete: {
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
