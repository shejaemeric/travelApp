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
import Destinations from "../components/savedDestinations";

const ios = Platform.OS == "ios";
const topMargin = ios ? "mt-3" : "mt-10";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    // Add your logic here to handle the update
    console.log("Updating:", { name, email, password });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={"space-y-6 " + topMargin}
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
            placeholder="Password"
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
