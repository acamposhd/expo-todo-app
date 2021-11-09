import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreateTodo from "../../components/Todos/CreateTodo";
import TodoList from "../../components/Todos/ListTodo";
import TodosPage from "../Todos";
import Ionicons from "react-native-vector-icons/Ionicons";

// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth } from "../../firebase";
import Profile from "../Profile";
const HomePage = () => {
  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  const components = [
    {
      name: "Todo's",
      component: TodosPage,
    },
    {
      name: "Profile",
      component: Profile,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Todo's") {
            iconName = "ios-list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4AA7C0",
        tabBarInactiveTintColor: "grey",
      })}
    >
      {components.map(({ component: Component, name }) => (
        <Tab.Screen name={name} options={{ headerShown: false }}>
          {(props) => <Component {...props} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};
export default HomePage;
