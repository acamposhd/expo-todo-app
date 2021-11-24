import React from "react";
import COLORS from "../../constants/colors";
import { StyledText } from "../StyledComponents/Text/Text";
import { StyledViewPadding } from "../StyledComponents/Views/Views";

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

const ListItem = ({ text, onPress, icon, idx }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    button: {
      flex: 1,
      marginLeft: 10,
    },
    text: {
      fontSize: 20,
    },
  });
  return (
    <View style={styles.container} key={idx}>
      <FontAwesome name={icon} size={24} color="black" />
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ModalizeComponent = ({
  modalizeRef,
  snapPoint,
  headerTitle,
  options,
  itemObject,
  itemKey,
  validator,
}) => (
  <Modalize
    ref={modalizeRef}
    snapPoint={snapPoint}
    HeaderComponent={
      <StyledViewPadding horizontal="20px" vertical="10px">
        <StyledText color={COLORS.dark} max="500px" weight="700" size="18px">
          {headerTitle}
        </StyledText>
      </StyledViewPadding>
    }
  >
    {options.map(
      (item, idx) =>
        !(validator && item.text === validator && !itemObject[itemKey]) && (
          <ListItem
            text={item.text}
            onPress={item.onPress}
            icon={item.icon}
            idx={idx}
            key={idx}
          />
        )
    )}
  </Modalize>
);
