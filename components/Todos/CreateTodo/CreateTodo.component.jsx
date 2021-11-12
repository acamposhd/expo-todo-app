import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { createTodo } from "../../../services/database";
import { StyledButton } from "../../../shared/StyledComponents/Buttons/Buttons";
import { StyledInput } from "../../../shared/StyledComponents/Inputs/Inputs";
import { StyledText } from "../../../shared/StyledComponents/Text/Text";
import { StyledView } from "../../../shared/StyledComponents/Views/Views";

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
    <StyledView
      top={10}
      bottom={0}
      height="20%"
      width="100%"
      justify="flex-start"
      align="center"
    >
      <StyledView simple width="80%" top={0}>
        <StyledInput
          variant="standard"
          placeholder="Do my homework"
          type="text"
          value={title}
          onChangeText={__handleOnChange}
          onSubmitEditing={__handleCreate}
          size="medium"
          border
        />
        <StyledView simple width="100%" top={10}>
          {title === "" ? (
            <StyledText align="center" size="18px" max="500px" weight="500">
              <Entypo name="typing" size={22} color="black" />
              Start typing to add a TO-DO
              <Entypo name="typing" size={22} color="black" />
            </StyledText>
          ) : (
            <StyledButton onPress={__handleCreate} title="ADD" />
          )}
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
export default CreateTodo;
