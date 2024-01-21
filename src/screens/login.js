import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import { loginUser } from "../../crud";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      showError("Enter the missing details");
      return;
    }
    try {
      const userId = await AsyncStorage.getItem("userId");
      const user = await loginUser({ email, password });
      await AsyncStorage.setItem("userId", user.userId);
      navigation.navigate("home");
    } catch (error) {
      showError("error occured: " + error.error);
    }
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    // Reset the error state after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <View className="flex-1 flex justify-center items-center">
      {/* background image */}
      <Image
        source={require("../../assets/images/welcome.png")}
        className="h-full w-full absolute"
      />

      {/* content & gradient */}
      <View
        className="p-5 pb-10 space-y-8 width-100%"
        style={{ width: "100%", height: "100%", paddingTop: "60%" }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.73)"]}
          style={{ width: wp(100), height: hp(100) }}
          start={{ x: 0.5, y: -0.1 }}
          end={{ x: 0.5, y: 0.8 }}
          className="absolute bottom-0"
        />
        <View className="space-y-3">
          <Text
            className="text-white font-bold text-5xl"
            style={{ fontSize: wp(10) }}
          >
            Login
          </Text>
        </View>

        {/* Registration Form */}
        <View className="space-y-3">
          <TextInput
            placeholder="Email"
            style={{
              backgroundColor: "white",
              borderRadius: wp(3),
              padding: wp(3),
              color: "black",
            }}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={{
              backgroundColor: "white",
              borderRadius: wp(3),
              padding: wp(3),
              color: "black",
            }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{ backgroundColor: theme.bg(2) }}
          className="mx-auto p-3 px-12 rounded-full"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate("register")}
          className="text-white font-bold"
          style={{ textAlign: "center", fontSize: wp(4.5) }}
        >
          Go to Register
        </Text>
      </View>
      {/* view for error */}
      <View style={{ position: "absolute", top: 50, right: 10 }}>
        {error && (
          <Text
            style={{
              color: "white",
              backgroundColor: "#901B17",
              padding: 10,
              borderRadius: 10,
              fontSize: wp(3.5),
            }}
          >
            {error}
          </Text>
        )}
      </View>
    </View>
  );
}
