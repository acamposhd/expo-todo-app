import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import COLORS from "../../../constants/colors";
import { ButtonText } from "../Text/Text";

const StyledPrimaryButton = styled.TouchableOpacity`
  background-color: ${({ bgColor }) => bgColor ?? COLORS.primary};
  width: ${({ size }) => size ?? "100%"};
  margin-top: ${({ top }) => top ?? "0"};
  padding: 12px;
  border-radius: 10px;
  align-items: center;
`;
const StyledPrimaryTextButton = styled.TouchableOpacity`
  background-color: transparent;
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
`;
const StyledClearButtonComponent = styled.TouchableOpacity``;

export const StyledButton = ({
  onPress,
  bgColor,
  title,
  loading,
  size,
  top,
}) => (
  <StyledPrimaryButton
    onPress={onPress}
    bgColor={bgColor}
    size={size}
    top={top}
  >
    <ButtonText>
      {loading ? <ActivityIndicator size="small" color="white" /> : title}
    </ButtonText>
  </StyledPrimaryButton>
);
export const StyledTextButton = ({ onPress, color, title }) => (
  <StyledPrimaryTextButton onPress={onPress}>
    <ButtonText color={color ?? COLORS.primary}>{title}</ButtonText>
  </StyledPrimaryTextButton>
);
export const StyledClearButton = ({ onPress, children, loading }) => (
  <StyledClearButtonComponent onPress={onPress}>
    {loading ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ) : (
      children
    )}
  </StyledClearButtonComponent>
);
