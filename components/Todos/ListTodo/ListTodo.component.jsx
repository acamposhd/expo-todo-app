import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { listTodos } from "../../../services/database";
import { Ionicons } from "@expo/vector-icons";
import Todo from "../SingleTodo";
import logo from "../../../media/images/notfound.png";
import COLORS from "../../../constants/colors";

const TodoList = () => {
  const [todoList, setTodoList] = useState();
  const [todoListDone, setTodoListDone] = useState();
  useEffect(() => {
    listTodos(setTodoList, setTodoListDone);
  }, []);
  return (
    <View style={style.container}>
      {todoList?.length <= 0 && todoListDone?.length <= 0 && (
        <>
          <Image source={logo} style={style.logo} />
          <Text style={style.bigTitle}>NOTHING HERE YET...</Text>
        </>
      )}
      {todoList?.length > 0 && <Text style={style.title}>TO-DO</Text>}
      {todoList?.length > 0 && (
        <ScrollView
          style={{
            maxHeight: todoListDone?.length > 0 ? "32%" : "70%",
            ...style.scrollView,
          }}
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

      {todoListDone?.length > 0 && (
        <Text style={[style.title, style.titleDone]}>
          <Ionicons name="checkmark-done-circle" size={18} color="#1EB55C" />
          DONE
          <Ionicons name="checkmark-done-circle" size={18} color="#1EB55C" />
        </Text>
      )}
      <ScrollView
        style={{
          maxHeight: todoList?.length > 0 ? "32%" : "70%",
          ...style.scrollView,
        }}
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
    // marginBottom: 10,
    color: COLORS.dark,
    marginTop: 10,
    fontWeight: "700",
    textAlign: "center",
    fontSize: 20,
  },
  bigTitle: {
    color: COLORS.dark,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  titleDone: {
    color: "#1EB55C",
  },
  scrollView: {
    flex: 2,
    marginHorizontal: 40,
  },
  logo: {
    resizeMode: "cover",
    width: "100%",
    height: 400,
    // marginLeft: 40,
    // marginBottom: 20,
  },
});
