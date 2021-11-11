import React from "react";
import styled from "styled-components/native";
import COLORS from "../../../constants/colors";

export const ButtonText = styled.Text`
  color: ${({ color }) => color ?? COLORS.light};
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;
