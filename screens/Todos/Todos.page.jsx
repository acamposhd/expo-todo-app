import React from "react";
import { SvgComponentBottom } from "../../components/SVG/MainComponent";
import CreateTodo from "../../components/Todos/CreateTodo";
import TodoList from "../../components/Todos/ListTodo";
import { StyledView } from "../../shared/StyledComponents/Views/Views";

const TodosPage = () => {
  return (
    <StyledView>
      <CreateTodo />
      <TodoList />
      <SvgComponentBottom />
    </StyledView>
  );
};
export default TodosPage;
