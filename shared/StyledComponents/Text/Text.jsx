import React from "react";
import styled from "styled-components/native";
import COLORS from "../../../constants/colors";

export const ButtonText = styled.Text`
  color: ${({ color }) => color ?? COLORS.light};
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;

const StyledTextComponent = styled.Text`
  font-size: ${({ size }) => size ?? "16px"};
  font-weight: ${({ weight }) => weight ?? "300"};
  color: ${({ color }) => color ?? COLORS.dark};
`;

export const StyledText = ({ size, weight, color, children }) => {
  return (
    <StyledTextComponent size={size} weight={weight} color={color}>
      {children}
    </StyledTextComponent>
  );
};
