import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../theme";
import { destinationData } from "../constants";
import { addDestination, deleteDestination, createTable } from "../../sqlite";
import { useState, useEffect } from "react";

const Destinations = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {destinationData.map((item, index) => (
        <DestinationCard navigation={navigation} item={item} key={index} />
      ))}
    </View>
  );
};

const DestinationCard = ({ item, navigation }) => {
  const [liked, setLiked] = useState(item.liked === 1);

  useEffect(() => {
    // Update liked state when item.liked changes
    setLiked(item.liked === 1);
  }, [item.liked]);

  const likeDestination = async (destinationId) => {
    await createTable();
    await addDestination(
      item,
      () => {
        console.log(`Liked destination with ID: ${destinationId}`);
      },
      (error) => {
        console.error("Error liking destination: ", error);
      }
    );
  };

  const unlikeDestination = async (destinationId) => {
    await createTable();
    await deleteDestination(
      destinationId,
      () => {
        console.log(`Unliked destination with ID: ${destinationId}`);
      },
      (error) => {
        console.error("Error unliking destination: ", error);
      }
    );
  };

  const handleToggleFavourite = async () => {
    setLiked(!liked);
    const destinationId = item.id;

    if (!liked) {
      await likeDestination(destinationId);
    } else {
      await unlikeDestination(destinationId);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("destination", { ...item })}
      style={styles.cardContainer}
    >
      <Image source={item.image} style={styles.image} />

      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      />

      <TouchableOpacity
        onPress={handleToggleFavourite}
        style={styles.favouriteButton}
      >
        <HeartIcon size={wp(5)} color={liked ? "#FF5454" : "#ddd"} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
  },
  cardContainer: {
    width: wp(44),
    height: wp(65),
    borderRadius: wp(3.5),
    overflow: "hidden",
    marginBottom: wp(5),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: wp(3.5),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  favouriteButton: {
    position: "absolute",
    top: wp(1),
    right: wp(3),
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: wp(8),
    padding: wp(3),
    color: "white",
  },
  textContainer: {
    position: "absolute",
    bottom: wp(4),
    left: wp(2),
    width: "90%",
    zIndex: 1,
  },
  title: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: wp(2.2),
    color: "white",
  },
});

export default Destinations;
