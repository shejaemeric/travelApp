import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  SunIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-10";

export default function DestinationScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);

  return (
    <View style={styles.container}>
      {/* destination image */}
      <Image source={item.image} style={styles.image} />
      <StatusBar style="dark" />

      {/* back button */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavourite(!isFavourite)}
          style={styles.favouriteButton}
        >
          <HeartIcon
            size={wp(7)}
            strokeWidth={4}
            color={isFavourite ? "red" : "black"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.price}>$ {item?.price}</Text>
          </View>
          <Text style={styles.description}>{item?.longDescription}</Text>
          <View style={styles.infoContainer}>
            <InfoItem
              icon={<ClockIcon size={wp(7)} color="skyblue" />}
              label={item.duration}
              info="Duration"
            />
            <InfoItem
              icon={<MapPinIcon size={wp(7)} color="#f87171" />}
              label={item.distance}
              info="Distance"
            />
            <InfoItem
              icon={<SunIcon size={wp(7)} color="orange" />}
              label={item.weather}
              info="Sunny"
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const InfoItem = ({ icon, label, info }) => {
  return (
    <View style={styles.infoItem}>
      {icon}
      <View style={styles.infoText}>
        <Text style={styles.infoValue}>{label}</Text>
        <Text style={styles.infoLabel}>{info}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
  },
  image: {
    width: wp(100),
    height: hp(55),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    marginTop: ios ? 0 : wp(10),
    paddingHorizontal: wp(4),
  },
  backButton: {
    padding: wp(2),
    borderRadius: wp(5),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  favouriteButton: {
    padding: wp(2),
    borderRadius: wp(5),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  contentContainer: {
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    backgroundColor: "#f0f0f0",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: wp(8),
    marginTop: -wp(14),
    paddingHorizontal: wp(5),
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: wp(7),
    fontWeight: "bold",
    color: "#000000", // Black text color
  },
  price: {
    fontSize: wp(7),
    color: "#000000", // Black text color
    fontWeight: "bold",
  },
  description: {
    fontSize: wp(3.7),
    color: "#000000", // Black text color
    marginBottom: wp(2),
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(1),
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: wp(2),
  },
  infoValue: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: "#000000", // Black text color
  },
  infoLabel: {
    fontSize: wp(2.2),
    color: "#000000", // Black text color
  },
  bookButton: {
    height: wp(15),
    width: wp(50),
    marginBottom: wp(6),
    backgroundColor: "#4299E1", // Blue button color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(7),
    alignSelf: "center",
  },
  bookButtonText: {
    fontSize: wp(5.5),
    fontWeight: "bold",
    color: "#FFFFFF", // White text color
  },
});
