import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import logo from "../../media/images/signup.png";
import { createUser } from "../../services/database";
import { Ionicons } from "@expo/vector-icons";
import {
  StyledButton,
  StyledTextButton,
} from "../../shared/StyledComponents/Buttons/Buttons";
import { StyledImage } from "../../shared/StyledComponents/Images/Images";
import {
  StyledInput,
  StyledInputWithIcon,
} from "../../shared/StyledComponents/Inputs/Inputs";
import {
  StyledKeyboardAvoidingView,
  StyledView,
  StyledViewInputContainerWithIcon,
} from "../../shared/StyledComponents/Views/Views";
import { STYLES } from "../../styles/styles.global";
import { StyledText } from "../../shared/StyledComponents/Text/Text";
import {
  checkPassword,
  ErrorMessage,
  PASSWORD_CHECK_TYPES,
} from "../../shared/Components/Shared";
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
    validatePwd: "",
    name: "",
  });
  const [showPdw, setShowPdw] = useState(false);
  const [loading, setLoading] = useState(false);

  const refs = {
    email: useRef(),
    name: useRef(),
    pdw: useRef(),
    repeatPdw: useRef(),
  };
  const navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsuscribe;
  }, []);

  useEffect(() => {}, [formData.pwd]);
  const handleSignup = () => {
    if (formData.pwd !== formData.validatePwd) {
      alert("Passwords must match");
    } else {
      setLoading(true);
      auth
        .createUserWithEmailAndPassword(formData.email, formData.pwd)
        .then((userCredentials) => {
          setLoading(false);
          const user = userCredentials.user;
          createUser({
            id: user.uid,
            email: user.email,
            name: formData.name,
            image: "",
          });
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        });
    }
  };

  const isDataValid = () => {
    if (
      !checkPassword(null, formData.pwd, formData.validatePwd) ||
      formData.email === "" ||
      formData.name === "" ||
      formData.pwd === "" ||
      formData.validatePwd === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <StyledKeyboardAvoidingView>
      <StyledView simple width={"80%"} top={15}>
        <StyledImage
          source={logo}
          width={300}
          height={150}
          bottom={15}
          resizeMode={"stretch"}
        />
        <StyledText
          max="500px"
          align="center"
          size="24px"
          weight="700"
          top={0}
          bottom={10}
        >
          Join the to-do app family
        </StyledText>
        <StyledInput
          refe={refs.email}
          autocomplete={"email"}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) =>
            setFormData((current) => ({
              ...current,
              email: text,
            }))
          }
          onSubmitEditing={() => refs.name.current.focus()}
        />
        <StyledInput
          refe={refs.name}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) =>
            setFormData((current) => ({ ...current, name: text }))
          }
          onSubmitEditing={() => refs.pdw.current.focus()}
        />
        <StyledViewInputContainerWithIcon>
          <StyledInputWithIcon
            refe={refs.pdw}
            maxLength={10}
            minLength={8}
            placeholder="Password"
            value={formData.pwd}
            onChangeText={(text) =>
              setFormData((current) => ({ ...current, pwd: text }))
            }
            secureTextEntry={!showPdw}
            onSubmitEditing={() => refs.repeatPdw.current.focus()}
          />
          <Ionicons
            name={showPdw ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="black"
            onPress={() => setShowPdw((current) => !current)}
            style={STYLES.icon}
          />
        </StyledViewInputContainerWithIcon>
        <StyledViewInputContainerWithIcon>
          <StyledInputWithIcon
            refe={refs.repeatPdw}
            maxLength={10}
            minLength={8}
            placeholder="Repeat Password"
            value={formData.validatePwd}
            onChangeText={(text) =>
              setFormData((current) => ({ ...current, validatePwd: text }))
            }
            secureTextEntry={!showPdw}
            onSubmitEditing={() => handleSignup()}
          />
          <Ionicons
            name={showPdw ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="black"
            onPress={() => setShowPdw((current) => !current)}
            style={STYLES.icon}
          />
        </StyledViewInputContainerWithIcon>
        {!checkPassword(
          PASSWORD_CHECK_TYPES.match,
          formData.pwd,
          formData.validatePwd
        ) && <ErrorMessage>Passwords must match</ErrorMessage>}
        {!checkPassword(PASSWORD_CHECK_TYPES.length, formData.pwd) && (
          <ErrorMessage>
            Password must be between 8 and 10 characters
          </ErrorMessage>
        )}
        {!checkPassword(PASSWORD_CHECK_TYPES.lower, formData.pwd) && (
          <ErrorMessage>You must include a lowercase</ErrorMessage>
        )}
        {!checkPassword(PASSWORD_CHECK_TYPES.upper, formData.pwd) && (
          <ErrorMessage>You must include an uppercase</ErrorMessage>
        )}
        {!checkPassword(PASSWORD_CHECK_TYPES.number, formData.pwd) && (
          <ErrorMessage>You must include a lowercase number</ErrorMessage>
        )}
        {!checkPassword(PASSWORD_CHECK_TYPES.symbol, formData.pwd) && (
          <ErrorMessage>You must include a special character</ErrorMessage>
        )}
      </StyledView>
      <StyledView simple width={"80%"} top={25}>
        <StyledButton
          disabled={!isDataValid()}
          title="CREATE ACCOUNT"
          onPress={handleSignup}
          loading={loading}
        />
        <StyledTextButton
          title="BACK TO LOGIN"
          onPress={() => navigation.replace("Login")}
        />
      </StyledView>
    </StyledKeyboardAvoidingView>
  );
};
export default SignUpPage;
