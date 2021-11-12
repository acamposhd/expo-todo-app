import React from "react";
import styled from "styled-components/native";
import COLORS from "../../../constants/colors";

const StyledViewComponent = styled.View`
  width: ${({ width }) => width ?? "100%"};
  margin-top: ${({ top }) => top ?? "50px"};
  flex: 1;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const StyledViewComponentWithBorder = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-width: 0.5px;
  border-radius: 20px;
  padding: 10px;
  margin: 5px;
  border-color: ${({ color }) => color ?? COLORS.dark};
`;
const StyledViewComponentSimple = styled.View`
  width: ${({ width }) => width ?? "100%"};
  margin-top: ${({ top }) => top ?? "50px"};
`;
const StyledViewComponentFlexEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
const StyledViewInputContainerWithIconComponent = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledKeyboardAvoidingViewComponent = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === "ios" ? "padding" : null,
})`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ top }) => top ?? "80px"};
`;

export const StyledView = ({ children, top, width, simple }) => {
  return simple ? (
    <StyledViewComponentSimple width={width} top={top}>
      {children}
    </StyledViewComponentSimple>
  ) : (
    <StyledViewComponent width={width} top={top}>
      {children}
    </StyledViewComponent>
  );
};
export const StyledViewInputContainerWithIcon = ({ children }) => {
  return (
    <StyledViewInputContainerWithIconComponent>
      {children}
    </StyledViewInputContainerWithIconComponent>
  );
};

export const StyledKeyboardAvoidingView = ({ children, top }) => {
  return (
    <StyledKeyboardAvoidingViewComponent top={top}>
      {children}
    </StyledKeyboardAvoidingViewComponent>
  );
};
export const StyledViewWithBorder = ({ children, top, color }) => {
  return (
    <StyledViewComponentWithBorder top={top} color={color}>
      {children}
    </StyledViewComponentWithBorder>
  );
};
export const StyledViewFlexEnd = ({ children }) => {
  return <StyledViewComponentFlexEnd>{children}</StyledViewComponentFlexEnd>;
};
