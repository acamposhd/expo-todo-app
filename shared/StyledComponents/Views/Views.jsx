import React from "react";
import styled from "styled-components/native";
import COLORS from "../../../constants/colors";

const StyledViewComponent = styled.View`
  width: ${({ width }) => width ?? "100%"};
  height: ${({ height }) => height ?? "100%"};
  margin-top: ${({ top }) => top ?? "50px"};
  margin-bottom: ${({ bottom }) => bottom ?? "0px"};
  flex: ${({ flex }) => flex ?? 1};
  justify-content: ${({ justify }) => justify ?? "center"};
  align-content: ${({ align }) => align ?? "center"};
  flex-direction: ${({ direction }) => direction ?? "column"};
  align-items: center;
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
const StyledViewComponentListContainer = styled.View`
  width: 100%;
  height: 50%;
  flex: 5;
  align-content: flex-start;
`;
const StyledViewInputContainerWithIconComponent = styled.View`
  display: flex;
  flex-direction: row;
`;
const StyledScrollViewComponent = styled.ScrollView`
  flex: 2;
  margin-left: 40;
  margin-right: 40;
  max-height: ${({ max }) => (max ? "70%" : "32%")};
`;

const StyledKeyboardAvoidingViewComponent = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === "ios" ? "padding" : null,
})`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ top }) => top ?? "80px"};
`;

export const StyledView = ({
  children,
  top,
  bottom,
  width,
  simple,
  height,
  flex,
  justify,
  direction,
  align,
}) => {
  return !simple ? (
    <StyledViewComponent
      width={width}
      top={top}
      bottom={bottom}
      flex={flex}
      height={height}
      justify={justify}
      direction={direction}
      align={align}
    >
      {children}
    </StyledViewComponent>
  ) : (
    <StyledViewComponentSimple width={width} top={top}>
      {children}
    </StyledViewComponentSimple>
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
export const StyledViewList = ({ children }) => {
  return (
    <StyledViewComponentListContainer>
      {children}
    </StyledViewComponentListContainer>
  );
};
export const StyledScrollView = ({
  children,
  max,
  showsHorizontalScrollIndicator,
}) => {
  return (
    <StyledScrollViewComponent
      max={max}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    >
      {children}
    </StyledScrollViewComponent>
  );
};
