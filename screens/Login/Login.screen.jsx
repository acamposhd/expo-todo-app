import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth } from "../../firebase";
import logo from "../../media/images/login.png";
import { Ionicons } from "@expo/vector-icons";
import {
  StyledButton,
  StyledTextButton,
} from "../../shared/StyledComponents/Buttons/Buttons";
const LoginPage = () => {
  // Our app will contain 2 states, the email and password with an empty string as initial value
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [showPdw, setShowPdw] = useState(false);

  const [loading, setLoading] = useState(false);

  const refs = {
    email: useRef(),
    pdw: useRef(),
  };

  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();

  // Use Effect is a hook that listen to side effects, we can use it in 3 ways:
  // -Without dependency array: it will execute on each render
  // -With an empty dependency array: it will execute only on the first render
  // -With a dependency array with dependecies: it will execute when the dependecies change

  useEffect(() => {
    // We call the function onAuthStateChanged which is a listener that will be checking for changes on the current
    // state of authentiation.
    const unsuscribe = auth.onAuthStateChanged((user) => {
      // When the auth changes we will receive a user
      if (user) {
        // if there is a valid user we will replace the current screen for the Home one.
        navigation.replace("Home");
      }
    });
    // When the component unmounts we return the same constant to unsuscribe to the listener
    return unsuscribe;
  }, []);
  // This comments apply for both functions, you just need to change the name of the function called from auth
  // We use two function(createUserWithEmailAndPassword,signInWithEmailAndPassword ) from the auth instance
  // It receives email and password and creates or authenticate a new account on firebase

  // This is a promise based function, so we can call it in two ways:
  // -With a then/catch syntax (as we did in this app)
  // -With an async/await aproach: (as below)
  // try {
  //   const userCredentials = await auth.createUserWithEmailAndPassword(
  //     email,
  //     pdw
  //   );
  //   const user = userCredentials.user;
  //   console.log(user.email);
  // } catch (error) {
  //   alert(error.message);
  // }
  // in order to the last example to work the function must be declared with the async keyword:
  // const handleSignup = async()=>{}

  // A promise is a function tha will execute and return something in the future
  // it has 3 posible status:
  // - pending:  when the promise execute and we don't know the final status yet
  // - fullfilled: when the promise executed correctly
  // - rejected: when there is an error or we reject the promise because it didn't return the expected result

  const handleLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
        // then is a fullfilled promise
        const user = userCredentials.user;
        setLoading(false);
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        setLoading(false);
        // catch is a rejected promise
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          ref={refs.email}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          onSubmitEditing={() => refs.pdw.current.focus()}
        />
        <View style={styles.inputContainerIcon}>
          <TextInput
            ref={refs.pdw}
            placeholder="Password"
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            style={styles.inputIcon}
            secureTextEntry={!showPdw}
            onSubmitEditing={handleLogin}
          />
          <Ionicons
            name={showPdw ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="black"
            onPress={() => setShowPdw((current) => !current)}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton title="LOGIN" onPress={handleLogin} loading={loading} />
        <StyledTextButton
          title="CREATE ACCOUNT"
          onPress={() => navigation.replace("Signup")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 80,
  },
  inputContainerIcon: {
    display: "flex",
    flexDirection: "row",
    // borderBottomWidth: 1,
    // padding: 5,
  },
  inputIcon: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 5,
  },
  icon: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#B175B9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    marginTop: 5,
    // borderColor: "#B175B9",
    // borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#B175B9",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    resizeMode: "stretch",
    width: 310,
    height: 225,
    // marginLeft: 40,
    marginBottom: 20,
  },
});
