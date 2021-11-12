import React, { useEffect, useState } from "react";
import { listTodos } from "../../../services/database";
import { Ionicons } from "@expo/vector-icons";
import Todo from "../SingleTodo";
import logo from "../../../media/images/notfound.png";
import COLORS from "../../../constants/colors";
import {
  StyledScrollView,
  StyledViewList,
} from "../../../shared/StyledComponents/Views/Views";
import { StyledImage } from "../../../shared/StyledComponents/Images/Images";
import { StyledText } from "../../../shared/StyledComponents/Text/Text";

const TodoList = () => {
  const [todoList, setTodoList] = useState();
  const [todoListDone, setTodoListDone] = useState();
  useEffect(() => {
    listTodos(setTodoList, setTodoListDone);
  }, []);
  return (
    <StyledViewList>
      {todoList?.length <= 0 && todoListDone?.length <= 0 && (
        <>
          <StyledImage
            source={logo}
            resizeMode={"cover"}
            width={"85%"}
            left={"3%"}
            height="320px"
          />
          <StyledText
            color={COLORS.dark}
            top="10px"
            weight={"bold"}
            align={"center"}
            size="24px"
            max="500px"
          >
            NOTHING HERE YET...
          </StyledText>
        </>
      )}
      {todoList?.length > 0 && (
        <StyledText
          align="center"
          max="100%"
          weight="700"
          size="20px"
          top="10px"
        >
          TO-DO
        </StyledText>
      )}
      {todoList?.length > 0 && (
        <StyledScrollView
          max={todoListDone?.length <= 0}
          showsHorizontalScrollIndicator="false"
        >
          {todoList &&
            todoList
              .reverse()
              .map((todo, index) => (
                <Todo todo={todo} key={index} idx={index} />
              ))}
        </StyledScrollView>
      )}

      {todoListDone?.length > 0 && (
        <StyledText
          color={COLORS.positiveFeedback}
          top="10px"
          weight={"bold"}
          align={"center"}
          size="24px"
          max="500px"
        >
          <Ionicons
            name="checkmark-done-circle"
            size={18}
            color={COLORS.positiveFeedback}
          />
          DONE
          <Ionicons
            name="checkmark-done-circle"
            size={18}
            color={COLORS.positiveFeedback}
          />
        </StyledText>
      )}
      <StyledScrollView
        max={todoList?.length <= 0}
        showsHorizontalScrollIndicator="false"
      >
        {todoListDone &&
          todoListDone
            .reverse()
            .map((todo, index) => <Todo todo={todo} key={index} idx={index} />)}
      </StyledScrollView>
    </StyledViewList>
  );
};
export default TodoList;
