import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import logo from "../../media/images/login.png";
import { Ionicons } from "@expo/vector-icons";
import {
  StyledButton,
  StyledTextButton,
} from "../../shared/StyledComponents/Buttons/Buttons";
import {
  StyledKeyboardAvoidingView,
  StyledView,
  StyledViewInputContainerWithIcon,
} from "../../shared/StyledComponents/Views/Views";
import { StyledImage } from "../../shared/StyledComponents/Images/Images";
import {
  StyledInput,
  StyledInputWithIcon,
} from "../../shared/StyledComponents/Inputs/Inputs";
import { STYLES } from "../../styles/styles.global";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPdw, setShowPdw] = useState(false);
  const [loading, setLoading] = useState(false);

  const refs = {
    email: useRef(),
    pdw: useRef(),
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

  const handleLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setLoading(false);
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <StyledKeyboardAvoidingView>
      <StyledView simple width={"80%"}>
        <StyledImage source={logo} width={310} height={225} bottom={20} />
        <StyledInput
          refe={refs.email}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => refs.pdw.current.focus()}
        />
        <StyledViewInputContainerWithIcon>
          <StyledInputWithIcon
            refe={refs.pdw}
            placeholder="Password"
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            secureTextEntry={!showPdw}
            onSubmitEditing={handleLogin}
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
      <StyledView width={"80%"} top={20} simple>
        <StyledButton title="LOGIN" onPress={handleLogin} loading={loading} />
        <StyledTextButton
          title="CREATE ACCOUNT"
          onPress={() => navigation.replace("Signup")}
        />
      </StyledView>
    </StyledKeyboardAvoidingView>
  );
};
export default LoginPage;
