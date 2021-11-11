import React from "react";
import styled from "styled-components/native";

const StyledViewComponent = styled.View`
  flex: 1;
  background-color: "red";
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${({ top }) => top ?? "50px"};
`;

export const StyledView = ({ children, top }) => {
  return <StyledViewComponent top={top}>{children}</StyledViewComponent>;
};
