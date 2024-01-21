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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("id");
      navigation.navigate("login");
    } catch (error) {
      console.error("Error logging out:", error);
      showError("Failed to log out. Please try again.");
    }
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 80 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* avatar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: wp(5),
            marginBottom: hp(2),
          }}
        >
          <Text style={{ fontSize: wp(7), fontWeight: "bold", color: "#000" }}>
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
        <View style={{ marginHorizontal: wp(5), marginBottom: hp(2) }}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"#000"}
            style={{
              height: hp(7),
              borderWidth: 1,
              borderColor: "#BDBDBD",
              borderRadius: 8,
              marginBottom: 10,
              paddingLeft: 10,
              color: "#000",
            }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"#000"}
            style={{
              height: hp(7),
              borderWidth: 1,
              borderColor: "#BDBDBD",
              borderRadius: 8,
              marginBottom: 10,
              paddingLeft: 10,
              color: "#000",
            }}
          />

          {/* Buttons */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={handleUpdate}
              style={{
                flex: 1,
                height: hp(7),
                backgroundColor: "#4CAF50",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
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

            <TouchableOpacity
              onPress={handleDelete}
              style={{
                flex: 1,
                height: hp(7),
                backgroundColor: "#FF5722",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 5,
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              height: hp(7),
              backgroundColor: "#4285F4",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: hp(2),
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Logout
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
