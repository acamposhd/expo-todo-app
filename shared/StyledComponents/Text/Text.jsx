import React from "react";
import styled from "styled-components/native";
import COLORS from "../../../constants/colors";

export const ButtonText = styled.Text`
  color: ${({ color, disabled }) =>
    disabled ? "#C8C8C8" : color ? color : COLORS.light};
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;

const StyledTextComponent = styled.Text`
  font-size: ${({ size }) => size ?? "16px"};
  margin-left: ${({ left }) => left ?? "0px"};
  font-weight: ${({ weight }) => weight ?? "300"};
  text-align: ${({ align }) => align ?? "left"};
  margin-top: ${({ top }) => top ?? "0px"};
  margin-bottom: ${({ bottom }) => bottom ?? "0px"};
  color: ${({ color }) => color ?? COLORS.dark};
  text-decoration-line: ${({ crossed }) => (crossed ? "line-through" : "none")};
  max-width: ${({ max }) => max ?? "200px"};
`;

export const StyledText = ({
  size,
  weight,
  color,
  crossed,
  children,
  left,
  align,
  top,
  bottom,
  max,
}) => {
  return (
    <StyledTextComponent
      size={size}
      weight={weight}
      color={color}
      left={left}
      crossed={crossed}
      align={align}
      top={top}
      bottom={bottom}
      max={max}
    >
      {children}
    </StyledTextComponent>
  );
};
