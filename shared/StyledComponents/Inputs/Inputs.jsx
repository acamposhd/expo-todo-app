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
  border: ${({ border }) => (border ? "0.5px solid" : "none")};
`;
const StyledInpuWithIconComponent = styled.TextInput`
  flex: 1;
  background-color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-left-radius: 10px;
  margin-top: 5px;
  border: ${({ border }) => (border ? "0.5px solid" : "none")};
`;

export const StyledInput = ({
  refe,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  border,
  autocomplete,
}) => {
  return (
    <StyledInputComponent
      ref={refe}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      border={border}
      autocomplete={autocomplete}
    />
  );
};
export const StyledInputWithIcon = ({
  refe,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  secureTextEntry,
  maxLength,
  minLegth,
  border,
}) => {
  return (
    <StyledInpuWithIconComponent
      ref={refe}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
      border={border}
      minLegth={minLegth}
    />
  );
};
