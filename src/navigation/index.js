import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DestinationScreen from "../screens/DestinationScreen";
import Register from "../screens/Register";
import Update from "../screens/update";
import Login from "../screens/login";
import Search from "../screens/Search";
import { useNavigation } from "@react-navigation/native";
import Tickets from "../screens/Tickets";

function AppNavigation() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  useEffect(() => {
    checkUserIdAndNavigate();
  }, []);

  const checkUserIdAndNavigate = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");

      if (!userId) {
        // If userId is not in AsyncStorage, navigate to the Login screen
        navigation.navigate("login");
      } else {
        const currentScreen = navigation.getCurrentRoute()?.name;
        if (
          currentScreen === "login" ||
          currentScreen === "register" ||
          currentScreen === "welcome"
        ) {
          navigation.navigate("home");
        }
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="destination" component={DestinationScreen} />
      <Stack.Screen name="update" component={Update} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="tickets" component={Tickets} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
