import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createTodo } from "../../../services/database";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const __handleOnChange = (e) => {
    if (e) {
      setTitle(e);
    } else {
      setTitle("");
    }
  };
  const __handleCreate = () => {
    const todo = {
      title,
      description,
      complete: false,
    };
    createTodo(todo);
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
          onChangeText={__handleOnChange}
          onSubmitEditing={__handleCreate}
          size="medium"
        />
        <View style={style.buttonContainer}>
          {title === "" ? (
            <Text>Start typing to add a TO-DO</Text>
          ) : (
            <TouchableOpacity onPress={__handleCreate} style={style.button}>
              <Text style={style.buttonText}>Agregar</Text>
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
    backgroundColor: "#B175B9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
