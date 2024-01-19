import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import SortCategories from "../components/sortCategories";
import { updateUserById, deleteUserById } from "../../sqlite/syncCrud";
import { checkPassword } from "../../sqlite/normalCrud";
import Destinations from "../components/destinations";

export default function Update(props) {
  const [name, setName] = useState(props.loggedUser.name || "");
  const [email, setEmail] = useState(props.loggedUser.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    if (!oldPassword) {
      showError("Please provide the old password.");
      return;
    }
    const userId = props.loggedUser.id;
    if (checkPassword(userId, oldPassword)) {
      showError("Incorrect old password.");
      return;
    }

    updateUserById(userId, { name, email, password });
    setName("");
    setEmail("");
    setOldPassword("");
    setPassword("");
  };

  const handleDelete = () => {
    const userId = props.loggedUser.id;
    deleteUserById(userId);
    navigation.navigate("Login");
  };

  const showError = (errorMessage) => {
    setError(errorMessage);

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={"space-y-6 "}
        style={{ marginTop: 80 }}
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
          <TextInput
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            secureTextEntry
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
            placeholder="New Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholderTextColor={"white"}
            style={{
              height: hp(7),
              borderWidth: 1,
              borderColor: "#1C1F37",
              borderRadius: 8,
              marginBottom: 20,
              paddingLeft: 10,
              color: "white",
            }}
          />

          {/* Update Button */}
          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              height: hp(7),
              backgroundColor: "#E83D66",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
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
