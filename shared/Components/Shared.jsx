import React from "react";
import COLORS from "../../constants/colors";
import { StyledText } from "../StyledComponents/Text/Text";

export const PASSWORD_CHECK_TYPES = {
  match: "MATCH",
  length: "LENGTH",
  lower: "LOWER",
  upper: "UPPER",
  symbol: "SYMBOL",
  number: "NUMBER",
};

export const checkPassword = (type, text, repeat) => {
  if (text !== "") {
    if (type === PASSWORD_CHECK_TYPES.match) {
      return text === repeat;
    } else if (type === PASSWORD_CHECK_TYPES.length) {
      return /.{8,10}/.test(text);
    } else if (type === PASSWORD_CHECK_TYPES.lower) {
      return /(?=.*?[a-z])/g.test(text);
    } else if (type === PASSWORD_CHECK_TYPES.upper) {
      return /(?=.*?[A-Z])/g.test(text);
    } else if (type === PASSWORD_CHECK_TYPES.symbol) {
      return /(?=.*?[#?!@$%^&*-])/g.test(text);
    } else if (type === PASSWORD_CHECK_TYPES.number) {
      return /(?=.*?[0-9])/g.test(text);
    } else {
      return (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g.test(
          text
        ) && text === repeat
      );
    }
  } else {
    return true;
  }
};

export const ErrorMessage = ({ children }) => {
  return (
    <StyledText
      color={COLORS.negativeFeedback}
      max="500px"
      left="5px"
      top={2}
      size="14px"
      weight="bold"
    >
      {children}
    </StyledText>
  );
};
