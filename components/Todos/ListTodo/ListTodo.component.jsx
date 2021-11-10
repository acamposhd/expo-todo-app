import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { listItems } from "../../../services/database";
import Todo from "../SingleTodo";

const TodoList = () => {
  const [itemList, setItemList] = useState();
  useEffect(() => {
    listItems(setItemList);
  }, []);
  return (
    <View style={style.container}>
      <ScrollView
        style={style.scrollView}
        showsHorizontalScrollIndicator="false"
      >
        {itemList ? (
          itemList.map((todo, index) => (
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
