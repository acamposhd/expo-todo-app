import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import TodosPage from "../Todos";
import Ionicons from "react-native-vector-icons/Ionicons";

import Profile from "../Profile";
const HomePage = () => {
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
        tabBarActiveTintColor: "#0782F9",
        tabBarInactiveTintColor: "grey",
      })}
    >
      {components.map(({ component: Component, name }) => (
        <Tab.Screen name={name} options={{ headerShown: false }} key={name}>
          {(props) => <Component {...props} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};
export default HomePage;
