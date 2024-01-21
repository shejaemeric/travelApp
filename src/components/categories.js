import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../theme";
import { categoriesData } from "../constants";

export default function Categories() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.category}>
            <Image source={cat.image} style={styles.image} />
            <Text style={styles.title}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(4),
    marginBottom: hp(3),
  },
  scrollViewContent: {
    paddingHorizontal: wp(3),
  },
  category: {
    alignItems: "center",
    marginRight: wp(4),
  },
  image: {
    width: wp(20),
    height: wp(19),
    borderRadius: wp(2),
  },
  title: {
    fontSize: wp(3),
    color: "#000",
    marginTop: hp(1),
    fontWeight: "medium",
  },
});
