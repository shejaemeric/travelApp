import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { updateUserById, deleteUserById } from "../../crud/index";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Update(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        const response = await axios.get(
          `https://travel051-theta.vercel.app/api/users/${userId}`
        );
        const userData = response.data.user;

        setEmail(userData.email);
        setName(userData.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      await updateUserById(userId, { name, email });
      setError(null);
      setName("");
      setEmail("");
      navigation.navigate("home");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      await deleteUserById(userId);
      await AsyncStorage.removeItem("id");
      navigation.navigate("login");
    } catch (error) {
      console.error("Error deleting user:", error);
      showError("Failed to delete user. Please try again." + error.error);
    }
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 80 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{ fontSize: wp(7) }} className="font-bold text-white">
            Update Profile
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/cross.png")}
              style={{ height: wp(12), width: wp(12), borderRadius: 9999 }}
            />
          </TouchableOpacity>
        </View>

        {/* update form */}
        <View className="mx-5 mb-4">
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"white"}
            style={{
              height: hp(7),
              borderWidth: 1,
              borderColor: "#1C1F37",
              borderRadius: 8,
              marginBottom: 10,
              paddingLeft: 10,
              color: "white",
            }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"white"}
            style={{
              height: hp(7),
              borderWidth: 1,
              borderColor: "#1C1F37",
              borderRadius: 8,
              marginBottom: 10,
              paddingLeft: 10,
              color: "white",
            }}
          />

          {/* update function */}
          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              height: 50,
              backgroundColor: "#E83D66",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Update
            </Text>
          </TouchableOpacity>

          {/* Delete Account Button */}
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              height: hp(7),
              backgroundColor: "red",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
            className="mx-auto"
          >
            <Text
              style={{
                fontSize: hp(2),
                paddingVertical: 2,
                paddingHorizontal: 70,
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* view for error */}
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          {error && (
            <Text
              style={{ color: "red", backgroundColor: "white", padding: 10 }}
            >
              {error}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
