import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { completeTodo, deleteTodo } from "../../../services/database";
import {
  StyledViewFlexEnd,
  StyledViewWithBorder,
} from "../../../shared/StyledComponents/Views/Views";
import { StyledText } from "../../../shared/StyledComponents/Text/Text";
import { STYLES } from "../../../styles/styles.global";

const Todo = ({ todo, idx }) => {
  const { id, complete } = todo;
  const iconSize = 30;
  return (
    <StyledViewWithBorder key={idx}>
      <StyledText left={10} size={"20px"} weight={600} crossed={todo.complete}>
        {todo.title}
      </StyledText>
      <StyledViewFlexEnd>
        {todo.complete ? (
          <AntDesign
            style={STYLES.innerPadding}
            name="checkcircle"
            color="#1EB55C"
            size={iconSize}
            onPress={() => completeTodo(id, complete)}
          />
        ) : (
          <AntDesign
            style={STYLES.innerPadding}
            name="checkcircleo"
            color="black"
            size={iconSize}
            onPress={() => completeTodo(id, complete)}
          />
        )}

        <AntDesign
          style={STYLES.innerPadding}
          name="minuscircle"
          size={iconSize}
          color="red"
          onPress={() => deleteTodo(id)}
        />
      </StyledViewFlexEnd>
    </StyledViewWithBorder>
  );
};
export default Todo;
