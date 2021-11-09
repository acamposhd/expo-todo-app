import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, database } from "../../../firebase";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleOnChange = (e) => {
    setTitle(e);
  };
  const createTodo = () => {
    const myUserId = auth.currentUser?.uid;
    const todoRef = database.ref("Todo/" + myUserId);
    const todo = {
      title,
      description,
      complete: false,
      user: myUserId,
    };
    todoRef.push(todo);
    setTitle("");
    setDescription("");
  };
  return (
    <View style={style.container}>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          variant="standard"
          label="Add Todo"
          type="text"
          value={title}
          onChangeText={handleOnChange}
          size="medium"
        />
        <View style={style.buttonContainer}>
          {title === "" ? (
            <Text>Start typing to add a TO-DO</Text>
          ) : (
            <TouchableOpacity onPress={createTodo} style={style.button}>
              <Text style={style.buttonText}>crear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
export default CreateTodo;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    width: "100%",
    height: "20%",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
