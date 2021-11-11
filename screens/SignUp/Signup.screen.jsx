import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth } from "../../firebase";
import logo from "../../media/images/signup.png";
import { createUser } from "../../services/database";
import {
  StyledButton,
  StyledTextButton,
} from "../../shared/StyledComponents/Buttons/Buttons";
const SignUpPage = () => {
  // Our app will contain 2 states, the email and password with an empty string as initial value
  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
    validatePwd: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const windowHeight = useWindowDimensions().height;

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
  const handleSignup = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(formData.email, formData.pwd)
      .then((userCredentials) => {
        // then is a fullfilled promise
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
        // catch is a rejected promise
        alert(error.message);
      });
  };

  return (
    // KeyboardAvoidingView is a type of view that will push the content up when a keyboard shows
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <Image source={logo} style={styles.logo} />
        {/* We have 2 text inputs that will set the state our our constants (email, pdw) */}
        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) =>
            setFormData((current) => ({ ...current, email: text }))
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) =>
            setFormData((current) => ({ ...current, name: text }))
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={formData.pwd}
          onChangeText={(text) =>
            setFormData((current) => ({ ...current, pwd: text }))
          }
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Repeat Password"
          value={formData.validatePwd}
          onChangeText={(text) =>
            setFormData((current) => ({ ...current, validatePwd: text }))
          }
          style={styles.input}
          secureTextEntry
        />
      </View>
      {/* We have 2 buttons that will execute the functions above) */}
      <View style={styles.buttonContainer}>
        <StyledButton
          title="CREATE ACCOUNT"
          onPress={handleSignup}
          loading={loading}
        />
        <StyledTextButton
          title="BACK TO LOGIN"
          onPress={() => navigation.replace("Login")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 70,
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
    width: 300,
    height: 150,
    // marginLeft: 40,
    marginBottom: 20,
  },
});
