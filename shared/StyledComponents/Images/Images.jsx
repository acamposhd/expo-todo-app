import React from "react";
import styled from "styled-components/native";

const StyledImageComponent = styled.Image`
  width: ${({ width }) => width ?? "300px"};
  height: ${({ height }) => height ?? "300px"};
  margin-bottom: ${({ bottom }) => bottom ?? "10px"};
  margin-left: ${({ left }) => left ?? "0"};
`;

export const StyledImage = ({
  source,
  bottom,
  width,
  height,
  left,
  resizeMode,
}) => {
  return (
    <StyledImageComponent
      width={width}
      height={height}
      bottom={bottom}
      left={left}
      source={source}
      resizeMode={resizeMode ?? "contain"}
    />
  );
};
