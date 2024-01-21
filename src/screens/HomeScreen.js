import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import SortCategories from "../components/sortCategories";
import Destinations from "../components/destinations";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 0, backgroundColor: "#f0f0f0" }}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Text style={styles.title}>Let's Discover</Text>
          <TouchableOpacity onPress={() => navigation.navigate("update")}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("search");
            }}
          >
            <Text style={styles.searchText}>Search flights</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <Categories />
        </View>

        <View style={styles.sortContainer}>
          <SortCategories />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light background color
  },
  avatarContainer: {
    marginLeft: wp(5),
    marginRight: wp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(8),
  },
  title: {
    fontSize: wp(7),
    fontWeight: "bold",
    color: "#333", // Dark text color
  },
  avatarImage: {
    height: wp(12),
    width: wp(12),
  },
  searchContainer: {
    marginLeft: wp(5),
    marginRight: wp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(3),
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#297DCA",
    width: "30%",
  },
  searchText: {
    fontSize: wp(4),
    color: "#FFF", // Orange text color
  },
  categoryContainer: {
    marginBottom: hp(1),
  },
  sortContainer: {
    marginBottom: hp(3),
  },
  destinationsContainer: {},
});
