import React from "react";
import styled from "styled-components/native";

const StyledInputComponent = styled.TextInput`
  background-color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  margin-top: 5px;
`;
const StyledInpuWithIconComponent = styled.TextInput`
  flex: 1;
  background-color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

export const StyledInput = ({
  ref,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  return (
    <StyledInputComponent
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
};
export const StyledInputWithIcon = ({
  ref,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  secureTextEntry,
}) => {
  return (
    <StyledInpuWithIconComponent
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={secureTextEntry}
    />
  );
};
