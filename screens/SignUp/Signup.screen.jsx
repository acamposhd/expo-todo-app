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

  const handleSignup = () => {
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
        <StyledInput
          refe={refs.email}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) =>
            setFormData((current) => ({ ...current, email: text }))
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
      </StyledView>
      <StyledView simple width={"80%"} top={25}>
        <StyledButton
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
